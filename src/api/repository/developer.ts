import executeQuery from '../lib/db';

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

    public static async storeDeveloper(data: Array<any>) {
        const sql: string = `
            INSERT INTO developers (
                name, sex, age, hobby, birthdate
            ) VALUES (
                ?, ?, ?, ?, ?
            )
        `;

        return await executeQuery(sql, data);
    }

    public static async editDeveloper(developerId: number, data: any) {
        const {name, sex, age, hobby, birthDate} = data
        let updateData: Array<string> = [];

        if (name)
            updateData.push(`name = '${name}'`);

        if (sex)
            updateData.push(`sex = '${sex}'`);

        if (age)
            updateData.push(`age = ${age}`);

        if (hobby)
            updateData.push(`hobby = '${hobby}'`);

        if (birthDate)
            updateData.push(`birthDate = '${birthDate}'`);

        const sql: string = `
            UPDATE developers
            SET
                ${updateData.join()}
            WHERE
                developer_id = ${developerId}
        `;

        return await executeQuery(sql, []);
    }

    public static async deleteDeveloper(developerId: number) {
        const sql: string = `
            DELETE FROM developers
            WHERE
                developer_id = ?
        `;

        return await executeQuery(sql, [developerId])
    }

}
