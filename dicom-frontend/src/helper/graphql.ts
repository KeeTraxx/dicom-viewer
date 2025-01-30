import axios from "axios";

export async function gql(query: string, variables: object | undefined = undefined, url = '/api') {
    try {
        const response = await axios.post(url, {
            query,
            variables
        });

        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }

        console.log(response.data);

        return response.data.data;
    } catch (err) {
        throw new Error("GraphQL request failed: " + err);
    }
}

