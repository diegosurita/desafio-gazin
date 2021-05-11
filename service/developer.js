import developerRepository from './../repository/developer';

export default {
    fetchAll: async (page, limit) => {
        page = page || 1;
        limit = limit || 25;

        const developers = await developerRepository.fetchAll(page, limit);

        if ('error' in developers) {
            const {error} = developers;
            return {error};
        }

        return {
            data: developers,
            meta: {
                page,
                limit
            }
        }
    }
}
