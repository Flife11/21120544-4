const FileSystem = require("fs");
const data = require('../../data.json');

module.exports = {
    checkExist: (key, val) => {
        try {            
            var flag = false;            
            data.forEach(d => {
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

    Get: (colName, W_colName, W_val) => {
        const res = [];
        console.log(colName, W_colName, W_val);
        data.forEach(d => {
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
        console.log(res, "res");
        return res;
    },

    Add: (colName, val) => {            
        const tmp = {}
        colName.forEach(key => {
            tmp[key] = val[key];
        })
        data.push(tmp);        
        
        FileSystem.writeFile('./data.json', JSON.stringify(data), (error) => {
            if (error) throw error;
        });        
    },

    Update: (col, val, w_col, w_val) => {
        const res = [];
        for (d of data) {
            var flag = 1;
        
            for (var index in w_col) {                
                if (d[w_col[index]]==w_val[index]) continue
                else {
                    flag = 0;
                    break;
                }
            }
            
            if (flag==1) {                
                for (var index in col) {
                    d[col[index]] = val[index];
                }
            }
            res.push(d);
        }
        console.log(res);

        FileSystem.writeFile('./data.json', JSON.stringify(res), (error) => {
            if (error) throw error;
        }); 
    },
}