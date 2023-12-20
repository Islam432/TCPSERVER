import { Request, Response } from 'express'
// import {awsConnection} from "../../connection"
import BadRequestError from '../../errors/bad-request';
import { StatusCodes } from 'http-status-codes';


export async function postBattery(req: Request, res: Response) {
const {data} = req.body;

// const params = {
//     Bucket: 'YOUR_BUCKET_NAME',
//     Key: 'YOUR_OBJECT_KEY',
//     Body: data, 
//     ContentType: 'text/plain' 
//   };
  
try{
    // const result = await awsConnection.putObject(params).promise();
res.send(data)
    return res.status(StatusCodes.OK).json({ message: 'данныйе успешно отправлены' })

}catch{
    throw new BadRequestError("данные не отправлены");
}

}