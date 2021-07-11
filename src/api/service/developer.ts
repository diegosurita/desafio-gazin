import DeveloperRepository from '../repository/developer';
import moment from "moment";

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

    public static async getCountDevelopers(search?: string) {
        const result: any = await DeveloperRepository.getTotalDevelopers(search);

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
        const result: any = await DeveloperRepository.getDeveloperById(id);

        if ('error' in result) {
            throw {
                type: 'DB_ERROR',
                message: 'Erro na tentativa de obter as informações do desenvolvedor',
                ...result
            };
        }

        if (!result.length) {
            return false;
        }

        return result[0];
    }

    public static async storeDeveloper(data: any) {
        let {
            name,
            sex,
            age,
            hobby,
            birthDate
        } = data;

        const result: any = await DeveloperRepository.storeDeveloper([
            name, sex, age, hobby, birthDate
        ]);

        if ('error' in result) {
            throw {
                type: 'DB_ERROR',
                message: 'Erro na tentativa cadastrar um novo desenvolvedor',
                ...result
            };
        }

        if (!result.affectedRows) {
            throw {
                type: 'DB_ERROR',
                message: 'Não foi possível realizar o cadatro do desenvolvedor',
                ...result
            }
        }

        return await DeveloperService.getDeveloperById(result.insertId);
    }

    public static async editDeveloper(developerId: number, data: any) {
        const result: any = await DeveloperRepository.editDeveloper(developerId, data);

        if ('error' in result) {
            throw {
                type: 'DB_ERROR',
                message: 'Erro na tentativa editar os dados do desenvolvedor',
                ...result
            };
        }

        if (!result.affectedRows) {
            throw {
                type: 'DB_ERROR',
                message: 'Não foi possível realizar a edição do desenvolvedor',
                ...result
            }
        }

        return await DeveloperService.getDeveloperById(developerId);
    }

    public static async developerExists(developerId: number) {
        const result: any = await DeveloperRepository.getDeveloperById(developerId);

        if ('error' in result) {
            throw {
                type: 'DB_ERROR',
                message: 'Erro na tentativa de obter o desenvolvedor',
                ...result
            };
        }

        return result.length > 0
    }

    public static async deleteDeveloper(developerId: number) {
        const result: any = await DeveloperRepository.deleteDeveloper(developerId);

        if ('error' in result) {
            throw {
                type: 'DB_ERROR',
                message: 'Erro na tentativa de excluir o desenvolvedor',
                ...result
            };
        }

        if (!result.affectedRows) {
            throw {
                type: 'DB_ERROR',
                message: 'Não foi possível realizar a exclusão do desenvolvedor',
                ...result
            }
        }
    }

}
