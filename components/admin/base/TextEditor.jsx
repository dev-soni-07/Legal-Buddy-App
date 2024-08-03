import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import Loader from '../../Loader'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <Loader />,
})


function TextEditor({ setDescription, description, desc, isRequired = true }) {
    return (
        <div>
            <div className='w-full h-80 text-gray-800 shadow-lg shadow-slate-900/50'>
                <QuillNoSSRWrapper theme="snow" className='h-full pb-[4.25rem] sm:pb-[2.75rem] text-black font-medium outline-none bg-gray-200' value={description} onChange={setDescription} required={isRequired} />
            </div>
            <div className='flex justify-end gap-4 py-1 text-xs'>
                {isRequired && <span className='bg-red-500 px-2 py-1 rounded-sm block shadow-lg shadow-slate-900/50'>Required</span>}
            </div>
        </div>
    )
}

export default TextEditor