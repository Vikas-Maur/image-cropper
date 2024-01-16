'use client'
import React from "react";
import { X } from 'lucide-react';

type Props = {
    header: string,
    dialogOpen: boolean,
    children?: React.ReactNode,
    closeDialog: () => void,
}

const Dialog: React.FC<Props> = ({ header, dialogOpen, children, closeDialog }) => {
    if(!dialogOpen) return <></>

    return (
        <div className="flex justify-center items-center fixed top-0 left-0 h-[100vh] w-[100vw] z-10">
            <div onClick={closeDialog} className="absolute top-0 left-0 h-full w-full backdrop-blur-sm bg-black/20"></div>
            <div className="bg-white z-10 max-h-[90%] overflow-auto p-8 rounded max-w-[90%] shadow-xl">
                <div className="flex justify-between">
                    <h5 className="text-3xl font-bold">{header}</h5>
                    <button onClick={closeDialog} className="block rounded-md bg-black hover:bg-black/75 text-white mb-5 p-2"><X size={30} /></button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Dialog