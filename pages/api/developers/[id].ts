import type {NextApiRequest, NextApiResponse} from "next";
import DeveloperController from "../../../src/api/controller/developer";
import responseCatchError from "../../../src/api/middleware/responseCatchError";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const {method} = request;

        switch (method) {
            case 'GET':
                return DeveloperController.detail(request, response);
            case 'PUT':
                await DeveloperController.edit(request, response);
                break;
            case 'DELETE':
                return DeveloperController.delete(request, response);
            default:
                response.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
                response.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        await responseCatchError(response, e);
    }
}
