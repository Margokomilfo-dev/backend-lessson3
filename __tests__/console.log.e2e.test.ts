import {req} from './test-helpers'
import {setDb} from '../src/db/db'
import {SETTINGS} from '../src/settings'

describe('sandbox', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDb()
    })

    it('check videos endpoint', async () => {
        // setDb() // очистка базы данных если нужно

        // const res = await req
        //     .get(SETTINGS.PATH.VIDEOS)
        //     //.expect(200) // проверяем наличие эндпоинта
        //
        // console.log(res.status) // можно посмотреть статус эндпоинта
        // console.log(res.body) // можно посмотреть ответ эндпоинта
        //
        // expect(1).toBe(1)
    })

    it('check other endpoint', async () => {
        // setDb() // очистка базы данных если нужно

        // const res = await req
        //     .get('/other') //!!! Такого эндпоинта у нас нет !!!
        // .expect(404) // проверяем наличие эндпоинта
        //
        // console.log(res.status)
        // console.log(res.body)

        // expect(1).toBe(1)
    })
})