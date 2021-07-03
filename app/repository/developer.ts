import executeQuery from './../../lib/db';

export default class DeveloperRepository {

    public static async fetchAll(page: number, limit: number, search: string = '') {
        let searchLike: string = '',
            sqlValues: Array<string | number> = [
                (page - 1),
                limit
            ];

        if (search !== '') {
            searchLike = ` WHERE name LIKE ?`;
            sqlValues.unshift(`'%${search}%'`);
        }

        const sql: string = `
            SELECT * FROM developers ${searchLike} LIMIT ?, ?
        `;

        return await executeQuery(sql, sqlValues);
    }

    public static async getTotalDevelopers() {
        const sql: string = `SELECT COUNT(1) AS total FROM developers`;

        return await executeQuery(sql, []);
    }

    public static async getDeveloperById(id: number) {
        const sql: string = `
            SELECT * FROM developers
            WHERE
                developer_id = ?
        `;

        return await executeQuery(sql, [id])
    }

}
