import type {NextApiRequest, NextApiResponse} from "next";
import requiredParams from "../../../app/middleware/requiredParams";
import DeveloperController from "../../../app/controller/developer";
import responseCatchError from "../../../app/middleware/responseCatchError";

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
