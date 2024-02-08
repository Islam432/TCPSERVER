import { Request, Response } from 'express'
// import {awsConnection} from "../../connection"
import BadRequestError from '../../errors/bad-request';
import { StatusCodes } from 'http-status-codes';
import winston from 'winston';

export async function postBattery(req: Request, res: Response) {
const {data} = req.body;

try {
   
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(), 
        new winston.transports.File({ filename: 'server.log' }),
      ],
      format: winston.format.combine(
        winston.format.timestamp(), 
        winston.format.json() 
      ),
    });

    const dataString = JSON.stringify(req.body);
    logger.info(`данные успешно получены: ${dataString}`);

    console.log(data);

    
    res.status(StatusCodes.OK).json({ result: data });
  } catch (error) {

    throw new BadRequestError('данные не отправлены');
  }

}