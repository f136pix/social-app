import {useMutation,} from '@tanstack/react-query'
import {ILoginUser, INewPost, INewUser} from "@/types";
import {createUserAccountApi, destroyJwt, loginUserApi} from "@/services/authService.ts";
import {createPostApi} from "@/services/postService.ts";
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
                if (!jwt) throw new Error('Houve um erro');
                Cookies.set('jwt', `Bearer ${jwt}`, {expires: 7, secure: true, httpOnly: false, sameSite: 'none'});
                return true
            } catch (err: any) {
                return err.message
            }
        }
    })
}

export const useCreatePostMutation = () => {
    return useMutation({
        mutationFn: async (post: INewPost): Promise<boolean> => {
            try {
                console.log(post.imageUrl)
                const isOk = await createPostApi(post)
                console.log(isOk)
                return true
            } catch (err) {
                console.log(err)
                return false
            }
        }
    })
}

export const useLogoutUserMutation = () => {
    return useMutation({
        mutationFn: async (): Promise<boolean> => {
            const jwtRemoved: boolean = await destroyJwt()
            return jwtRemoved
        }
    })
}
