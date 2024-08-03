import React from 'react'

function Modal({ children, size, isOpen, setIsOpen, heading }) {
    const paddingSize = size === "lg" ? "px-[2.5%]" : size === "md" ? "px-[7.5%] md:px-[20%]" : "px-[7.5%] sm:px-[15%] md:px-[25%] lg:px-[30%]"
    // const paddingSize = "p-1"
    return (
        <div style={{ visibility: isOpen.show ? "visible" : "hidden", opacity: isOpen.show ? 1 : 0 }} className={`${paddingSize} fixed h-full w-full top-0 right-0 z-[30] flex justify-center items-center bg-slate-700 bg-opacity-50 transition-all duration-500 origin-center`}>
                <div style={{ scale: isOpen.show ? "1" : "0" }} className=' bg-slate-900 shadow-lg shadow-slate-900 duration-500 relative transition-[scale] ease-in-out pb-3 h-fit w-full origin-center rounded px-6'>
                    <button onClick={() => setIsOpen({type: "",show: false})} className='absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-300'>
                        <svg className='h-10 fill-current' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9498 8.46447C17.3404 8.07394 17.3404 7.44078 16.9498 7.05025C16.5593 6.65973 15.9261 6.65973 15.5356 7.05025L12.0001 10.5858L8.46455 7.05025C8.07402 6.65973 7.44086 6.65973 7.05033 7.05025C6.65981 7.44078 6.65981 8.07394 7.05033 8.46447L10.5859 12L7.05033 15.5355C6.65981 15.9261 6.65981 16.5592 7.05033 16.9497C7.44086 17.3403 8.07402 17.3403 8.46455 16.9497L12.0001 13.4142L15.5356 16.9497C15.9261 17.3403 16.5593 17.3403 16.9498 16.9497C17.3404 16.5592 17.3404 15.9261 16.9498 15.5355L13.4143 12L16.9498 8.46447Z" fill="inherit" />
                        </svg>
                    </button>
                    <div>
                        <h4 className='w-full font-medium py-3 mb-3 text-2xl font-sans border-b capitalize border-gray-700 text-white'>{heading}</h4>
                        {children}
                    </div>
                </div>
        </div>
    )
}

export default Modal