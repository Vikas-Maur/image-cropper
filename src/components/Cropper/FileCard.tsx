"use client";

import React, { useId, useState, ChangeEvent } from "react";
import Dialog from "./Dialog";
import { PlusCircle, X } from "lucide-react";

type Props = {
    headText: string,
};

const FileCard: React.FC<Props> = ({ headText}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [previewSrc, setPreviewSrc] = useState<string>();
    const [file, setFile] = useState<string>();
    const inputId = useId();

    const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 0) {
            if (dialogOpen) setDialogOpen(false);
            return;
        }
        setFile(e.target.files ? URL.createObjectURL(e.target.files[0]) : undefined);
        setPreviewSrc(undefined)
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
                                onClick={() => setDialogOpen(true)}
                                onChange={fileSelected}
                                type="file"
                                id={inputId}
                                accept="image/*"
                                className="hidden"
                            />
                        </>
                    ) : (
                        <div className="relative border-2">
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
                                className="max-w-full max-h-[80%] object-cover cursor-pointer"
                                alt=""
                            />
                        </div>
                    )}
                </div>
            </div>
            {dialogOpen && (
                <Dialog
                    previewSrc={previewSrc}
                    setPreviewSrc={setPreviewSrc}
                    file={file}
                    setDialogOpen={() => {
                        setDialogOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default FileCard;
