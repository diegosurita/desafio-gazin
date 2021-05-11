import excuteQuery from './../lib/db';

export default {
    fetchAll: async (page, limit) => {
        return await excuteQuery({
            query: 'SELECT * FROM developers LIMIT ' + (page - 1) + ',' + limit,
            values: ''
        });
    }
}
