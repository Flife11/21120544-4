require('dotenv').config();
const pgp = require('pg-promise')({
    capSQL: true
});

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 30
};

const db = pgp(cn);

module.exports = {
    checkExist: async (tbName, colName, val) => {
        let dbcn = null;          
        try {
            dbcn = await db.connect();
            const query = `SELECT CASE 
                WHEN EXISTS (
                    SELECT * 
                    FROM "${tbName}" 
                    WHERE "${colName}" = '${val}'
                ) 
                THEN 1 
                ELSE 0
            END;`
            const check = await db.one(query)
            return check;
        } catch (error) {
            throw error
        } finally {
            dbcn.done();
        }
    },

    Get: async(tbName, colName, W_colName, W_val) => {
        
    },

    Add: async (tbName, colName, data) => {
        const cs = new pgp.helpers.ColumnSet(colName, { table: tbName });
        const query = pgp.helpers.insert(data, cs);

        let dbcn = null
        try {
            dbcn = await db.connect();
            db.none(query);         
        } catch (error) {
            console.log(error);
            throw(error)
        } finally {
            dbcn.done();
        }
    }
}