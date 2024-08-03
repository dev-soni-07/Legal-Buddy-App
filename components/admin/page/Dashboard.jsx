import { useStateContext } from '@/context/Statecontext'
import getDocuments from '@/firebase/getDocuments'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Dashboard() {
    const { setLoading, currentUser } = useStateContext()
    const [cases, setCases] = useState([])
    const [clients, setClients] = useState([])
    const [teamMember, setTeamMember] = useState([])
    useEffect(() => {
        async function fetchDocuments() {
            setLoading(true)
            console.log(currentUser.uid)
            const caseDocument = await getDocuments("case", currentUser?.uid);
            const clientDocument = await getDocuments("client", currentUser?.uid);
            const teamMemberDocument = await getDocuments("team", currentUser?.uid);

            setCases(caseDocument);
            setClients(clientDocument);
            setTeamMember(teamMemberDocument);
            setLoading(false)
        }
        fetchDocuments()
    }, [currentUser])
    const getArchivedCases = () => {
        return cases.filter(item => item.stageOfCase === "archived")
    }
    console.log(teamMember)
    return (
        <main className='px-4 pt-6 min-h-screen pb-10 h-full'>
            <div className=' flex justify-between pb-4 mx-6 border-b border-gray-700 my-6'>
                <h1 className="text-2xl sm:text-3xl md:text-5xl text-black font-semibold ">
                    Dashboard
                </h1>
            </div>
            <div className="flex flex-wrap justify-evenly gap-4 py-10">
                <div className='space-x-1  min-w-[12rem] md:min-w-[16rem] rounded-xl border border-gray-700 p-4 bg-gray-400' id='clients'>
                    <div className='flex justify-between'>
                        <span className='text-3xl sm:text-5xl md:text-7xl font-semibold'>{clients.length}</span>
                        <img src="./clients.svg" alt="Client Image" className='h-24' />
                    </div>
                    <div>
                        <span className='text-base sm:text-lg md:text-2xl block'>Clients</span>
                        <span className='text-sm md:text-base font-semibold block text-gray-500'>Total Clients</span>
                    </div>
                </div>
                <div className='space-x-1  min-w-[12rem] md:min-w-[16rem] rounded-xl border border-gray-700 p-4 bg-gray-400' id='cases'>
                    <div className='flex justify-between'>
                        <span className='text-3xl sm:text-5xl md:text-7xl font-semibold'>{cases.length}</span>
                        <img src="./cases.svg" alt="Client Image" className='h-24' />
                    </div>
                    <div>
                        <span className='text-base sm:text-lg md:text-2xl block'>Cases</span>
                        <span className='text-sm md:text-base font-semibold block text-gray-500'>Total Cases</span>
                    </div>
                </div>
                <div className='space-x-1  min-w-[12rem] md:min-w-[16rem] rounded-xl border border-gray-700 p-4 bg-gray-400' id='cases'>
                    <div className='flex justify-between'>
                        <span className='text-3xl sm:text-5xl md:text-7xl font-semibold'>{getArchivedCases().length}</span>
                        <img src="./archieved.svg" alt="archieved Image" className='h-20 mb-4' />
                    </div>
                    <div>
                        <span className='text-base sm:text-lg md:text-2xl block'>Archieved Cases</span>
                        <span className='text-sm md:text-base font-semibold block text-gray-500'>Total Completed Cases</span>
                    </div>
                </div>
                <div className='space-x-1  min-w-[12rem] md:min-w-[16rem] rounded-xl border border-gray-700 p-4 bg-gray-400' id='cases'>
                    <div className='flex justify-between'>
                        <span className='text-3xl sm:text-5xl md:text-7xl font-semibold'>{teamMember.length}</span>
                        <img src="./team.svg" alt="team Image" className='h-20 mb-4' />
                    </div>
                    <div>
                        <span className='text-base sm:text-lg md:text-2xl block'>Team Members</span>
                        <span className='text-sm md:text-base font-semibold block text-gray-500'>Total Team Members</span>
                    </div>
                </div>
            </div>
            <div className="p-4 border border-gray-700 bg-gray-400 rounded-lg my-5 mt-10 mx-10">
                <h2 className="text-xl md:text-3xl pb-6 text-black border-b border-gray-700 ">
                    Case board
                </h2>
                <div className='pt-6 pb-4 px-4'>
                    <p>Manange your cases</p>
                    <p>Maintain complete case details like case history, case transfer, next hearing date etc. </p>
                    <Link href='/admin/cases' passHref className='inline-flex items-center gap-2 rounded border border-blue-600 bg-blue-600 px-8 py-3 mt-4 text-white hover:bg-transparent hover:text-blue-200 hover:bg-gray-900 hover:border-gray-900 focus:outline-none focus:ring active:text-blue-500'>
                        <span class="text-sm font-medium flex gap-2"> Manage Cases

                            <svg
                                class="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
            <div className="p-4 border border-gray-700 bg-gray-400 rounded-lg my-5 mt-10 mx-10">
                <h2 className="text-xl md:text-3xl pb-6 text-black border-b border-gray-700 ">
                    Client board
                </h2>
                <div className='pt-6 pb-4 px-4'>
                    <p>Manange your clients</p>
                    <p>Maintain complete client details like case history, case transfer, next hearing date etc. </p>
                    <Link href='/admin/client' passHref className='inline-flex items-center gap-2 rounded border border-blue-600 bg-blue-600 px-8 py-3 mt-4 text-white hover:bg-transparent hover:text-blue-200 hover:bg-gray-900 hover:border-gray-900 focus:outline-none focus:ring active:text-blue-500'>
                        <span class="text-sm font-medium flex gap-2"> Manage Clients

                            <svg
                                class="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
            <div className="p-4 border border-gray-700 bg-gray-400 rounded-lg my-5 mt-10 mx-10">
                <h2 className="text-xl md:text-3xl pb-6 text-black border-b border-gray-700 ">
                    Team Members board
                </h2>
                <div className='pt-6 pb-4 px-4'>
                    <p>Manange your team members</p>
                    <p>Maintain complete team members details like case history, case transfer, next hearing date etc. </p>
                    <Link href='/admin/team' passHref className='inline-flex items-center gap-2 rounded border border-blue-600 bg-blue-600 px-8 py-3 mt-4 text-white hover:bg-transparent hover:text-blue-200 hover:bg-gray-900 hover:border-gray-900 focus:outline-none focus:ring active:text-blue-500'>
                        <span class="text-sm font-medium flex gap-2"> Manage Team Members

                            <svg
                                class="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>

        </main>
    )
}

export default Dashboard