import {DeveloperRepository} from '../repository/developer';

const developerRepository: DeveloperRepository = new DeveloperRepository();

export class DeveloperService {

    async fetchAll(page: number, limit: number, search: string = '') {
        page = page || 1;
        limit = limit || 25;

        const developers = await developerRepository.fetchAll(page, limit, search);

        if ('error' in developers) {
            const {error} = developers;
            return {error};
        }

        return developers;
    }

}
