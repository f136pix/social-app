import {useMutation,} from '@tanstack/react-query'
import {ILoginUser, INewUser} from "@/types";
import {createUserAccountApi, loginUserApi} from "@/services/authService.ts";
import {toast} from "@/components/ui/use-toast.ts";
import Cookies from "js-cookie";

export const useCreateUserMutation = () => {
    return useMutation({
        mutationFn: async (user: INewUser): Promise<boolean> => {
            try {
                console.log(await createUserAccountApi(user));
                return true
            } catch (err: any) {
                toast({
                    variant: "destructive",
                    title: err.message,

                })
                return false
            }
        }
    })
}

export const useLoginUserMutation = () => {
    return useMutation({
        mutationFn: async (user: ILoginUser): Promise<boolean | string> => {
            try {
                const jwt = await loginUserApi(user)
                if(!jwt) throw new Error('Houve um erro');
                Cookies.set('jwt', `Bearer ${jwt}`, { expires: 7, secure: true, httpOnly: false, sameSite: 'none' });
                return true
            } catch (err: any) {
                return err.message
            }
        }
    })
}
