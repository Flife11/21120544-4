const FileSystem = require("fs");
const data = require('../data.json');

module.exports = {
    checkExist: (tbName, key, val) => {
        try {
            var flag = false;            
            data[tbName].forEach(d => {
                console.log(d[key], val, d[key]==val);
                if (d[key]==val) {
                    flag = true;
                    return;
                }
            })
            return flag;
        } catch (error) {
            throw(error);
        }
    },

    Get: (tbName, colName, W_colName, W_val) => {
        const res = [];
        data[tbName].forEach(d => {
            var flag = 1;
        
            for (var index in W_colName) {
                //console.log(d[W_colName[index]], W_val[index], (d[W_colName[index]]==W_val[index]))
                if (d[W_colName[index]]==W_val[index]) continue
                else {
                    flag = 0;
                    break;
                }
            }
            //console.log(flag);
            if (flag==1) {
                const tmp = {};
                for (key of colName) {
                    tmp[key] = d[key];
                }
                //console.log(tmp);
                res.push(tmp);
            }
        });
        return res;
    },

    Add: (tbName, colName, val) => {            
        const tmp = {}
        colName.forEach(key => {
            tmp[key] = val[key];
        })
        data[tbName].push(tmp);        
        
        FileSystem.writeFile('./data.json', JSON.stringify(data), (error) => {
            if (error) throw error;
        });        
    },

    Update: (tbName, col, val, w_col, w_val) => {
        const res = [];
        for (d of data[tbName]) {
            var flag = 1;
        
            for (var index in w_col) {                
                if (d[w_col[index]]==w_val[index]) continue
                else {
                    flag = 0;
                    break;
                }
            }
            
            if (flag==1) {                
                for (key of colName) {
                    d[col] = val;
                }
            }
            res.push(d);
        }
        
        FileSystem.writeFile('./data.json', JSON.stringify(res), (error) => {
            if (error) throw error;
        }); 
    },
}