import type {NextApiRequest, NextApiResponse} from "next";

export default (request: NextApiRequest, response: NextApiResponse, params: Array<string>) => {
    let missingParams: Array<string> = [];

    if (request.body === '') {
        missingParams = params;
    } else {
        params.forEach(param => {
            if (!(param in request.body)) {
                missingParams.push(param);
            }
        });
    }

    if (missingParams.length > 0) {
        throw {
            type: 'PARAMS_ERROR',
            message: 'Parâmentros obrigatórios não estão presentes na requisição',
            details: {
                params: missingParams
            }
        };
    }
}
