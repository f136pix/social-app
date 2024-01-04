import {Outlet, Navigate} from "react-router-dom";
import React from 'react';

function AuthLayout(props) {
    const isAuth: boolean = false;

    return (
        <>
            {isAuth ? (
                <Navigate to={"/"}/>
            ) : (
                <>
                    <section className={'flex flex-1 w-1/2 justify-center items-center flex-col py-10'}>
                        {/*component dinamico renderizado no router*/}
                        <Outlet/>
                    </section>
                    <section className={'hidden xl:flex h-screen w-1/2 items-center justify-center bg-amber-950'}>
                        <div className={'flex flex-col text-white text-7xl font-bold'}>
                            <h1>Lorem Ipsum </h1>
                            <h1 className={' py-10'}>Ipsum Lorem </h1>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default AuthLayout;