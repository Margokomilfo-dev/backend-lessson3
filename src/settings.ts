import {config} from 'dotenv'
config()

//файл для хранения глобальных переменных
export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos', //это вручную, а так же можно еще смотреть в .env. C помощью библ 'dotenv' у нас это будет работаь с энвами
        BLOGS: '/blogs', //это вручную, а так же можно еще смотреть в .env. C помощью библ 'dotenv' у нас это будет работаь с энвами
    },
    MONGO_URL:process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
    DB_NAME: process.env.DB_NAME || ''
}