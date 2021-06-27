import excuteQuery from './../lib/db';

export class DeveloperRepository {

    async fetchAll(page: number, limit: number, search: string) {
        let searchLike: string = '';

        if (search !== '') {
            searchLike = " WHERE name LIKE '%" + search + "%'";
        }

        const sql: string = 'SELECT * FROM developers ' + searchLike + ' LIMIT ' + (page - 1) + ',' + limit;

        return await excuteQuery(sql, []);
    }

}
