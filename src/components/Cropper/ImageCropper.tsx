'use client'
import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import { useDebounceEffect } from "@/utils/useDebounceEffect";
import { imgPreview } from "@/utils/imagePreview";
import "react-image-crop/dist/ReactCrop.css";


type Props = {
    file: string | undefined,
    localPreview: string | undefined,
    setLocalPreview: Dispatch<SetStateAction<string | undefined>>
}

const ImageCropper: React.FC<Props> = ({ file, localPreview, setLocalPreview }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    // const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current
            ) {
                const src = await imgPreview(imgRef.current, completedCrop)
                setLocalPreview(src)
            }
        },
        100,
        [completedCrop],
    );

    return (
        <div className="flex flex-wrap gap-10 justify-center flex-col md:flex-row">
            <div className="flex justify-start flex-col overflow-clip">
                <p className="font-bold">Your image</p>
                <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={(c) => setCompletedCrop(c)}>
                    <img className="max-h-[60vh] w-auto object-cover" ref={imgRef} src={file} />
                </ReactCrop>
            </div>
            <div className="flex justify-start flex-col flex-1">
                <p className="font-bold">Preview</p>
                <img src={localPreview} className='max-w-full w-fit' alt="" />
                
            </div>
        </div>
    )
}

export default ImageCropper