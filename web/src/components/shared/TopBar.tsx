import {Zap, LogOut} from 'lucide-react'
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useLogoutUserMutation} from "@/react-query/queriesAndMutations.ts";
import {useEffect} from "react";
import {useUserContext} from "@/context/AuthContext.tsx";

function TopBar() {
    const {user} = useUserContext()
    const navigate = useNavigate()
    const {mutateAsync: logoutUser, isSuccess: isLoggedOut} = useLogoutUserMutation()
    useEffect(() => {
        if (isLoggedOut) {
            navigate('/login')
        }
    }, [isLoggedOut])

    useEffect(() => {

    }, []);

    return (
        <section className={'topbar'}>
            <div className={'flex-between py-4 px-5'}>
                <Link to={'/'} className={'flex gap-3 items-center'}>
                    <Zap className={'text-blue-700 w-[-130px] h-[-325px]'}></Zap>
                </Link>
                <div className={'flex gap-4'}>
                    <Button variant={'ghost'} className={'shad-button_ghost'} onClick={() => {
                        logoutUser()
                        console.log(isLoggedOut)
                    }}>
                        <LogOut/>
                    </Button>
                    <Link to={`/user/${user.id}`} className={'flex-center gap-3'}>
                        <img
                            src={user.imageUrl || '/assets/default/user-light.svg'} className={'h-8 w-8 rounded-full'}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default TopBar;