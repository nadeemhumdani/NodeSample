import redis = require('redis');

var client : redis.RedisClient | undefined = undefined

export const Connect = () => {
    console.log('Redis client connecting...');
    client = redis.createClient()

    client.on('connect', () => {
        console.log('Redis client connected');
    })

    client.on('error', (err) => { 
        console.error('Redis error:', err); 
    });
}

export const Set = (key: string , data : any) => {
    console.log('Redis SET data...', data)
    client!.set(key, data)
}

export const Exists = (key: string) : Promise<boolean> => {

    return new Promise<boolean>(
        (resolve, reject) => {
            client!.exists(key, (err, found) => {
                console.log('Redis check cache for key:', key, found)
                resolve(found != 0)
            })
        }
    )
}

//export const Get = (key: string, callBack: (res: any) => void) : any => {
//    client!.get(key, (err, data) => {
//        callBack(data)
//    })
//}

export const Get = (key: string) : Promise<any> => {

    return new Promise<any>(
        (resolve, reject) => {
            client!.get(key, (err, data) => {
                resolve(data)
            })
        }
    )
}

