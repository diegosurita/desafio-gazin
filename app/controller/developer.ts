import type {NextApiRequest, NextApiResponse} from "next";
import DeveloperService from '../service/developer';

export default class DeveloperController {

    public static async list(request: NextApiRequest, response: NextApiResponse) {
        const page: number = request.query.page ? parseInt(request.query.page.toString()) : 1,
            limit: number = request.query.limit ? parseInt(request.query.limit.toString()) : 25,
            search: any = request.query.search,
            developers: any = await DeveloperService.fetchAll(page, limit, search),
            total: number = await DeveloperService.getCountDevelopers();

        if (!developers.length) {
            response.status(404).send('');
            return;
        }

        response.status(200).json({
            data: developers,
            meta: {
                page,
                limit,
                total
            }
        });
    }

    public static async detail(request: NextApiRequest, response: NextApiResponse) {
        const {id} = request.query,
            developerId = parseInt(id.toString());

        const developer = await DeveloperService.getDeveloperById(developerId);

        if (!developer.length) {
            response.status(404).send('');
            return;
        }

        response.status(200).json({
            data: developer
        });
    }

    public static async create(request: NextApiRequest, response: NextApiResponse) {
        const developer: any = await DeveloperService.storeDeveloper(request.body);

        response.status(201).json({
            data: developer
        });
    }

    public static async edit(request: NextApiRequest, response: NextApiResponse) {
        const {id} = request.query,
            developerId = parseInt(id.toString());

        if (!(await DeveloperService.developerExists(developerId))) {
            response.status(404).send('');
            return;
        }

        const developer: any = await DeveloperService.editDeveloper(
            developerId,
            request.body
        );

        response.status(200).json({
            data: developer
        })
    }

    public static delete(request: NextApiRequest, response: NextApiResponse) {
        //
    }

}
