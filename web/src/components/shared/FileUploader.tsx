import React, {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import {Button} from "@/components/ui/button.tsx";
import {ImagePlus} from "lucide-react";

type IFileUploaderProps = {
    fieldChange: (FILES: File[]) => void,
    mediaUrl: string

}

function FileUploader({fieldChange, mediaUrl}: IFileUploaderProps) {
    const [fileUrl, setFileUrl] = useState<string>('')
    const [file, setFile] = useState<File[]>([])
    const [fileEncoded, setFileEncoded] = useState()

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        const reader = new FileReader()
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone(
        {
            onDrop,
            accept: {
                'image/*': ['.png', '.jpeg', '.jpg', '.svg']
            }
        })

    return (
        <div {...getRootProps()} className={'flex flex-col bg-dark-3 rounded-xl cursor:pointer'}>
            <input {...getInputProps()} className={'cursor-pointer'}/>
            {
                fileUrl ? (
                    <>
                        <div>
                            <img
                                className={'rounded-t-xl'}
                                src={fileUrl}/>
                        </div>
                        <p className={'text-light-4 text-center small-regular w-full p-4 border-t border-t-dark-4;'}>
                            Arraste uma imagem para substituir
                        </p>
                    </>
                ) : (
                    <div className={'flex-center flex-col p-7 h-80 lg:h-[612px]'}>
                        <ImagePlus className={'w-16 h-16'}/>
                        <h3 className={'base-medium text-light-2 mb-2 mt-6'}>Arraste a imagem aqui</h3>
                        <p className={'text-light-4 small-regular mb-6'}>SVG,PNG,JPG</p>
                        <Button className={'shad-button_dark_4'}>Selecione um arquivo</Button>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader;