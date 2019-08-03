import { Request, Response } from "express";
import  * as cache from '../../cache/cacheServer'

export const GetUsers = async (req: Request, res: Response) : Promise<void> => {

    let cacheKey = "userlist_" + req.query['userid']

    if (!await cache.Exists(cacheKey)){
        console.log("saving to cache:",  cacheKey)
        cache.Set(cacheKey, JSON.stringify(await fetchUsers(cacheKey)))
    }

    res.send(await cache.Get(cacheKey))
}

const fetchUsers = async (key: string) : Promise<any> => {
    return {
        fname: "Nadeem",
        lname: "Humdani",
        cacheKey: key
    }
}