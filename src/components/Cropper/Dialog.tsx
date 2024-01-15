'use client'
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import ImageCropper from "./ImageCropper";
import { X } from 'lucide-react';

type Props = {
    file: string | undefined,
    previewSrc: string | undefined,
    setDialogOpen: () => void,
    setPreviewSrc: Dispatch<SetStateAction<string | undefined>>
}

const Dialog: React.FC<Props> = ({ file, previewSrc, setDialogOpen, setPreviewSrc }) => {
    const [localPreview, setLocalPreview] = useState<string | undefined>(previewSrc || file)

    const okaySelected = () => {
        if(localPreview) setPreviewSrc(localPreview)
        else setPreviewSrc(file)
        setDialogOpen()
    }

    return (
        <div className="flex justify-center items-center fixed top-0 left-0 h-[100vh] w-[100vw] z-10">
            <div onClick={setDialogOpen} className="absolute top-0 left-0 h-full w-full backdrop-blur-sm bg-black/20"></div>
            <div className="bg-white z-10 max-h-[90%] overflow-auto p-8 rounded max-w-[90%]">
                <div className="flex justify-between">
                    <h5 className="text-3xl font-bold">Crop My Image</h5>
                    <button onClick={setDialogOpen} className="block rounded-md bg-black hover:bg-black/75 text-white mb-5 p-2"><X size={30} /></button>
                </div>
                <ImageCropper localPreview={localPreview} setLocalPreview={setLocalPreview} file={file} />
                <div className="mt-5 flex flex-col md:flex-row gap-5 justify-center">
                    <button onClick={okaySelected} className="flex-1 rounded-lg px-5 py-3 bg-blue-500 hover:bg-blue-400 text-white md:text-lg font-bold">Okay</button>
                    <a href={localPreview} download={`My Crop Image ${Date.now()}`} className="flex-1 cursor-pointer rounded-lg px-5 py-3 border-2 border-blue-500 hover:bg-blue-500 hover:text-white md:text-lg font-bold md:text-nowrap w-full text-center">Download preview</a>
                </div>
            </div>
        </div>
    )
}

export default Dialog