import {useLoginUserMutation} from "@/react-query/queriesAndMutations.ts";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {SinginValidationSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from "@/context/AuthContext.tsx";
import {toast} from "@/components/ui/use-toast.ts";

function SigninForm() {
    const {mutateAsync: loginUser, isPending: isAuthenticatingUser} = useLoginUserMutation()
    const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof SinginValidationSchema>>({
        resolver: zodResolver(SinginValidationSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

// submit handler
    async function onSubmit(values: z.infer<typeof SinginValidationSchema>) {
        const session: boolean|string= await loginUser(values) // cria jwt e prepara a session
        if (session === true) {
            const isLogged: boolean = await checkAuthUser() // valida token e traz dados do user
            if (isLogged) {
                form.reset()
                navigate('/home')
            }
        }
        if (typeof session === 'string') {
            toast({
                title: session
            })
        }
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
                        className={'shad-button_primary'}>{isAuthenticatingUser ? 'Carregando...' : 'Submit'}</Button>
                <p className={'text-small-regular text-light-2 text-center mt-2'}> Não possui uma conta?
                    <Link to={'/register'} className={'text-primary-500 text-sm font-semibold ml-1'}>REgistre-se!</Link>
                </p>
            </form>
        </Form>
    );
}

export default SigninForm;