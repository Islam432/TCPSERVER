
import { Request, Response } from 'express'
// import {awsConnection} from "../../connection"
import BadRequestError from '../../errors/bad-request';
import { StatusCodes } from 'http-status-codes';



export async function postSolar(req:Request, res:Response) {
    const {data} = req.body



    try{
        // const result = await awsConnection.putObject(params).promise();
    res.send(data)
        return res.status(StatusCodes.OK).json({ message: 'данныйе успешно отправлены' })
    
    }catch{
        throw new BadRequestError("данные не отправлены");
    }
    

} 