import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'
import {runDb, videosCollection} from "../src/db/mongoDb";
import {ObjectId} from 'mongodb'

describe('/videos', () => {
    beforeAll(async () => {
        await runDb(SETTINGS.MONGO_URL)
        await videosCollection.deleteMany() //await videosCollection.drop()

        // const server= await MongoMemoryServer.create()
        // const url = server.getUri()
        // await runDb(url)
        // await videosCollection.deleteMany() //await videosCollection.drop()
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200) // проверяем наличие эндпоинта

        console.log(res.status) // можно посмотреть статус эндпоинта
        console.log(res.body) // можно посмотреть ответ эндпоинта

        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })
    it('should get not empty array', async () => {
        const videos = await videosCollection.insertMany([
            {
                _id: new ObjectId(),
                id: 'id1',
                author: 'author1',
                title: 'title1',
                availableResolutions: ['P1440'],
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: 'string',
                publicationDate:' string'
            },
            {
                id: 'id2',
                author: 'author2',
                title: 'title2',
                availableResolutions: ['P1440'],
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: 'string',
                publicationDate:' string'
            }
        ])
        console.log('created videos:', videos)
        //------------logs------------------
        // created videos: {
        //     acknowledged: true, //операция была успешно выполнена и подтверждена сервером.
        //     insertedCount: 2,
        //     insertedIds: {
        //          '0': new ObjectId('66efdd6c4ee88a3454098ce9'),
        //          '1': new ObjectId('66efdd6c4ee88a3454098cea')
        //     }
        // }
        //-----------------------------

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log('all videos:',res.body)
        //------------logs------------------
        // all videos: [
        //          {
        //           _id: '66efdd6c4ee88a3454098ce9',
        //           id: 'id1',
        //           author: 'author1',
        //           title: 'title1',
        //           availableResolutions: [ 'P1440' ],
        //           canBeDownloaded: false,
        //           minAgeRestriction: null,
        //           createdAt: 'string',
        //           publicationDate: ' string'
        //         },
        //         {
        //           _id: '66efdd6c4ee88a3454098cea',
        //           id: 'id2',
        //           author: 'author2',
        //           title: 'title2',
        //           availableResolutions: [ 'P1440' ],
        //           canBeDownloaded: false,
        //           minAgeRestriction: null,
        //           createdAt: 'string',
        //           publicationDate: ' string'
        //         }
        //       ]
        //-----------------------------

        expect(res.body.length).toBe(2)
        expect(res.body[0]._id).toBe(videos.insertedIds[0].toString())
    })
    it('should create', async () => {
        const newVideo = {
            author: 'author3',
            title: 'title3',
            availableResolutions: ['P1440'],
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: 'string',
            publicationDate:' string'
        }

        const code = Buffer.from('admin:qwerty', 'utf8').toString('base64')
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .set({'authorisation': 'Basic: ' + code})
            .send(newVideo) // отправка данных
            .expect(201) //если 201, то будет ошибка, так как такого ендпоинта еще нет
            // .expect(404) //если 201, то будет ошибка, так как такого ендпоинта еще нет

        console.log('res.body:', res.body)
        expect(res.body.author).toEqual(newVideo.author)
    })
    it('should find', async () => {
        const videos = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log('all videos:', videos.body)

        const _id = new ObjectId() // new ObjectId('66efef4a04fcbe490a0f4f30')
        console.log('!!!_id:', _id)
        const newVideo = {
            _id, // new ObjectId('66efef4a04fcbe490a0f4f30')
            author: 'author3',
            title: 'title3',
            availableResolutions: ['P1440'],
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: 'string',
            publicationDate:' string',
        }

        const code = Buffer.from('admin:qwerty', 'utf8').toString('base64')

        const insertedRes = await req
            .post(SETTINGS.PATH.VIDEOS)
            .set({'authorisation': 'Basic: ' + code})
            .send(newVideo) // отправка данных
            .expect(201) //если 201, то будет ошибка, так как такого ендпоинта еще нет

        console.log('insertedRes:', insertedRes.body)
        //------------logs------------------
        // insertedRes: {
        //     id: '1726998792658',
        //         title: 'title3',
        //         author: 'author3',
        //         availableResolutions: [ 'P1440' ],
        //         createdAt: '2024-09-22T09:53:12.658Z',
        //         minAgeRestriction: null,
        //         publicationDate: '2024-09-25T09:53:12.658Z',
        //         canBeDownloaded: false,
        //         _id: '66efe908cd61601100eca0ec'
        // }
        //-----------------------------------

        const findRes = await req
            .get(SETTINGS.PATH.VIDEOS + `/${insertedRes.body.id}`)
            .expect(200)
        console.log('findRes:', findRes.body)
        expect(findRes.body._id).toEqual(_id.toString()) //!!!!!! пришло в виде строки и сравниваем со строкой

    })

    it('shouldn\'t find', async () => {
       const videos = await req
           .get(SETTINGS.PATH.VIDEOS)
           .expect(200)

       console.log('videos:', videos.body)

       const res = await req
           .get(SETTINGS.PATH.VIDEOS + '/1')
           .expect(404) // проверка на ошибку

       console.log(res.status)
       console.log(res.body)
    })
})