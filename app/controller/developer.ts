import type {NextApiRequest, NextApiResponse} from "next";
import DeveloperService from '../service/developer';
import responseCatchError from "../middleware/responseCatchError";
import {type} from "os";

export default class DeveloperController {

    public static async list(request: NextApiRequest, response: NextApiResponse) {
        try {
            const page: number = request.query.page ? parseInt(request.query.page.toString()) : 1,
                limit: number = request.query.limit ? parseInt(request.query.limit.toString()) : 25,
                search: any = request.query.search,
                developers: any = await DeveloperService.fetchAll(page, limit, search),
                total: number = await DeveloperService.getCountDevelopers();

            response.status(200);

            if (!developers.length) {
                return response.status(404).send('');
            }

            return response.json({
                data: developers,
                meta: {
                    page,
                    limit,
                    total
                }
            });
        } catch (e) {
            responseCatchError(response, e);
        }
    }

    public static async detail(request: NextApiRequest, response: NextApiResponse) {
        try {
            const {id} = request.query,
                developerId = parseInt(id.toString());

            const developer = await DeveloperService.getDeveloperById(developerId);

            if (!developer.length) {
                return response.status(404).send('');
            }

            return response.status(200).json({
                data: developer
            });
        } catch (e) {
            responseCatchError(response, e);
        }
    }

    public static async create(request: NextApiRequest, response: NextApiResponse) {
        try {
            const developer: any = await DeveloperService.storeDeveloper(request.body);

            return response.status(201).json({
                data: developer
            });
        } catch (e) {
            responseCatchError(response, e);
        }
    }

    public static edit(request: NextApiRequest, response: NextApiResponse) {
        try {
            //
        } catch (e) {
            responseCatchError(response, e);
        }
    }

    public static delete(request: NextApiRequest, response: NextApiResponse) {
        try {
            //
        } catch (e) {
            responseCatchError(response, e);
        }
    }

}
