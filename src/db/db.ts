import {DBType} from "../types/db.type";

export const db: DBType= {
    videos: [],
    blogs: [
        {
            name: 'Margo',
            description: 'description',
            websiteUrl: 'https//:margokomilfo.com',
            id: '1',
        }
    ],
    posts: [
        {
            id: '1',
            blogId: '1',
            blogName: 'Margo',
            title: 'postTitle',
            content: 'content',
            shortDescription: 'shortDescription',
        },
    ]
}
// setDb - вспомагательная функция, которую вы напишете возможно по-своему

export const setDb =(dataset?: Partial<DBType>) => { // встроенный тип Partial создает новый тип, делая любые свойства объекта DBType необязательнвми.

    // или зачищаем базу
    if(!dataset) {
        db.videos=[]
        db.posts=[]
        db.blogs=[]
        return
    }

    // или заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
    // db.posts = dataset.posts || db.posts
}
