import { Request, Response } from "express"
import { usersUbdateshema } from "./usersUbdateShema"
import { createDBConnection } from "../connection";
import BadRequestError from "../errors/bad-request";

const fs = require('fs');
import jwt from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
export const UbdateUserData = async (req: Request ,res: Response) => {
try{
    const data = usersUbdateshema.parse(req.body)
    const connection = await createDBConnection();
    console.log(req.body)
    const emailExistsQuery = 'SELECT COUNT(*) AS emailCount FROM users WHERE email = ?';
    const [rows] = await connection.execute(emailExistsQuery, [data.email]);
    if (rows[0].emailCount > 0) {
      throw new BadRequestError('Такого акаунта нет');
    }
    const updateQuery = 'UPDATE users SET email = ?, profile_photo = ?, username = ?  WHERE email = ?';
    await connection.execute(updateQuery, [data.email, data.photo,data.name, data.email]); 
    return res.status(200).json({ message: 'Данные пользователя успешно обновлены' });
    await connection.end();
} catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    if (error instanceof BadRequestError) {
        return res.status(400).json({ error: error.message });
    } else {
        return res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' });
    }
}
}

export const GetStarted = async(req: Request, res:Response)=>{

    const PRIVATE_KEY = fs.readFileSync(`${__dirname}/../keys/id_rsa_priv.pem`, 'utf-8')
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const decodedToken = jwt.verify(token, 'PRIVATE_KEY') as ({ email: string });
            console.log(decodedToken); // Выводит декодированный токен
            const email  = decodedToken.email

            return res.status(StatusCodes.OK).json(email);
        } catch (error) {
            console.error('Ошибка при верификации токена:', error);
        }
    }
