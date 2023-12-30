const data = require('./data.json');
const FileSystem = require("fs");

module.exports = {
    checkExist: async (tbName, key, val) => {
        try {
            data[tbName].forEach(d => {
                if (d[key]==val) return true;
            })
            return false;
        } catch (error) {
            throw(error);
        }
    },

    Get: async(tbName, colName, W_colName, W_val) => {
        const res = [];
        data[tbName].forEach(d => {
            var flag = 1;
        
            for (var index in W_colName) {
                if (d[W_colName[index]]==W_val[index]) continue;
                else {
                    flag = 0;
                    break;
                }
            }

            if (flag==1) {
                const tmp = {};
                for (key in colName) {
                    tmp.key = d.key;
                }
                res.push(tmp);
            }
        });
        return res;
    },

    Add: async (tbName, colName, val) => {            
        const tmp = {}
        colName.forEach(key => {
            tmp[key] = val[key];
        })
        data[tbName].push(tmp);

        FileSystem.writeFile('data.json', JSON.stringify(data), (error) => {
            if (error) throw error;
        });
    }
}