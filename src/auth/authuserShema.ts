import z from 'zod'

export const authuserShema = z.object({
 email: z.string().email('Некорректный адрес электронной почты'),
 password: z.string() .min(8, 'Слишком короткий пароль')
 .regex(/.*[A-Z].*/, 'Пароль должен содержать хотя бы одну заглавную букву')
 .regex(/^(?=.*\d).*$/, 'Пароль должен содержать как минимум одну цифру'),

})