import z from 'zod'

export const usersUbdateshema = z.object({
 email: z.string().email('Некорректный адрес электронной почты'),
name: z.string().min(2, 'Слишком короткое имя').regex(/.*[A-Z].*/, 'Имя должно содержать хотя бы одну заглавную букву'),
photo: z.string()

})