import {db} from "../../db/db";
import {VideoType} from "../../types/video.type";
import {addDays} from 'date-fns/addDays'
import {videosCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";


export const videoRepository = {
    async getVideos() {
        return await videosCollection.find({}).toArray() //.find({}, { projection: { _id: 0 }) }
        //return await videosCollection.find({title: 'title'}, {projection: {title: 1, _id: 0}}).sort({title: 1}).toArray() as {title: string}[]
        //return db.videos

    },
    async createVideo(body: VideoType): Promise<ObjectId>{
        const video:VideoType = {
            _id: body._id ? body._id : undefined, // for test
            id: Date.now().toString(),
            title: body.title,
            author: body.author,
            availableResolutions: body.availableResolutions,
            createdAt: new Date().toISOString(),
            minAgeRestriction: body.minAgeRestriction || null,
            publicationDate: addDays(new Date(), 3).toISOString(),
            canBeDownloaded:  body.canBeDownloaded || false,
        }
        //db.videos = [...db.videos, video]
        const res = await videosCollection.insertOne(video)
        //const el = await videosCollection.findOne({_id: res.insertedId} )
        return res.insertedId // = new ObjectId('66efeaadeb3....') рассказать про ObjectId
    },
    async getVideo(id: string) {
        console.log('ID:', id)
        return await videosCollection.findOne({id: id})
    },
    async getVideoByUUID(_id: ObjectId) {
        return await videosCollection.findOne({_id} )
    },
    async updateVideo(id:string, body: VideoType): Promise<boolean>{
        const res = await videosCollection.updateOne(
            { id },
            { $set: { ...body } }
        )
        return res.matchedCount === 1
    }
}

