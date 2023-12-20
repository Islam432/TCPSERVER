import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { issueJWT } from '../utils/utils.jwt';
export async function signin(req: Request, res: Response) {
    const { email, password } = req.body
   /*  let query = `
      SELECT users.id, users.email, users.hash, users.salt, role.role_name, users.is_active
      FROM users
      INNER JOIN role ON users.role = role.id
      WHERE (users.email=$1)`
    const result = await pool.query(query, [email])
    if (result.rows.length < 1) throw new NotFoundError('Пользователь не найден') */
    const [dbUser] = email;
   /*  if (dbUser.is_active === false) throw new Error('Дождитесь одобрения администратора')
    const validPass = validPassword(password, dbUser.hash, dbUser.salt)
    if (!validPass) throw new UnauthorizedError('Неверный пароль') */
    return res.status(StatusCodes.OK).json(issueJWT(dbUser))
  }



/* export async function signup(req: Request, res: Response) {}
 */