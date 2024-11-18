import {req} from './test-helpers'
// import {setDb} from '../src/db/db'
import {SETTINGS} from '../src/settings'

describe('/', () => {
    // beforeAll(async () => { // очистка базы данных перед началом тестирования
    //     setDB()
    // })

    it('should check base endpoint', async () => {

        const res = await req
            .get('/')
            .expect(200) // проверяем наличие эндпоинта

        console.log(res.status) // можно посмотреть статус эндпоинта
        console.log(res.body) // можно посмотреть ответ эндпоинта
    })

})