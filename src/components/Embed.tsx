'use client'
import React from 'react';
import { Worker, Viewer, ProgressBar } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import { defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const Embed: React.FC = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
            <div className="mx-auto mt-16 flex flex-col gap-5 justify-center items-center">
                <h2 className='w-full px-8 text-2xl font-bold'>Sample Report</h2>
                <div className='w-[95%] h-[200vh]'>
                    <Viewer plugins={[defaultLayoutPluginInstance]} renderLoader={(percentages: number) => (
                        <div className='w-full'>
                            <ProgressBar progress={Math.round(percentages)} />
                        </div>
                    )} fileUrl="https://smriti.co/ielts-writing-checker/assets/assets/YOUR_IELTS_WRITING_BAND.pdf" />
                </div>
            </div>
        </Worker>
    )
}

export default Embed