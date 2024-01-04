import React from 'react';
import {Link} from 'react-router-dom';
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import * as z from "zod"
import {SignupValidationSchema} from "@/lib/validation";
import {createUserAccount} from "@/services/authService.ts";

function SignupForm(props) {
    const isLoading: boolean = false

    const form = useForm<z.infer<typeof SignupValidationSchema>>({
        resolver: zodResolver(SignupValidationSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
    })

    // submit handler
    async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
        const result = await createUserAccount(values);
        console.log(result)
    }

    return (
        <Form {...form}>
            <div className={"sm:w-420 flex-center flex-col"}>
                <h2 className={'h3-bold md:h2-bold'}>Crie sua conta</h2>
                <p className={'text-amber-300'}>Para ultilizar o app, insira seus dados</p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-8/12 mt-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type={"text"} className={'shad-input'} {...field} />
                            </FormControl>

                            <FormMessage className={'text-red'}/>
                        </FormItem>
                    )}
                /><FormField
                control={form.control}
                name="username"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input type={"text"} className={'shad-input'} {...field} />
                        </FormControl>

                        <FormMessage className={'text-red'}/>
                    </FormItem>
                )}
            /><FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type={"text"} className={'shad-input'} {...field} />
                        </FormControl>

                        <FormMessage className={'text-red'}/>
                    </FormItem>
                )}
            /><FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type={"text"} className={'shad-input'} {...field} />
                        </FormControl>

                        <FormMessage className={'text-red'}/>
                    </FormItem>
                )}
            />
                <Button type="submit"
                        className={'shad-button_primary'}>{isLoading ? 'Carregando...' : 'Submit'}</Button>
                <p className={'text-small-regular text-light-2 text-center mt-2'}> Já possui uma conta?
                    <Link to={'/login'} className={'text-primary-500 text-sm font-semibold ml-1'}>Entre aqui</Link>
                </p>
            </form>
        </Form>
    );
}

export default SignupForm;