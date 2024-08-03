import React from 'react'
export default function InputSection({ children, id, title, desc }) {
    return (
        <section id={id} className='border-b border-gray-500 flex flex-col gap-4 sm:flex-row pt-4 sm:px-4 pb-4 md:pt-6'>
            <div className='w-full sm:w-2/5 pt-3'>
                <span className='text-gray-900 text-lg font-medium capitalize'>{title}</span>
                {desc && <p className='text-gray-700 text-sm'>{desc}</p>}
            </div>
            <div className='flex gap-2 sm:gap-4 flex-col sm:w-3/5 w-full'>
                {children}
            </div>
        </section>
    )
}
