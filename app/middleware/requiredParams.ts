import type {NextApiRequest, NextApiResponse} from "next";

export default async (request: NextApiRequest, response: NextApiResponse, params: Array<string>) => {
    let missingParams: Array<string> = [];

    params.forEach(param => {

        if (!(param in request.body)) {
            missingParams.push(param);
        }
    });

    if (missingParams.length > 0) {
        return response.status(400).json({
            error: {
                message: 'Parâmentros obrigatórios não estão presentes na requisição',
                params: missingParams
            }
        });
    }

    return true;
}
