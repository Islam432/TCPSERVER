import { Request, Response } from 'express'
// import {awsConnection} from "../../connection"
import winston from 'winston';
import BadRequestError from '../../errors/bad-request';
import { StatusCodes } from 'http-status-codes';


export async function test(req: Request, res: Response) {
const {data} = req.body;
const result = data;
// const params = {
//     Bucket: 'YOUR_BUCKET_NAME',
//     Key: 'YOUR_OBJECT_KEY',
//     Body: data, 
//     ContentType: 'text/plain' 
//   };
try {
// Создаем логгер
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Вывод в консоль
    new winston.transports.File({ filename: 'server.log' }), // Запись в файл
  ],
});
const dataString = JSON.stringify(data);
logger.info(`Данные успешно получены: ${dataString}`);


    // Здесь могут быть дополнительные операции с данными, если необходимо
    // ...
console.log(data)
    // Отправка данных обратно в ответ на запрос
    res.status(StatusCodes.OK).json({ result: data });  
  } catch (error) {
    // Обработка ошибок, если необходимо
    throw new BadRequestError("данные не отправлены");
  }

}