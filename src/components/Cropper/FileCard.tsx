"use client";
import Image from "next/image";
import React, { useId, useState, ChangeEvent } from "react";
import { PixelCrop } from "react-image-crop";
import Dialog from "./Dialog";
import ImageCropper from "./ImageCropper";
import { PlusCircle, X } from "lucide-react";

type Props = {
    headText: string,
};

const FileCard: React.FC<Props> = ({ headText }) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [previewSrc, setPreviewSrc] = useState<string>();
    const [file, setFile] = useState<string>();
    const [initialCrop, setInitialCrop] = useState<PixelCrop | undefined>()
    const inputId = useId();

    const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 0) { return; }
        setFile(e.target.files ? URL.createObjectURL(e.target.files[0]) : undefined);
        setPreviewSrc(undefined)
        setInitialCrop(undefined)
        setDialogOpen(true)
    };

    return (
        <>
            <div className="flex flex-col">
                <p className="text-xl text-center mb-2">{headText}</p>
                <div className="flex justify-center items-center p-2 h-80 w-60 shadow-lg hover:shadow-xl transition rounded-xl overflow-auto">
                    {!previewSrc ? (
                        <>
                            <label
                                htmlFor={inputId}
                                className="text-blue-500 p-2 rounded-full cursor-pointer"
                            >
                                <PlusCircle strokeWidth={2} size={70} />
                            </label>
                            <input
                                onChange={fileSelected}
                                onClick={() => {
                                    if (!!file) setDialogOpen(true)
                                }}
                                type="file"
                                id={inputId}
                                accept="image/*"
                                className="hidden"
                            />
                        </>
                    ) : (
                        <div className="relative max-w-full max-h-full min-h-[36px] min-w-[36px] overflow-y-clip flex justify-center items-center">
                            <button
                                onClick={
                                    () => {
                                        setPreviewSrc(undefined)
                                        setFile(undefined)
                                    }
                                }
                                className="absolute top-0 right-0 rounded-full bg-blue-500 hover:bg-blue-400 text-white p-2"
                            >
                                <X strokeWidth={3} size={20} />
                            </button>
                            <img
                                onClick={() => setDialogOpen(true)}
                                src={previewSrc}
                                className="cursor-pointer max-w-56 max-h-72"
                                alt=""
                            />
                            
                        </div>
                    )}
                </div>
            </div>
            <Dialog header="Crop My Image" dialogOpen={dialogOpen} closeDialog={() => setDialogOpen(false)}>
                <ImageCropper closeDialog={() => setDialogOpen(false)} setPreviewSrc={setPreviewSrc} file={file} initialCrop={initialCrop} setInitialCrop={setInitialCrop} />
            </Dialog>
        </>
    );
};

export default FileCard;
