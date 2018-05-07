import { MongoClient ,   Db } from 'mongodb';

var _databaseConnections: Map<string, Db>  = new Map();

    async function connect(database: string, mongoUrl: string, refresh: boolean = false): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                // see if the db connection already exists
                if(!refresh){
                    if(getDatabaseConnection(database)){
                        resolve(true);
                    }
                }
                let connectionString = getConnectionString(database, mongoUrl)
                MongoClient.connect(connectionString).then((client) => {
                    handleSuccessfulConnection(database, client.db());
                    resolve(true);
                }).catch((reason) => {
                    console.log(`MongoDb connection failed: ${reason}`);
                    resolve(false);
                });
                
            }
            catch (e) {
               // console.log(`Error in MongoDb Connection: ${e}`);
                resolve(false);
            }
        });
        
    }

    function getDatabaseConnection(database: string): Db {
        return _databaseConnections.get(database);
    }

    function getConnectionString(database: string, url: string) {
        return `${url}/${database}`;
    } 

    function handleSuccessfulConnection(database: string, db: Db) {
        console.log(`Successfully connected to mongo service`);
        _databaseConnections.set(database , db);
    }

    function handleFailedConnection(){
        
    }

    export {
        connect,
        getDatabaseConnection
    };