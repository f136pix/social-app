import * as z from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2,{message: 'Nome muito curto'}),
    username: z.string().min(2, {message: 'Username muito curto'}).max(50),
    email: z.string().email(),
    password: z.string().min(8,{message: 'A senha deve ter ao menos 8 caracteres'})
})

export const SinginValidationSchema  = z.object({
    email: z.string().email({message: 'Deve ser um email'}),
    password: z.string().min(8,{message: 'A senha deve ter ao menos 8 caracteres'})
})

export const ImgUploadValidationSchema = z.object({
    caption: z.string().min(5,{message: 'Deve ter ao menos 5 caracteres'}).max(2200, {message: "Deve ter no maximo 2200 caracteres"}),
    file: z.custom<File[]>(),
    location: z.string().min(2, {message: "Deve ter ao menos 2 caracteres"}).max(50,{message: "Deve ter no maximo 50 caracteres"}),
    tags: z.string()
})