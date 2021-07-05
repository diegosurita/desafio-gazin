import type {NextApiRequest, NextApiResponse} from "next";
import DeveloperController from "../../../app/controller/developer";
import requiredParams from "../../../app/middleware/requiredParams";
import responseCatchError from "../../../app/middleware/responseCatchError";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const {method} = request;

        switch (method) {
            case 'GET':
                return DeveloperController.list(request, response);
            case 'POST':
                await requiredParams(request, response, ['name', 'sex', 'age', 'hobby', 'birthDate']);
                return DeveloperController.create(request, response);
            default:
                response.setHeader('Allow', ['GET', 'POST']);
                response.status(405).end(`Method ${method} Not Allowed`);

        }
    } catch (e) {
        await responseCatchError(response, e);
    }
}
