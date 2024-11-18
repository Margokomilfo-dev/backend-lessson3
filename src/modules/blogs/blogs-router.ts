import {NextFunction, Request, Response, Router} from 'express'
import {blogsRepository} from "./blogs-repository";
import {blogsCollection} from "../../db/mongoDb";

export const blogsRouter = Router({})

blogsRouter.get('/', async(req: Request, res: Response) => {
    const blogs = await blogsRepository.getBlogs()
    res.status(200).send(blogs)
})

blogsRouter.post(
    '/',
    // authorizationMiddleware,
    // ...
    async (req: Request, res: Response, next: NextFunction) => {
        //need todo
        res.sendStatus(200)
    }
)
//здесь может быть ошибка, так как Ваня здесь не проверяет на id и в случае ошибки лн вернет 404
blogsRouter.get(
    '/:id',
    // idStringParamValidationMiddleware,
    async (req: Request, res: Response) => {
        //need todo
        res.sendStatus(200)
    }
)

//здесь может быть ошибка, так как Ваня здесь не проверяет на id и в случае ошибки лн вернет 404
blogsRouter.put(
    '/:id',
    // authorizationMiddleware,
    // ....
    async (req: Request, res: Response) => {
        //need todo
        res.sendStatus(200)
    }
)

//здесь может быть ошибка, так как Ваня здесь не проверяет на id и в случае ошибки лн вернет 404
blogsRouter.delete(
    '/:id',
    // authorizationMiddleware,
    // ...
    async (req: Request, res: Response) => {
        // const id = req.params.id
        // await blogsRepository.deleteBlog(id)
        res.sendStatus(200)
    }
)
