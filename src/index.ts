
import express, { Express, urlencoded, json, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
dotenv.config()
const bodyParser = require('body-parser');

const app: Express = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('short'))

app.get('/', (req: Request, res: Response) => res.send('Server working!'))


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  console.log(`worker pid ${process.pid}`)
})
