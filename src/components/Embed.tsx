'use client'
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

const Embed: React.FC = () => {
    return (
        <div className="mx-auto mt-16 flex flex-col gap-5 justify-center items-center">
            <h2 className='w-full px-8 text-2xl font-bold'>Sample Report</h2>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                <Viewer fileUrl="https://smriti.co/ielts-writing-checker/assets/assets/YOUR_IELTS_WRITING_BAND.pdf" />
            </Worker>
        </div>
    )
}

export default Embed