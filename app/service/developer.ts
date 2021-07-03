import DeveloperRepository from '../repository/developer';

export default class DeveloperService {

    public static async fetchAll(page: number, limit: number, search: string = '') {
        const result = await DeveloperRepository.fetchAll(page, limit, search);

        if ('error' in result) {
            throw {
                type: 'DB_ERROR',
                message: 'Erro na tentativa de obter a listagem de desenvolvedores',
                ...result
            };
        }

        return result;
    }

    public static async getCountDevelopers() {
        const result: any = await DeveloperRepository.getTotalDevelopers();

        if ('error' in result) {
            throw {
                type: 'DB_ERROR',
                message: 'Erro na tentativa de obter o total de desenvolvedores cadastrados',
                ...result
            };
        }

        return result[0].total;
    }

    public static async getDeveloperById(id: number) {
        const result = await DeveloperRepository.getDeveloperById(id);

        if ('error' in result) {
            throw {
                type: 'DB_ERROR',
                message: 'Erro na tentativa de obter as informações do desenvolvedor',
                ...result
            };
        }

        return result;
    }

}
