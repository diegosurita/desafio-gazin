import type {NextApiRequest, NextApiResponse} from "next";
import {DeveloperService} from '../../service/developer';

const developerService: DeveloperService = new DeveloperService();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const page: any = req.query.page,
        limit: any = req.query.limit,
        search: any = req.query.search,
        developers: any = await developerService.fetchAll(page, limit, search);

    res.status(200);

    if ('error' in developers) {
        res.status(400);
    }

    if ('data' in developers && !developers.data.length) {
        return res.status(404).send('');
    }

    return res.json({
        data: developers,
        meta: {
            page,
            limit
        }
    });
}
