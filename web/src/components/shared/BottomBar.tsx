import React from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";
import {BOTTOMBAR_LINKS} from "@/constants";
import {INavLink} from "@/types";

function BottomBar(props) {
    const pathname = useLocation()
    return (
        <section className={'bottom-bar'}>
            {BOTTOMBAR_LINKS.map((link: INavLink) => {
                const isActive: boolean = pathname.pathname == link.route
                let isActiveClass: string = ''
                if (isActive) {
                    isActiveClass = 'bg-gray-300 text-black hover:no-underline rounded-[10px]'
                }

                return (

                    <Link to={link.route} key={link.label} className={`p-2 bottombar-link flex-center transition ${isActiveClass}`}>
                        {link.label}
                    </Link>
                )
            })}
        </section>
    )
        ;
}

export default BottomBar;