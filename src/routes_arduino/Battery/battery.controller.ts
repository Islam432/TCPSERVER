import { z } from "zod";
import { Request, Response } from 'express';
import BadRequestError from '../../errors/bad-request';
import { StatusCodes } from 'http-status-codes';
import winston from 'winston';

// Создаем логгер
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

// Определяем схему данных с использованием Zod
const batterySchema = z.object({
    id: z.number(),
    b_v: z.number().nonnegative(),
    sp_v: z.number().nonnegative(),
    l_v: z.number().nonnegative(),
    b_c: z.number().nonnegative(),
    sp_c: z.number().nonnegative(),
    b_disch_c: z.number().nonnegative(),
    b_temp: z.number(),
    b_remain: z.number().min(0).max(100),
});

export async function postBattery(req: Request, res: Response) {
    const  data  = req.body;
    console.log(data);
    try {
        if (!data) {
            throw new BadRequestError('Отсутствуют данные в запросе');
        }
        
        const batteryData = batterySchema.parse(data);
        console.log(batteryData);

        const dataString = JSON.stringify(req.body);
        logger.info(`Данные успешно получены: ${dataString}`);

        console.log(batteryData);

        res.status(StatusCodes.OK).json({ result: data });
    } catch (error) {
        // Логируем ошибку
        const errorMessage = error instanceof BadRequestError ? error.message : 'Внутренняя ошибка сервера';
        logger.error(`Ошибка при обработке запроса: ${errorMessage}`);

        // Возвращаем клиенту ошибку
        res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
    }
}
