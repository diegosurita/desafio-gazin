import type {NextApiRequest, NextApiResponse} from "next";
import {DeveloperService} from '../../service/developer';

const developerService: DeveloperService = new DeveloperService();

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const page: number = request.query.page ? parseInt(request.query.page.toString()) : 1,
            limit: number = request.query.limit ? parseInt(request.query.limit.toString()) : 25,
            search: any = request.query.search,
            developers: any = await developerService.fetchAll(page, limit, search),
            total: number = await developerService.getCountDevelopers();


        response.status(200);

        if ('data' in developers && !developers.data.length) {
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
        const {type, message} = e;
        response.status(400).json({type, message});

        // TODO: realizar a integração com o bugsnag
    }
}
