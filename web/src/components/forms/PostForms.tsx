"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea.tsx";
import FileUploader from "@/components/shared/FileUploader.tsx";
import {ImgUploadValidationSchema} from "@/lib/validation";
import {useUserContext} from "@/context/AuthContext.tsx";
import {useCreatePostMutation, useCreateUserMutation} from "@/react-query/queriesAndMutations.ts";
import {INewPost} from "@/types";
import {convertToGraphQLArray, getBase64, jsToPostgressArr, stringToArr, wrapStringArr} from "@/services";

export function PostForm({ post }) {
    const {mutateAsync: createNewPost, isPending: isCreatingPost} = useCreatePostMutation()
    const {user} = useUserContext()
    const form = useForm<z.infer<typeof ImgUploadValidationSchema>>({
        resolver: zodResolver(ImgUploadValidationSchema),
        defaultValues: {
            caption: post? post?.caption : "",
            file: [],
            location: post? post?.caption : "",
            tags: post? post?.tags.join(',') : "",
        },
    })

    async function onSubmit(formValues: z.infer<typeof ImgUploadValidationSchema>) {
        const data: any = formValues
        data.user = user.id
        data.tags = wrapStringArr(data.tags)
        getBase64(formValues.file[0], data) // data.file = inputedFile
        console.log(data)
        console.log(data.imageUrl)
        await createNewPost(data);
        console.log('ok')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={'shad-form_label'}>Legenda</FormLabel>
                            <FormControl>
                                <Textarea placeholder="..." {...field} className={'shad-textarea custom-scrollbar'}/>
                            </FormControl>
                            <FormMessage className={'shad-form_message'}/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={'shad-form_label'}>Adicionar Fotos</FormLabel>
                            <FormControl>
                                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl}/>
                            </FormControl>
                            <FormMessage className={'shad-form_message'}/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={'shad-form_label'}>Localização</FormLabel>
                            <FormControl>
                                <Input {...field} type={'text'} className={'shad-input'} placeholder={'...'}/>
                            </FormControl>
                            <FormMessage className={'shad-form_message'}/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={'shad-form_label'}>Adicionar TAGS</FormLabel>
                            <FormControl>
                                <Input {...field} type={'text'} className={'shad-input'} placeholder={'viagem, aprendizado, natureza'}/>
                            </FormControl>
                            <FormMessage className={'shad-form_message'}/>
                        </FormItem>
                    )}
                />
                <div className={'flex gap-4 items-center justify-end'}>
                    <Button type="button" className={'shad-button_dark_4 p-6'}>Cancelar</Button>
                    <Button type="submit" className={'shad-button_primary p-6'}>{isCreatingPost ? 'Criando' : 'Criar'}</Button>
                </div>
                </form>
        </Form>
    )
}
