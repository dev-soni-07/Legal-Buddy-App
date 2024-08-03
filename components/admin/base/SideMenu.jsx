import Loader from '@/components/Loader'
import { useStateContext } from '@/context/Statecontext'
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function SideMenu() {
    const { pathname, replace } = useRouter()
    const { adminMenu, setAdminMenu, setLoading } = useStateContext()
    function checkBackgroundAndColor(url) {
        if (pathname == url) {
            return "bg-gray-400 text-black"
        }
        return "text-gray-400"
    }
    const handleSignOut = async () => {
        try {
            setLoading(true)
            await signOut(auth)
            replace('/admin/login')
            setLoading(false)
        } catch (error) {
            console.log(error)
            setAlert({ isShow: true, duration: 3000, message: error.response?.data?.message || error.message, type: "error" })
        }
    }
    return (
        <div style={{ transform: adminMenu ? "translateX(0)" : "translateX(-100%)", boxShadow: "rgb(0 0 0 / 30%) 5px -1px 12px 0px" }} className="flex h-screen flex-col justify-between border-r border-slate-800 bg-slate-900/70 w-64 fixed top-0 left-0 bottom-0 transition-transform duration-500 z-40  backdrop-blur-sm rounded-3xl rounded-l-none">
            <div className="px-4 py-6">
                <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1 mr-2">
                    <Link
                        href={"/admin"}
                        passHref
                        onClick={() => setAdminMenu(false)}
                        className={`${checkBackgroundAndColor('/admin')} rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:bg-opacity-50 `}
                    >
                        <span className="text-sm font-medium flex items-center gap-2 text-white">
                        <img src="/settings.svg" alt="Setting Image" className="h-5 w-5 opacity-75"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1" />

                            DASHBOARD </span>
                    </Link>

                    <Link
                        href={'/admin/lawyer'}
                        className={`${checkBackgroundAndColor('/admin/lawyer')} rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:bg-opacity-50 `}
                        passHref
                        onClick={() => setAdminMenu(false)}
                    >
                        <span className="flex items-center gap-2 text-white text-sm font-medium">
                        <img src="/profile.svg" alt="Profile Image" className="h-5 w-5 opacity-75"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1" />
                            YOUR PROFILE</span>

                            
                    </Link>

                    <Link
                        href={'/admin/client'}
                        className={`${checkBackgroundAndColor('/admin/client')} rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:bg-opacity-50 `}
                        passHref
                        onClick={() => setAdminMenu(false)}
                    >
                        <span className="flex items-center gap-2 text-white text-sm font-medium">
                        <svg fill="#f5f5f5"  className="h-5 w-5 opacity-75" width="800px" height="800px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000" stroke-width="2">
                                <title>group</title>
                                <path d="M20.906 20.75c1.313 0.719 2.063 2 1.969 3.281-0.063 0.781-0.094 0.813-1.094 0.938-0.625 0.094-4.563 0.125-8.625 0.125-4.594 0-9.406-0.094-9.75-0.188-1.375-0.344-0.625-2.844 1.188-4.031 1.406-0.906 4.281-2.281 5.063-2.438 1.063-0.219 1.188-0.875 0-3-0.281-0.469-0.594-1.906-0.625-3.406-0.031-2.438 0.438-4.094 2.563-4.906 0.438-0.156 0.875-0.219 1.281-0.219 1.406 0 2.719 0.781 3.25 1.938 0.781 1.531 0.469 5.625-0.344 7.094-0.938 1.656-0.844 2.188 0.188 2.469 0.688 0.188 2.813 1.188 4.938 2.344zM3.906 19.813c-0.5 0.344-0.969 0.781-1.344 1.219-1.188 0-2.094-0.031-2.188-0.063-0.781-0.188-0.344-1.625 0.688-2.25 0.781-0.5 2.375-1.281 2.813-1.375 0.563-0.125 0.688-0.469 0-1.656-0.156-0.25-0.344-1.063-0.344-1.906-0.031-1.375 0.25-2.313 1.438-2.719 1-0.375 2.125 0.094 2.531 0.938 0.406 0.875 0.188 3.125-0.25 3.938-0.5 0.969-0.406 1.219 0.156 1.375 0.125 0.031 0.375 0.156 0.719 0.313-1.375 0.563-3.25 1.594-4.219 2.188zM24.469 18.625c0.75 0.406 1.156 1.094 1.094 1.813-0.031 0.438-0.031 0.469-0.594 0.531-0.156 0.031-0.875 0.063-1.813 0.063-0.406-0.531-0.969-1.031-1.656-1.375-1.281-0.75-2.844-1.563-4-2.063 0.313-0.125 0.594-0.219 0.719-0.25 0.594-0.125 0.688-0.469 0-1.656-0.125-0.25-0.344-1.063-0.344-1.906-0.031-1.375 0.219-2.313 1.406-2.719 1.031-0.375 2.156 0.094 2.531 0.938 0.406 0.875 0.25 3.125-0.188 3.938-0.5 0.969-0.438 1.219 0.094 1.375 0.375 0.125 1.563 0.688 2.75 1.313z"></path>
                            </svg>

                            CLIENTS </span>
                    </Link>

                    <Link
                        href={'/admin/cases'}
                        className={`${checkBackgroundAndColor('/admin/cases')} rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:bg-opacity-50 `}
                        passHref
                        onClick={() => setAdminMenu(false)}
                    >
                        <span className="flex items-center gap-2 text-white text-sm font-medium">
                        <svg fill="#f5f5f5" className="h-6 w-6 opacity-75" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg"><path d="M9.316 14.722a.477.477 0 0 1-.475.475H1.433a.477.477 0 0 1-.475-.475v-.863a.477.477 0 0 1 .475-.475h7.408a.476.476 0 0 1 .475.475zm-2.767-2.587a.552.552 0 0 1-.392-.163L2.96 8.776a.554.554 0 0 1 .784-.784L6.94 11.19a.554.554 0 0 1-.392.946zm7.33.992L9.435 8.682l1.085-1.084-3.173-3.173-2.97 2.97 3.173 3.172 1.102-1.101 4.445 4.445a.554.554 0 1 0 .784-.784zm-2.33-5.993a.552.552 0 0 1-.391-.162L7.96 3.775a.554.554 0 1 1 .784-.784l3.196 3.197a.554.554 0 0 1-.391.946z" stroke="#000" stroke-width="1"/></svg>

                            CASES </span>
                    </Link>

                    <Link
                        href={'/admin/team'}
                        className={`${checkBackgroundAndColor('/admin/team')} rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:bg-opacity-50 `}
                        passHref
                        onClick={() => setAdminMenu(false)}
                    >
                        <span className="flex items-center gap-2 text-white text-sm font-medium">
                        <svg className="h-6 w-6 opacity-75" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#f5f5f5" stroke="#000" stroke-width="15"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path class="st0" d="M256.495,96.434c26.632,0,48.213-21.597,48.213-48.205C304.708,21.58,283.128,0,256.495,0 c-26.65,0-48.222,21.58-48.222,48.229C208.274,74.837,229.846,96.434,256.495,96.434z"></path> <path class="st0" d="M298.267,119.279h-42.271h-42.271c-23.362,0-48.779,25.418-48.779,48.788v162.058 c0,11.685,9.463,21.156,21.148,21.156c5.743,0,0,0,14.756,0l8.048,138.206c0,12.434,10.078,22.513,22.513,22.513 c5.244,0,14.923,0,24.585,0c9.671,0,19.35,0,24.593,0c12.434,0,22.513-10.078,22.513-22.513l8.04-138.206 c14.764,0,9.013,0,14.764,0c11.676,0,21.148-9.471,21.148-21.156V168.067C347.054,144.697,321.636,119.279,298.267,119.279z"></path> <path class="st0" d="M104.141,149.083c23.262,0,42.105-18.85,42.105-42.104c0-23.262-18.843-42.112-42.105-42.112 c-23.27,0-42.104,18.851-42.104,42.112C62.037,130.232,80.871,149.083,104.141,149.083z"></path> <path class="st0" d="M408.716,149.083c23.27,0,42.104-18.85,42.104-42.104c0-23.262-18.834-42.112-42.104-42.112 c-23.253,0-42.104,18.851-42.104,42.112C366.612,130.232,385.463,149.083,408.716,149.083z"></path> <path class="st0" d="M137.257,169.024h-33.548h-36.92c-20.398,0-42.595,22.213-42.595,42.612v141.526 c0,10.212,8.264,18.476,18.468,18.476c5.018,0,0,0,12.884,0l7.024,120.704c0,10.852,8.805,19.658,19.666,19.658 c4.577,0,13.024,0,21.473,0c8.439,0,16.895,0,21.472,0c10.861,0,19.666-8.805,19.666-19.658l7.016-120.704v-6.849 c-8.98-8.856-14.606-21.082-14.606-34.664V169.024z"></path> <path class="st0" d="M445.211,169.024h-36.928h-33.54v161.101c0,13.582-5.626,25.808-14.615,34.664v6.849l7.017,120.704 c0,10.852,8.814,19.658,19.674,19.658c4.578,0,13.025,0,21.464,0c8.456,0,16.904,0,21.481,0c10.862,0,19.659-8.805,19.659-19.658 l7.032-120.704c12.883,0,7.865,0,12.883,0c10.204,0,18.468-8.265,18.468-18.476V211.636 C487.806,191.237,465.61,169.024,445.211,169.024z"></path> </g> </g></svg>

                            TEAM MEMBERS </span>
                    </Link>
                </nav>
            </div>
            <button className="shrink-0 fill-gray-300 transition duration-300 rotate-90 absolute top-[50%] right-0 cursor-pointer hover:fill-gray-200" onClick={() => setAdminMenu(false)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="inherit"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 font-semibold">
                <button onClick={handleSignOut} className="flex items-center gap-2 text-white px-4 py-3 pl-[50%] hover:bg-gray-200 w-full  hover:text-gray-700 text-gray-300 transition-colors">
                    LOGOUT
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 stroke-current transition-[stroke]"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}
