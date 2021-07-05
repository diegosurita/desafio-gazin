import type {NextApiResponse} from "next";

export default async (response: NextApiResponse, e: any) => {
    const {type, message, details} = e,
        jsonResponse = details ? {type, message, details} : {type, message}

    // TODO: realizar a integração com o bugsnag

    response.status(400).json(jsonResponse);
}
