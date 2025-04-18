import {ObjectId} from 'mongodb'

export type PostType = {
    _id?: ObjectId
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: ObjectId
    blogName: string
}