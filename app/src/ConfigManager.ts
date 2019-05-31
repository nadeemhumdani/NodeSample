import mssql = require('mssql');

export interface ApplicationException {
    appId : string
    exception : string
}

interface ConnectionSetting {
    Database: string,
    Server: string,
    UserId: string,
    Password: string,
    ConnectionToken: string
}

export const fetchConnectionSetting = async (appId: string) : Promise<ConnectionSetting[] | ApplicationException> => {
    return await connectToDb(appId)
}

const connectToDb = async (appId : string) : Promise<ConnectionSetting[] | ApplicationException> => {

    const config : mssql.config = {
        user: 'SQ-EU_INTLConfig',
        password: 'e4M5$vZKPv1!01',
        server: 'SUKLNLNEUBSQ01\\S08R2' ,
        database: 'ApplicationConfiguration' 
    }

    let connPool : mssql.ConnectionPool | undefined = undefined

    try {

        console.log("sql connecting......")
        connPool = await new mssql.ConnectionPool(config).connect()
        const res : mssql.IResult<ConnectionSetting> =  await connPool.request().query<ConnectionSetting>("select * from ApplicationConnection")

        return res.recordset.map((r : ConnectionSetting) : ConnectionSetting => {
            return {
              Database: r.Database,
              Server: r.Server,
              Password: r.Password,
              ConnectionToken: r.ConnectionToken,
              UserId : r.UserId
            }
         })
       
    } catch (err) {
        return {
            appId: appId,
            exception: err.message
        }
    } //finally {
      //  if (connPool != undefined){
      //      connPool.close()
      //      console.log("connection closed")
      //  }
    
   // }
}
