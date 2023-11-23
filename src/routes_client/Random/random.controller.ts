import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../../errors/bad-request'


export async function apiTest(req: Request, res: Response) {
    const { data } = req.body;
    try {
        // Отправка ответа после установки статуса
        res.status(StatusCodes.OK).json({ message: 'данные отправлены', data });
    } catch {
        throw new BadRequestError('ошибка с данными');
    }
}
export async function apiGet(req:Request, res:Response){

    const {data} =req.body
    res.send('test Random Working')
}