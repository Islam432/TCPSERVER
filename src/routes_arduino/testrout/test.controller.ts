import { Request, Response } from 'express';
// import {awsConnection} from "../../connection"
import winston from 'winston';
import BadRequestError from '../../errors/bad-request';
import { StatusCodes } from 'http-status-codes';

export async function test(req: Request, res: Response) {
  const { data } = req.body; // Трой что то не так  
  const result = data;

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
