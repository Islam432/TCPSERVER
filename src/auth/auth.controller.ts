import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { issueJWT } from '../utils/utils.jwt';
import bcrypt from 'bcrypt';
import { createDBConnection } from '../connection';
import BadRequestError from '../errors/bad-request';
import { authuserShema } from './authuserShema';export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = authuserShema.parse(req.body);
    const connection = await createDBConnection();

    const emailExistsQuery = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.execute(emailExistsQuery, [email]);

    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0];
      if ('password' in user) { // Проверяем наличие свойства 'password' в user
        // const passwordMatch = await bcrypt.compare(password, user.password);

        if (user.password !== null && password === user.password) {
            return res.status(StatusCodes.OK).json(issueJWT({ email: user.email }));
      } else {
          // Если пароль не совпадает или пароль равен null, выбрасываем ошибку
          throw new BadRequestError('Неверный пароль');
      }

      
      } else {
        throw new BadRequestError('Пользователь с таким email не найден');
      }
    } else {
      throw new BadRequestError('Пользователь с таким email не найден');
    }
  } catch (error) {
    console.error('Ошибка при аутентификации пользователя:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Ошибка при аутентификации пользователя' });
  }
}