import z from 'zod'

export const authuserShema = z.object({
 email: z.string().optional(),
 password: z.string().optional(),

})