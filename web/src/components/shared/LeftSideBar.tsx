import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {LogOut, Zap} from "lucide-react";
import {useUserContext} from "@/context/AuthContext.tsx";
import {useLogoutUserMutation} from "@/react-query/queriesAndMutations.ts";
import {useEffect} from "react";
import {SIDEBAR_LINKS} from "@/constants";
import {INavLink} from "@/types";
import {Button} from "@/components/ui/button.tsx";

function LeftSideBar() {
    const {user, isAuthenticated, setIsAuthenticated} = useUserContext()
    const navigate = useNavigate()
    const {mutateAsync: logoutUser, isSuccess: isLoggedOut} = useLogoutUserMutation()
    const pathname = useLocation()
    useEffect(() => {
        if (isLoggedOut) {
            navigate('/login')
        }
    }, [isLoggedOut])


    return (
        <nav className={'leftsidebar'}>
            <div className={'flex flex-col gap-11'}>
                <Link to={'/'} className={'flex gap-3 items-center justify-center'}>
                    <Zap className={'text-blue-700 w-[-170px] h-[-325px] text-center'}></Zap>
                </Link>
                <Link to={`/profile/${user.id}`} className={'flex gap-3 items-center'}>
                    <img src={user.imageUrl || '/assets/default/user-light.svg'} className={'h-14 w-14 rounded-full'}/>
                    <div className={'flex flex-col'}>
                        <p className={'body-bold'}>
                            {user.name}
                        </p>
                        <p className={'small-regular text-light-3'}>
                            {`@${user.username}`}
                        </p>
                    </div>
                </Link>
                <ul className={'flex flex-col gap-6'}>
                    {SIDEBAR_LINKS.map((link: INavLink) => {
                        const isActive: boolean = pathname.pathname == link.route
                        let isActiveClass: string = ''
                        if (isActive) {
                            isActiveClass = 'bg-gray-300 text-black hover:no-underline'
                        }

                        return (
                            <li key={link.label}>
                                <NavLink to={link.route} className={`p-4 pl-2 leftsidebar-link ${isActiveClass}`}
                                         key={link.label}>
                                    {link.label}
                                </NavLink>
                            </li>)
                    })}
                </ul>
            </div>
            <Button variant={'ghost'} className={'shad-button_ghost'} onClick={() => {
                logoutUser().then(() => {
                    setIsAuthenticated(false)
                    navigate('/login')
                })
            }}>
                <LogOut/>
                <p className={'small-medium lg:base-medium'}>logout</p>
            </Button>
        </nav>
    );
}
export default LeftSideBar;