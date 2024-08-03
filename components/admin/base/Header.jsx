import { useStateContext } from '@/context/Statecontext'
import Image from 'next/image'
import React from 'react'

function Header({ backgroundColor, image, heading, detail, imageBgColor }) {
    const { adminMenu, setAdminMenu } = useStateContext()
    return (
        <header style={{
            background: "rgb(220,220,220)",
            background: "linear-gradient(160deg, rgba(89,89,89,1) 0%, rgba(46,55,69,1) 30%, rgba(0,15,42,1) 100%)"
        }} className='my-2 h-48 md:h-56 rounded-tl-[3rem] flex items-end mb-5'>
            <div className='relative h-16 md:h-20 bg-slate-500 w-full flex items-center justify-between'>
                <span style={{backgroundColor: imageBgColor || "#ffffff"}} className='md:w-28 w-24 aspect-square absolute -top-[40%] rounded-full overflow-hidden border-[4px] border-slate-800 md:ml-6 ml-2 bg-white shadow-lg shadow-slate-900/50'>
                    <Image src={image} fill="object-fit" alt='Header Image' />
                </span>
                <div className='md:pl-40 pl-28'>
                    <h1 className='text-2xl md:text-4xl font-medium text-left capitalize text-white'>{heading}</h1>
                    <p className='md:pt-1 text-sm text-gray-300 capitalize'>{detail}</p>
                </div>
                
            </div>
        </header>
    )
}

export default Header