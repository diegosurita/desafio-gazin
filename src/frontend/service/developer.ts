import axios from 'axios';

export default class DeveloperService {

    public static async fetch(id: number) {
        try {
            const developer: any = await axios.get(process.env.API_URL + `/developers/${id}`);

            return developer.data;
        } catch (e) {
            if (e.response.status === 400) {
                alert(e.response.data.error.message);
                return {};
            }
        }
    }

    public static async fetchAll(page?: number, limit?: number, search?: string) {
        try {
            const requestParams: any = {};

            if (page) {
                requestParams.page = page;
            }

            if (limit) {
                requestParams.limit = limit;
            }

            if (search) {
                requestParams.search = search;
            }

            const developers: any = await axios.get(process.env.API_URL + '/developers', {
                params: requestParams
            });

            return developers.data;
        } catch (e) {
            if (e.response.status === 400) {
                alert(e.response.data.error.message);
                return {data: [], meta: {page, limit, total: 0}};
            }

            if (e.response.status === 404) {
                return {data: [], meta: {page, limit, total: 0}};
            }
        }
    }

    public static async create(data: any) {
        try {
            return await axios.post(process.env.API_URL + '/developers', data);
        } catch (e) {
            if (e.response.status === 400) {
                alert(e.response.data.error.message);
            }
        }
    }

    public static async edit(developerId: string, data: any) {
        try {
            return await axios.put(process.env.API_URL + `/developers/${developerId}`, data);
        } catch (e) {
            if (e.response.status === 400) {
                alert(e.response.data.error.message);
            }
        }
    }

}
