import {DeveloperRepository} from '../repository/developer';

const developerRepository: DeveloperRepository = new DeveloperRepository();

export default {
    fetchAll: async (page: number, limit: number, search: string = '') => {
        page = page || 1;
        limit = limit || 25;

        const developers = await developerRepository.fetchAll(page, limit, search);

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
