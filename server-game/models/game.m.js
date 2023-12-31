const data = require('../ulliti/data.json')
const fs = require('fs');
module.exports = class Game {
    constructor(p) {
        this.Host = p.Host;
        this.Guest = p.Guest || '';        
    }    
    static checkExist(key, val) {
        try {            
            var flag = false;            
            data.forEach(d => {                
                if (d[key]==val) {
                    flag = true;
                    return;
                }
            })
            return flag;
        } catch (error) {
            throw(error);
        }
    }

    static Add(colName, val) {            
        const tmp = {}
        colName.forEach(key => {
            tmp[key] = val[key];
        })
        data.push(tmp);        
        
        fs.writeFile('./server-game/ulliti/data.json', JSON.stringify(data), (error) => {
            if (error) throw error;
        });
    }

    static Get (colName, W_colName, W_val) {
        const res = [];
        //console.log(colName, W_colName, W_val);
        data.forEach(d => {
            var flag = 1;
        
            for (var index in W_colName) {
                //console.log(d[W_colName[index]], W_val[index], (d[W_colName[index]]==W_val[index]))
                if (d[W_colName[index]]==W_val[index]) continue
                else {
                    flag = 0;
                    break;x
                }
            }
            //console.log(flag);
            if (flag==1) {
                const tmp = {};
                for (var key of colName) {
                    tmp[key] = d[key];
                }
                //console.log(tmp);
                res.push(tmp);
            }
        });
        //console.log(res, "res");
        return res;
    }

    static GetAll() {
        return data;
    }
}