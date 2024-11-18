import { Request, Response, NextFunction } from 'express'

export const idParamsValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //if NaN - return !id === false
    if (req.params.id && parseInt(req.params.id)) {
        next()
    } else {
        res.sendStatus(400)
        return
    }
}
export const idStringParamValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id?.toString().trim()
    if (!id) {
        res.sendStatus(400)
        return
    } else next()
}
