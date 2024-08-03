import { useStateContext } from '@/context/Statecontext';
import React from 'react'
import { useEffect } from 'react';

export default function Alert() {
    const { alert: { message, type, duration, isShow }, setAlert } = useStateContext()
    useEffect(() => {
        setTimeout(() => {
            setAlert({ ...alert, isShow: false, message: "" })
        }, duration);
    }, [duration])
    return (
        <div data-alert-show={isShow} className="fixed top-6 w-full z-40 flex justify-center">
            {type === 'error' ? (
                <div className={`bg-red-100 gap-4 px-4 py-3 rounded-lg flex items-center absolute max-w-lg w-3/4 z-50 my-10`} role="alert">
                    <svg className='w-8' viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <title>error-filled</title>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="add" fill="red" transform="translate(42.666667, 42.666667)">
                                <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" id="Combined-Shape">

                                </path>
                            </g>
                        </g>
                    </svg>
                    <strong className={`font-medium text-red-700`}>{message}</strong>
                </div>
            ) : type === 'success' ? (
                <div className={`bg-green-100 gap-4 px-4 py-3 rounded-lg flex items-center absolute max-w-lg w-3/4 z-50 my-10`} role="alert">
                    <svg fill="green" xmlns="http://www.w3.org/2000/svg"
                        className='w-8' viewBox="0 0 52 52" enable-background="new 0 0 52 52" xmlSpace="preserve">
                        <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5
	                    c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5
	                    c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"/>
                    </svg>
                    <strong className={`font-medium text-green-700`}>{message}</strong>
                </div>
            ) : type === 'warning' && (
                <div className={`bg-yellow-100 gap-4 px-4 py-3 rounded-lg flex items-center absolute max-w-lg w-3/4 z-50 my-10`} role="alert">
                    <img src="/icons/warning-circle-svgrepo-com.svg" alt="" />
                    <svg fill="rgb(234, 179, 8)" className='w-8' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM11,7a1,1,0,0,1,2,0v6a1,1,0,0,1-2,0Zm1,12a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Z" /></svg>
                    <strong className={`font-medium text-yellow-700`}>{message}</strong>
                </div>
            )}
        </div>
    );
}