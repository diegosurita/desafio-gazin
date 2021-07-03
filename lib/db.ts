import mysql from 'serverless-mysql';

let cfg: any = {
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
};

const db = mysql(cfg);

let excuteQuery = async (query: string, values: any[]) => {
    try {
        const results: [] = await db.query(query, values);
        await db.end();
        return results;
    } catch (error: any) {
        return {error};
    }
}

export default excuteQuery
