import developerService from './../../service/developer';

export default async (req, res) => {
    const page = parseInt(req.query.page),
        limit = parseInt(req.query.limit),
        developers = await developerService.fetchAll(page, limit);

    res.status(200);

    if ('error' in developers) {
        res.status(400);
    }

    if ('data' in developers && !developers.data.length) {
        return res.status(404).send('');
    }

    return res.json(developers);
}
