import { Request, Response } from "express"

import {authuserShema} from '../auth/authuserShema'
import {createDBConnection} from "../connection"
import BadRequestError from "../errors/bad-request"
import { StatusCodes } from "http-status-codes"
import { issueJWT } from "../utils/utils.jwt"
import { any } from "zod"



export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password } = authuserShema.parse({ ...req.body });
    const connection = await createDBConnection();
    
    
    const emailExistsQuery = 'SELECT COUNT(*) AS emailCount FROM Users WHERE email = ?';
    const [rows] = await connection.execute(emailExistsQuery, [email]);
    if (rows[0].emailCount > 0) {
      throw new BadRequestError('Email уже существует');
    }


    const insertQuery = 'INSERT INTO Users (email, password) VALUES (?, ?)';
    await connection.execute(insertQuery, [email, password]);
    const dbUser: any = email;
    
   
    await connection.end();

   
    return res.status(StatusCodes.OK).json(issueJWT(dbUser));
  } catch (error) {
   
    console.error('Ошибка при регистрации пользователя:', error);
    if (error instanceof BadRequestError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Ошибка при регистрации пользователя' });
    }
  }
};
