import {app} from '../src/app' // сам бэк, создание, но без запуска
import {agent} from 'supertest'

export const req = agent(app)