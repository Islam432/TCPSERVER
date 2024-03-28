import { z } from "zod";
import { Request, Response } from 'express';
import BadRequestError from '../../errors/bad-request';
import { StatusCodes } from 'http-status-codes';
import winston from 'winston';
import { connectionTCP } from "../../connectionTcp";
import { RowDataPacket } from 'mysql2';

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

const batterySchema = z.object({
    id: z.string(),
    b_v: z.number().nonnegative(),
    sp_v: z.number().nonnegative(),
    l_v: z.number().nonnegative(),
    b_c: z.number().nonnegative(),
    sp_c: z.number().nonnegative(),
    b_disch_c: z.number().nonnegative(),
    b_temp: z.number().min(-15).max(40).optional(),
    b_remain: z.number().min(0).max(100),
});

export async function postBattery(req: Request, res: Response) {
    const connection = await connectionTCP();
    const data = req.body;
    console.log(data);
    try {
        if (!data) {
            throw new BadRequestError('Отсутствуют данные в запросе');
        }

        const dataString = JSON.stringify(req.body);
        logger.info(`Данные успешно получены: ${dataString}`);

        const batteryData = batterySchema.parse({ ...data, id: String(data.id) });
        ;
        console.log(batteryData);

        const query = 'SELECT * FROM smart_crosswalk_parameters WHERE id = ?;';
        const [rows] = await connection.execute<RowDataPacket[]>(query, [data.id]);

        if (Array.isArray(rows) && rows.length > 0) {
            const updateQuery = 'UPDATE smart_crosswalk_parameters SET b_v = ?, sp_v = ?, l_v = ?, b_c = ?, sp_c = ?, b_disch_c = ?, b_temp = ?, b_remain = ? WHERE id = ?;';
            await connection.execute(updateQuery, [batteryData.b_v, batteryData.sp_v, batteryData.l_v, batteryData.b_c, batteryData.sp_c, batteryData.b_disch_c, batteryData.b_temp, batteryData.b_remain, data.id]);
        } else {
            const insertQuery = 'INSERT INTO smart_crosswalk_parameters (b_v, sp_v, l_v, b_c, sp_c, b_disch_c, b_temp, b_remain) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            await connection.execute(insertQuery, [batteryData.b_v, batteryData.sp_v, batteryData.l_v, batteryData.b_c, batteryData.sp_c, batteryData.b_disch_c, batteryData.b_temp, batteryData.b_remain]);
        }

        res.status(StatusCodes.OK).json({ result: data });
    } catch (error) {
        const errorMessage = error instanceof BadRequestError ? error.message : 'Внутренняя ошибка сервера';
        logger.error('Ошибка при обработке запроса:', error);

        res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
    } finally {
        connection.end();
    }
}


export async function getBattery(req: Request, res: Response) {
    const connection = await connectionTCP();
    const batteryId = req.params.id; 
    try {
        if (!batteryId) {
            throw new Error('Отсутствует идентификатор батареи');
        }

        const query = 'SELECT * FROM smart_crosswalk_parameters WHERE id = ?;';
        const [rows] = await connection.execute<RowDataPacket[]>(query, [batteryId]);

        if (Array.isArray(rows) && rows.length > 0) {
            const batteryData = rows[0]; 
        
            res.status(StatusCodes.OK).json({ batteryData });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: 'Данные не найдены' });
        }
    } catch (error) {
        const errorMessage = error instanceof BadRequestError ? error.message : 'Внутренняя ошибка сервера';
        logger.error('Ошибка при обработке запроса:', error);

        res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
    } finally {
        connection.end();
    }
}