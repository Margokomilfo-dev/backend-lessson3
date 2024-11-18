import {Request, Response, Router} from "express";
import {videoRepository} from "./video-repository";
import {
    videoAuthorValidator,
    videoCanBeDownloadedValidator,
    videoMinAgeRestrictionValidator,
    videoTitleValidator
} from "../../validation/express-validator/field-validators";
import {errorsResultMiddleware} from "../../validation/express-validator/errors-result-middleware";
import {ObjectId} from "mongodb"

export const videoRouter = Router()

export const videoController = {
    async getVideos (req: Request, res: Response) {
        const videos = await videoRepository.getVideos() // получаем видео из бд
        res.status(200).json(videos)
    },
    async createVideo (req: Request, res: Response)  {
        const videoId = await videoRepository.createVideo(req.body)
        const video = await videoRepository.getVideoByUUID(videoId)

        res.status(201).json(video)
    },
    async getVideoByID (req: Request, res: Response)  {
        const video = await videoRepository.getVideoByUUID(new ObjectId(req.params._id))

        res.status(201).json(video)
    },
    async getVideo(req: Request, res: Response){
        const id = req.params.id;
        const video = await videoRepository.getVideo(id);
        if (video) {
            res.status(200).json(video);
        } else {
            res.status(404).send({ message: "Video not found" });
        }
    }
}

videoRouter.get('/', videoController.getVideos)
videoRouter.get('/:id', videoController.getVideo)
videoRouter.get('/byId/:_id', videoController.getVideoByID)
videoRouter.post('/',
    videoTitleValidator,
    videoAuthorValidator,
    videoMinAgeRestrictionValidator,
    videoCanBeDownloadedValidator,
    errorsResultMiddleware,
    videoController.createVideo)
// videoRouter.put('/:id', videoRouter.updateVideo)