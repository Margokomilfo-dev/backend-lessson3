import { MongoClient, Collection } from 'mongodb'
import {VideoType} from "../types/video.type";
import {SETTINGS} from "../settings";
import * as dotenv from 'dotenv'
import {BlogType} from "../types/blog.type";
dotenv.config()

export let videosCollection: Collection<VideoType>
export let blogsCollection: any

export async function runDb(url: string): Promise<boolean>{
    let client = new MongoClient(url);
    let db = client.db(SETTINGS.DB_NAME)

    videosCollection = db.collection<VideoType>(SETTINGS.PATH.VIDEOS)
    blogsCollection = db.collection<BlogType>(SETTINGS.PATH.BLOGS)

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('OK')
        return true
    } catch (e) {
        console.log(e)
        await client.close();
        return false
    }
}
