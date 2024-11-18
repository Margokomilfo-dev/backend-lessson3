import {app} from './app'
import {SETTINGS} from './settings'
import {runDb} from "./db/mongoDb";

const startApp = async () => {
    const res = await runDb(SETTINGS.MONGO_URL)
    if(!res) process.exit(1) //exit - метод в Node.js, который немедленно завершает выполнение программы с указанным кодом выхода (0 - успешное, 1 - с ошибкой)

    // задача запустить (не создать) back
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port ' + SETTINGS.PORT)
    })
}

startApp()



