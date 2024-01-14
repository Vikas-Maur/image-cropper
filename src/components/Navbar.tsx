import React from "react"
import { ChevronLeft } from "lucide-react"
const Navbar: React.FC = () => {
    return (
        <nav className="flex items-center px-5 md:px-7 py-4">
            <button className="rounded-full hover:bg-neutral-100 md:p-2"><ChevronLeft size={35} /></button>
            <a href="/" className="md:ml-2 hover:bg-sky-100 rounded-md w-24 p-2"><img src="/smriti-logo.png" alt="Smriti Logo" className="max-w-full" /></a>
            <p className="ml-auto text-gray-400 font-bold">Smriti</p>
        </nav>
    )
}

export default Navbar