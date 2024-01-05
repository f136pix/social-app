import * as z from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2,{message: 'Nome muito curto'}),
    username: z.string().min(2, {message: 'Username muito curto'}).max(50),
    email: z.string().email(),
    password: z.string().min(8,{message: 'A senha deve ter ao menos 8 caracteres'})
})

export const SinginValidationSchema  = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message: 'A senha deve ter ao menos 8 caracteres'})
})