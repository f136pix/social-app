import React from 'react';
import {ImageDown} from "lucide-react";
import PostForms, {PostForm} from "@/components/forms/PostForms.tsx";

function CreatePost(props) {
    return (
        <div className={'flex flex-1'}>
            <div className={'common-container flex flex-col flex-1 items-center'}>
                <div className={'max-w-5xl flex-start gap-3 justify-start w-8/12'}>
                    <ImageDown className={'w-[-36px] h-[-36px]'}></ImageDown>
                    <h2 className={'text-center w-full h3-bold md:h2-bold'}>Criar post</h2>
                </div>
                <PostForm />
            </div>
        </div>
    );
}

export default CreatePost;