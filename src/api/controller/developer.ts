import type {NextApiRequest, NextApiResponse} from "next";
import DeveloperService from '../service/developer';
import responseCatchError from "../middleware/responseCatchError";
import moment from "moment";

export default class DeveloperController {

    public static async list(request: NextApiRequest, response: NextApiResponse) {
        try {
            const page: number = request.query.page ? parseInt(request.query.page.toString()) : 1,
                limit: number = request.query.limit ? parseInt(request.query.limit.toString()) : 25,
                search: any = request.query.search,
                developers: any = await DeveloperService.fetchAll(page, limit, search),
                total: number = await DeveloperService.getCountDevelopers(search);

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
        } catch (e) {
            await responseCatchError(response, e);
        }
    }

    public static async detail(request: NextApiRequest, response: NextApiResponse) {
        try {
            const {id} = request.query,
                developerId: number = parseInt(id.toString());

            const developer: any = await DeveloperService.getDeveloperById(developerId);

            if (!developer) {
                response.status(404).send('');
                return;
            }

            developer.birthdate = moment(developer.birthdate).format('YYYY-MM-DD');

            response.status(200).json({
                data: developer
            });
        } catch (e) {
            await responseCatchError(response, e);
        }
    }

    public static async create(request: NextApiRequest, response: NextApiResponse) {
        try {
            const developer: any = await DeveloperService.storeDeveloper(request.body);

            response.status(201).json({
                data: developer
            });
        } catch (e) {
            await responseCatchError(response, e);
        }
    }

    public static async edit(request: NextApiRequest, response: NextApiResponse) {
        try {
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
            });
        } catch (e) {
            await responseCatchError(response, e);
        }
    }

    public static async delete(request: NextApiRequest, response: NextApiResponse) {
        try {
            const {id} = request.query,
                developerId = parseInt(id.toString());

            if (!(await DeveloperService.developerExists(developerId))) {
                response.status(404).send('');
                return;
            }

            await DeveloperService.deleteDeveloper(developerId);

            response.status(200).send('');
        } catch (e) {
            await responseCatchError(response, e);
        }
    }

}
