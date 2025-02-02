import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { patientTypeDefs, patientResolvers } from './entities/patient/patient-graphql';
import http from 'http';
import { upload } from './upload/upload';
import bodyParser from 'body-parser';
import cors from 'cors';
import { dicomFileResolvers, dicomFileTypeDefs } from './entities/dicom-file/dicom-file-graphql';
import { sequelize } from './config/sequelize';
import { fetch } from './download/download';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: [
        scalarTypeDefs,
        patientTypeDefs, 
        dicomFileTypeDefs
    ],
    resolvers: [patientResolvers, dicomFileResolvers],
    cache: 'bounded',
    introspection: true,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
    ],
});


(async () => {
    await sequelize.sync({ alter: true });
    await server.start();

    // allow CORS from all origins
    // TODO improve for productive deployment
    app.use(cors());

    // .dcm files are sent in the body. form/multipart is avoided, as this would require
    // an additional dependency, e.g. multer
    app.use('/api/upload', bodyParser.raw({
        type: 'application/dicom',
        inflate: true,
        limit: '50mb'
    }),
        upload
    );

    // allows downloading .dcm files
    // required to display them correctly or download as file
    app.use('/api/fetch/:id',
        fetch
    );

    // expose GraphQL API in /api
    app.use(
        '/api',
        express.json(),
        expressMiddleware(server)
    );

    // redirect root to GraphQL API
    app.use('/', (_, res) => {
        res.redirect('/api');
    });

    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve),
    );

    console.log(`🚀 Server ready at http://localhost:4000`);
})();

