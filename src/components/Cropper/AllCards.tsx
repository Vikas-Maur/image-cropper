import React, { useState } from "react"
import FileCard from "./FileCard"

const AllCards: React.FC = () => {
    return (
        <div>
            <div className="flex justify-center items-center flex-wrap mt-10 gap-5 gap-y-14">
                <FileCard headText="Page 1" />
                <FileCard headText="Page 2" />
                <FileCard headText="Page 3" />
            </div>
            <button className="block mx-auto mt-10 px-5 py-2 rounded-lg text-lg font-semibold text-white transition hover:shadow-lg bg-blue-500 disabled:bg-gray-200">Convert Image to Text</button>
        </div>
    )
}

export default AllCards