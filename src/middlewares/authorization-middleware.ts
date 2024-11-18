import { NextFunction, Request, Response } from 'express'

export const authorizationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //'Basic xxxx'

    const credentials = {
        login: 'admin',
        password: 'qwerty',
    }


    let data = `${credentials.login}:${credentials.password}`
    //данные логина и пароля обязательны снаружи! Почему??? хзиначе не работает кодирование с переменными внутри
    let base64data = Buffer.from(data).toString('base64') //закодированная string под base64
    const validAuthValue = `Basic ${base64data}` //вся кодировка 'Basic SDGSNstnsdgn' (admin:qwerty)
    let authHeader = req.headers.authorization

    if (authHeader && authHeader === validAuthValue) {
        next()
    } else res.sendStatus(401)
}


// проверить на 'Basic + пробел в начале
// попробовать сделать в обратную сторону кодировку
// Декодирование строки из Base64 в UTF-8
// Buffer.from(data, 'base64').toString('utf8');
// Кодирование строки из UTF-8 в Base64
// Buffer.from(data, 'utf8').toString('base64');