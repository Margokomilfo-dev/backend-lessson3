import express, {Request, Response} from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {getVideos} from "./modules/videos/getVideos";
import {db} from "./db/db";
import {videoRouter} from "./modules/videos/video-router";
// import {videoRouter} from "./videos/videoRouter";

// задача создать (не запустить) back
export const app = express() //создать приложение

//middleware express.json() парсит JSON в теле запроса и добавляет его как объект в свойство body запроса (req.body.).
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})

// app.get('/other', (req, res) => {
//     res.status(200).json({version: '1.0'})
// })

// app.get('/videos', (req: Request, res: Response) => {
//     const videos = db.videos // получаем видео из бд
//     res.status(200).json(videos)
// })

//1
//  app.get(SETTINGS.PATH.VIDEOS, (req: Request, res: Response) => {//VIDEOS не позволит объект написать подругому
//      const videos = db.videos // получаем видео из бд
//      res.status(200).json(videos)
// })

//2
// app.get('/videos', getVideos) //это не корректно, так в роуте можно сделать ошибку


//3
//app.get(SETTINGS.PATH.VIDEOS,getVideos)

//4
//app.use(SETTINGS.PATH.VIDEOS, videoRouter)

app.use(SETTINGS.PATH.VIDEOS,videoRouter)