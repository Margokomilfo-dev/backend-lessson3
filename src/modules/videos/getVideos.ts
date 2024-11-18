import {Request, Response} from "express";
import {db} from '../../db/db'


export const getVideos = (req: Request, res: Response) => {
    const videos = db.videos // получаем видео из бд

    res.status(200).json(videos)
}