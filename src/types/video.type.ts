import {ObjectId} from "mongodb"

export type  VideoType={
    _id?: ObjectId;
    id: string;
    title: string,//need todo check maxLength
    author: string, //need todo check maxLength
    availableResolutions: string[] | null //need todo enum
    canBeDownloaded: boolean, //By default - false
    minAgeRestriction: null | number, //maximum: 18, minimum: 1, default: null, nullable: true - null - no restriction
    createdAt: string
    publicationDate: string, //By default - +1 day from CreatedAt
}