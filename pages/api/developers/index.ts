import type {NextApiRequest, NextApiResponse} from "next";
import DeveloperController from "../../../app/controller/developer";
import requiredParams from "../../../app/middleware/requiredParams";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const {method} = request;

    switch (method) {
        case 'GET':
            return DeveloperController.list(request, response);
        case 'POST':
            return DeveloperController.create(request, response);
        default:
            response.setHeader('Allow', ['GET', 'POST'])
            response.status(405).end(`Method ${method} Not Allowed`)

    }
}
