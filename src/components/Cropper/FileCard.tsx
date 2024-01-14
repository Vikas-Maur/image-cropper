'use client'

import React, { useId, useState, ChangeEvent } from "react";
import Dialog from "./Dialog";
import { PlusCircle } from 'lucide-react';

type Props = {
    headText: string
}

const FileCard: React.FC<Props> = ({ headText }) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [file, setFile] = useState<File>()
    const inputId = useId()

    const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length === 0) return
        setFile(e.target.files?.[0])
        setDialogOpen(true)
    }

    return (
        <>
            <div className="flex flex-col">
                <p className="text-xl text-center mb-2">{headText}</p>
                <div className="flex justify-center items-center h-80 w-60 shadow-lg hover:shadow-xl transition rounded-xl">
                    <label htmlFor={inputId} className="text-blue-500 p-2 rounded-full cursor-pointer"><PlusCircle strokeWidth={2} size={70} /></label>
                    <input onChange={fileSelected} type="file" id={inputId} accept="image/*" className="hidden" />
                </div>
            </div>
            {dialogOpen && <Dialog file={file} setDialogOpen={() => { setDialogOpen(false) }} /> }
        </>
    )
}

export default FileCard