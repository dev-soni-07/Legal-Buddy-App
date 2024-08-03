import { useStateContext } from '@/context/Statecontext'
import getDocuments from '@/firebase/getDocuments'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Header from '../base/Header'

function AllCases() {
    const DOCNAME = "case"
    const [cases, setCases] = useState([])
    const [categoriesCase, setCategoriesCase] = useState([])
    const [caseType, setCaseType] = useState("")
    const { setLoading, deleteDocument, setDeleteDocument, currentUser } = useStateContext()
    useEffect(() => {
        async function fetchDocuments() {
            setLoading(true)
            const documents = await getDocuments(DOCNAME, currentUser.uid);
            setCases(documents)
            setCategoriesCase(documents)
            setLoading(false)
        }
        deleteDocument.show || fetchDocuments()
    }, [deleteDocument])
    console.log(cases)
    const genrateCaseTabClass = (type) => {
        return caseType === type ? "relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm  font-semibold text-gray-900" : "block p-4 text-sm font-medium text-black font-semibold"
    }
    const categoriesCaseType = (type) => {
        setCaseType(type)
        if (type.length !== 0) {
            const newCases = cases.filter(item => item.stageOfCase === type)
            console.log(type, newCases)
            setCategoriesCase(newCases)
        } else {
            setCategoriesCase(cases)
        }
    }
    
    console.log(cases)
    return (
        <main className='px-4 pt-6 flex'>
            <div className='w-full'>
                <Header heading="Cases" detail="All Cases with their details" image="/laws.png" />
                <div className='w-full flex justify-end pb-4'>
                    <Link className='px-4 py-2 rounded font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 transition-colors shadow-lg shadow-slate-900/50 capitalize flex items-center gap-2' href='/admin/createCase' passHref>Create case
                        <img src="/plus.svg" alt="plus Image" className='h-5' />
                    </Link>
                </div>
                <ul className="flex border-b border-gray-200 text-center">
                    <li className="flex-1">
                        <span
                            className={`${genrateCaseTabClass("")} cursor-pointer transition-all`} onClick={() => categoriesCaseType("")}

                        >
                            <span className="absolute inset-x-0 -bottom-px h-px w-full bg-white text-gray-100"></span>
                            All Cases
                        </span>
                    </li>

                    <li className="flex-1">
                        <span className={`${genrateCaseTabClass("running")} cursor-pointer transition-all`} onClick={() => categoriesCaseType("running")}>
                            Running
                        </span>
                    </li>

                    <li className="flex-1">
                        <span className={`${genrateCaseTabClass("pending")} cursor-pointer transition-all`} onClick={() => categoriesCaseType("pending")}> Pending </span>
                    </li>

                    <li className="flex-1">
                        <span className={`${genrateCaseTabClass("archived")} cursor-pointer transition-all`} onClick={() => categoriesCaseType("archived")}>
                            Archived
                        </span>
                    </li>
                </ul>

                <div className="flex flex-wrap w-full gap-10 p-2">
                    {categoriesCase.map((item, i) => (
                        <div className="max-w-xl min-w-[35rem] bg-white rounded-lg shadow-md overflow-hidden my-8 text-gray-900 " key={i}>
                            <div className="px-6 py-4 h-[85%]">
                                <div className="font-bold text-xl mb-2 capitalize"><span className="font-medium">{item.name}</span></div>
                                <div className="flex flex-row justify-between mb-2">
                                    <div className="text-gray-700 text-base font-semibold">Lawyer: <span className="font-medium">{item.lawyer}</span></div>
                                    <div className="text-gray-700 text-base font-semibold">Respondent Lawyer: <span className="font-medium">{item.respondedLawyer}</span></div>
                                </div>
                                <div className="flex flex-row justify-between mb-2">
                                    <div className="text-gray-700 text-base font-semibold">Respondent Name: <span className="font-medium">{item.respondedName}</span></div>
                                    <div className="text-gray-700 text-base font-semibold">Case No.: <span className="font-medium">{item.caseNo}</span></div>
                                </div>
                                <div className="flex flex-row justify-between mb-2">
                                    <div className="text-gray-700 text-base font-semibold">Case Type: <span className="font-medium">{item.caseType}</span></div>
                                    <div className="text-gray-700 text-base font-semibold">Case SubType: <span className="font-medium">{item.caseSubType}</span></div>
                                </div>
                                <div className="flex flex-row justify-between mb-2">
                                    <div className="text-gray-700 text-base font-semibold">Stage of Case: <span className="font-medium">{item.stageOfCase}</span></div>
                                    <div className="text-gray-700 text-base font-semibold">Filing Number: <span className="font-medium">{item.fillingNumber}</span></div>
                                </div>
                                <div className="text-gray-700 text-base font-semibold mb-2">Description: <span className="font-medium">{item.description}</span></div>
                                <div className="flex flex-row justify-between mb-2">
                                    <div className="text-gray-700 text-base font-semibold">Filing Date: <span className="font-medium">{item.fillingDate}</span></div>
                                    <div className="text-gray-700 text-base font-semibold">Registration Number: <span className="font-medium">{item.registrationNumber}</span></div>
                                </div>
                                <div className="flex flex-row justify-between mb-2">
                                    <div className="text-gray-700 text-base font-semibold">Registration Date: <span className="font-medium">{item.registrationDate}</span></div>
                                    <div className="text-gray-700 text-base font-semibold">First Hearing Date: <span className="font-medium">{item.firstHeartingDate}</span></div>
                                </div>
                                <div className="text-gray-700 text-base font-semibold">Remark: <span className="font-medium">{item.remarks}</span></div>
                            </div>
                            <div className="p-4 flex justify-between border-t items-center h-16">
                                <Link href={`/admin/${item.id}/hearing`} className='text-lg text-gray-500 font-semibold'>View Hearings</Link>
                                <div className="flex justify-end gap-4 text-sm items-center">
                                    <Link className='text-blue-400' href={`/admin/${item.id}/edit`} >Edit</Link>
                                    <button className='text-red-500' onClick={() => setDeleteDocument({ show: true, docName: DOCNAME, docId: item.id })}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}

export default AllCases