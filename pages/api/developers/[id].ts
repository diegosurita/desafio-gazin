import type {NextApiRequest, NextApiResponse} from "next";
import requiredParams from "../../../app/middleware/requiredParams";
import DeveloperController from "../../../app/controller/developer";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const {method} = request;

    switch (method) {
        case 'GET':
            return DeveloperController.detail(request, response);
        case 'PUT':
            await requiredParams(request, response, ['id']);
            return DeveloperController.detail(request, response);
        case 'DELETE':
            return DeveloperController.delete(request, response);
        default:
            response.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            response.status(405).end(`Method ${method} Not Allowed`)
    }
}
