'use client'
import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import { useDebounceEffect } from "@/utils/useDebounceEffect";
import { canvasPreview } from "@/utils/canvasPreview";

import "react-image-crop/dist/ReactCrop.css";


type Props = {
    file?: string,
    initialCrop?: PixelCrop,
    closeDialog: () => void,
    setPreviewSrc: Dispatch<SetStateAction<string | undefined>>,
    setInitialCrop: Dispatch<SetStateAction<PixelCrop | undefined>>
}

const ImageCropper: React.FC<Props> = ({ file, initialCrop, closeDialog, setPreviewSrc, setInitialCrop }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const [crop, setCrop] = useState<PixelCrop | undefined>(initialCrop);
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | undefined>(initialCrop);

    const getCanvasSrc = async () => {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error("Crop canvas does not exist");
        }

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        );
        const ctx = offscreen.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        ctx.drawImage(previewCanvas, 0, 0, previewCanvas.width, previewCanvas.height, 0, 0, offscreen.width, offscreen.height,);
        // You might want { type: "image/jpeg", quality: <0 to 1> } to
        // reduce image size
        const blob = await offscreen.convertToBlob({
            type: "image/png",
        });

        const src = URL.createObjectURL(blob)

        return src
    }

    const okaySelected = async () => {
        const toastId = toast.loading("Cropping the image...")
        try {
            const src = await getCanvasSrc()
            setInitialCrop(completedCrop)
            setPreviewSrc(src)
            closeDialog()
            toast.success("Sucessfully cropped the image!", { id: toastId })
        } catch (error: any) {
            toast.error(error.message, { id: toastId })
        }
    }

    const downloadSeclectedPortion = async () => {
        const toastId = toast.loading("Downloading the image...")
        try{
            const src = await getCanvasSrc()
            const anchorEl = document.createElement('a')
            anchorEl.href = src
            anchorEl.setAttribute('download', `My Cropped Image - ${Date.now()}`)
            anchorEl.click()
            anchorEl.remove()
            toast.success("Sucessfully downloaded the image!", { id: toastId })
        } catch (error: any) {
            toast.error(error.message, { id: toastId })
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                );
            }
        },
        100,
        [completedCrop],
    );

    return (
        <>
            <div className="flex flex-wrap gap-10 justify-center flex-col md:flex-row">
                <div className="flex justify-start flex-col overflow-clip">
                    <p className="font-bold">Your image <span className="text-sm font-normal italic">(start dragging...)</span> </p>
                    <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}>
                        <img className="max-h-[60vh] w-auto object-cover" ref={imgRef} src={file} />
                    </ReactCrop>
                </div>
                <div className="flex justify-start flex-col flex-1">
                    <p className="font-bold">Preview</p>
                    {!!completedCrop && <canvas
                        ref={previewCanvasRef}
                        style={{
                            border: "1px solid black",
                            objectFit: "contain",
                            width: completedCrop.width,
                            height: completedCrop.height,
                        }}
                    />}

                </div>
            </div>
            <div className="mt-5 flex flex-col md:flex-row gap-5 justify-center">
                <button onClick={okaySelected} className="flex-1 rounded-lg px-5 py-3 bg-blue-500 hover:bg-blue-400 text-white md:text-lg font-bold">Okay</button>
                <button onClick={downloadSeclectedPortion} className="flex-1 cursor-pointer rounded-lg px-5 py-3 border-2 border-blue-500 hover:bg-blue-500 hover:text-white md:text-lg font-bold md:text-nowrap w-full text-center">Download preview</button>
            </div>
        </>
    )
}

export default ImageCropper