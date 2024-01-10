import './globals.css'
import {Routes, Route} from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm.tsx";
import {
    Home,
    Saved,
    Explore,
    EditPost,
    CreatePost,
    PostDetails,
    Profile,
    UpdateProfile,
    AllUsers,
    LikedPosts
} from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm.tsx";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import {Toaster} from "@/components/ui/toaster"

const App = () => {

    return (
        // routing
        <main className={"flex h-screen"}>
            <Routes>
                {/*public components*/}
                <Route element={
                    <AuthLayout/>}>
                    <Route path={'login'} element={<SigninForm/>}/>
                    <Route path={'register'} element={<SignupForm/>}/>
                </Route>
                {/*secure components*/}
                <Route element={<RootLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={'/explore'} element={<Explore/>}/>
                    <Route path={'/saved'} element={<Saved/>}/>
                    <Route path={'/all-users'} element={<AllUsers/>}/>
                    <Route path={'/create-post'} element={<CreatePost/>}/>
                    <Route path={'/update-post/:id'} element={<EditPost/>}/>
                    <Route path={'/posts/:id'} element={<PostDetails/>}/>
                    <Route path={'/profile/:id/*'} element={<Profile/>}/>
                    <Route path={'/update-profile/:id'} element={<UpdateProfile/>}/>
                    <Route path={'/liked-posts/:id'} element={<LikedPosts/>}/>
                </Route>
            </Routes>

            <Toaster/>
        </main>

    )
}

export default App