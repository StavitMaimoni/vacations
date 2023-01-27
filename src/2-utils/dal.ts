import mysql from "mysql";
import appConfig from "./app-config";

// Create a pool of connection to MySQL, using configurations set in appConfig.
const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
});


// Executes an SQL statement with values passed as parameters and returns a Promise.
function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values,(err, result)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {
    execute
}

