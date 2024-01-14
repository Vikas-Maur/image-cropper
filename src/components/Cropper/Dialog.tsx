import React from "react";

type Props = {
    file: File | undefined,
    setDialogOpen: () => void
}

const Dialog: React.FC<Props> = ({ file, setDialogOpen }) => {
  
    return (
        <div className="flex justify-center items-center fixed top-0 left-0 h-[100vh] w-[100vw]">
            <div onClick={setDialogOpen} className="absolute top-0 left-0 h-full w-full backdrop-blur-sm bg-black/20"></div>
            <div className="bg-white z-10 max-h-[90%] overflow-auto p-4 rounded max-w-[90%]">
                <img src={file? URL.createObjectURL(file): ""} alt="" />
            </div>
        </div>
    )
}

export default Dialog