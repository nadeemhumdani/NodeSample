import { Request, Response } from "express";
import  * as cache from '../../cache/cacheServer'

import fetch = require('node-fetch');

export const GetUsers = async (req: Request, res: Response) : Promise<void> => {

    let cacheKey = "userlist_" + req.query['userid']

    if (!await cache.Exists(cacheKey)){
        console.log("saving to cache:",  cacheKey)
        //cache.Set(cacheKey, JSON.stringify(await fetchUsers(cacheKey)))
        cache.Set(cacheKey, JSON.stringify(await fetchUsers(req.query['userid'])))
    }

    res.send(await cache.Get(cacheKey))
}

const fetchUsers = async (key: string) : Promise<any> => {

    //"https://jsonplaceholder.typicode.com/todos/30"
    let dat = await fetch.default("https://jsonplaceholder.typicode.com/todos/" + key)
    return await dat.json()

    //return {
    //    fname: "Nadeem",
    //    lname: "Humdani",
    //    cacheKey: key
    //}
}