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
import { Sequelize } from 'sequelize';
import { fetch } from './download/download';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

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
    const sequelize = new Sequelize("sqlite:./sqlite.db");
    sequelize.sync({ alter: true });

    await server.start();
    app.use(cors());

    app.use('/api/upload', bodyParser.raw({
        type: 'application/dicom',
        inflate: true,
        limit: '50mb'
    }),
        upload
    );

    app.use('/api/fetch/:id',
        fetch
    );

    app.use(
        '/api',
        express.json(),
        expressMiddleware(server)
    );

    app.use('/', (_, res) => {
        res.redirect('/api');
    });

    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve),
    );

    console.log(`🚀 Server ready at http://localhost:4000`);
})();

