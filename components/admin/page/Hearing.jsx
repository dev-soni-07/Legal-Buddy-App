import { useStateContext } from '@/context/Statecontext'
import { db } from '@/firebase'
import addDocument from '@/firebase/addDocument'
import getDocuments from '@/firebase/getDocuments'
import updateDocument from '@/firebase/updateDocument'
import { collection, getDocs, query, where } from 'firebase/firestore'
import jsPDF from 'jspdf'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Header from '../base/Header'
import Modal from '../base/Modal'
import PrimaryButton from '../base/PrimaryButton'
import PrimaryInput from '../base/PrimaryInput'
import Textarea from '../base/Textarea'

function Hearing() {
    const DOCNAME = "hearing"
    const [hearings, setHearings] = useState([])
    const [cases, setCases] = useState([])
    const { setAlert, currentUser, setLoading, deleteDocument, setDeleteDocument } = useStateContext()
    const [isOpen, setIsOpen] = useState({
        type: "",
        show: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const initialProps = {
        dateAndTime: "",
        location: "",
        purpose: "",
        remarks: "",
        hearingNo: ""
    }
    const [values, setValues] = useState(initialProps)
    const { query: idQuery, replace } = useRouter()
    const handleOnSubmit = async (e) => {
        // if (name)
        e.preventDefault()
        const { dateAndTime, location, purpose, remarks } = values
        if (!dateAndTime, !location, !remarks, !purpose) {
            setAlert({ isShow: true, duration: 3000, message: "Add all fields", type: "error" })
            return
        }
        setIsLoading(true)
        try {
            const data = {
                ...values,
                userId: currentUser?.uid,
                caseId: idQuery.id,
                hearingNo: values.hearingNo || hearings.length + 1
            }
            const res = isOpen.type === 'new' ? await addDocument(DOCNAME, data) : await updateDocument(DOCNAME, data, isOpen.id)

            setAlert({ isShow: true, duration: 3000, message: res, type: "success" })
            setIsOpen({
                type: "",
                show: false
            })
            setIsSuccess(true)
            setValues(initialProps)
        } catch (error) {
            setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
        }
        setIsLoading(false)
    }
    function generateSimplePDF(id, hearingNo) {
        const data = cases.filter(item => item.id === id)[0]
        const doc = new jsPDF();
        doc.setFontSize(30)
        doc.text("INVOICE", 80, 20);
        doc.setFont("courier")
        doc.setFontSize(20)
        doc.text(`Invoice Id: ${data.id}`, 10, 40);
        doc.text(`Client Name: ${data.name}`, 10, 50)
        doc.text(`Lawyer: ${data.lawyer}`, 10, 60)
        doc.text(`Respondent Lawyer: ${data.respondedLawyer}`, 10, 70)
        doc.text(`Respondent Name: ${data.respondedName}`, 10, 80)
        doc.text(`Case No.: ${data.caseNo}`, 10, 90)
        doc.text(`Hearing No.: ${hearingNo}`, 100, 90)
        doc.text(`Case Type: ${data.caseType}`, 10, 100)
        doc.text(`Case Charges(Based on Case Type): ${data.baseCost}`, 10, 110)
        doc.text(`Lawyer's Per Hearing Charges: ${data.perHeiringCost}`, 10, 120)
        doc.setFontSize(25)
        doc.text(`Total Charges: ${parseInt(data.perHeiringCost) + parseInt(data.baseCost)}`, 10, 140)

        doc.save("Invoice.pdf");

    }
    useEffect(() => {
        async function fetchDocuments() {
            setLoading(true)
            try {
                const snapshot = await getDocs(query(collection(db, DOCNAME), where("userId", "==", currentUser.uid), where("caseId", "==", idQuery.id)))
                const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const caseDocuments = await getDocuments("case", currentUser.uid);
                setCases(caseDocuments)
                setHearings(documents)
            } catch (error) {
                console.error("Error retrieving Firestore documents:", error);
            }
            setLoading(false)
        }
        !deleteDocument.show || !isLoading ? fetchDocuments() : "";
    }, [isLoading, deleteDocument.show])
    console.log(hearings)
    return (
        <main className='px-4 py-6 flex min-h-screen'>
            <div className="w-full">
                <Header heading="Hearings" detail="Client hearings and details with hearings invoice." image="/hearings.png" />
                <Modal {...{ isOpen, setIsOpen, size: "md", heading: `${isOpen.type} Hearing` }}>
                    <form className="flex flex-col justify-center w-full" onSubmit={handleOnSubmit}>
                        <div className="flex space-x-4">
                            <div className='w-full'>
                                <label htmlFor="dateAndTime">Add date and time of hearing</label>
                                <PrimaryInput {...{ setValues, values, name: "dateAndTime", placeholder: "Select Hearing date", type: "dateTime-local", isRequired: false }} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="dateAndTime">Location of hearing</label>
                                <PrimaryInput {...{ setValues, values, name: "location", placeholder: "Location of Hearing", isRequired: false, maxLen: 50 }} />
                            </div>
                        </div>
                        <label htmlFor="dateAndTime">Purpose of hearing</label>
                        <PrimaryInput {...{ setValues, values, name: "purpose", placeholder: "Purpose of Hearing", isRequired: false, maxLen: 50 }} />
                        <label htmlFor="dateAndTime">Remarks of hearing</label>
                        <Textarea {...{ setValues, values, name: "remarks", placeholder: "Remarks of Hearing", isRequired: false }} />
                        <PrimaryButton {...{ setIsSuccess, isLoading, isSuccess, text: `${isOpen.type} Hearing` }} />
                    </form>
                </Modal>
                <div className='w-full flex justify-end'>
                    <button className='px-4 py-2 rounded font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 transition-colors shadow-lg shadow-slate-900/50 capitalize flex items-center gap-2' onClick={() => {
                        setIsOpen({
                            type: "new",
                            show: true
                        })
                        setValues(initialProps)
                    }}>Add Hearing
                        <img src="/plus.svg" alt="plus Image" className='h-5' /></button>
                </div>
                <div className='pt-10'>
                    {hearings.map((hearing, i) => (
                        <section key={i} className="w-full pt-8 pb-4 border-t border-b border-gray-700 flex justify-between">
                            <span className='text-xl font-semibold pl-4'>{hearing.hearingNo}.</span>
                            <div>
                                <div className="sm:max-w-4xl max-w-sm md:px-10 sm:px-6 px-2 w-full flex md:gap-12 sm:gap-8 gap-4 m-auto flex-col sm:flex-row">
                                    <div className='flex flex-col md:min-w-[15rem] sm:min-w-[10rem]'>
                                        <span className='font-semibold break-words w-fit'>{hearing.purpose}</span>
                                        <span className='sm:text-sm text-xs text-gray-500'>{hearing.caseId}</span>
                                    </div>
                                    <div>
                                        <p className='sm:text-sm text-xs text-gray-800  break-words'>{hearing.remarks}</p>
                                        <span className='sm:text-sm text-xs text-gray-500'>{hearing.dateAndTime}</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 pt-2 sm:pr-4 justify-end'>
                                    <button className='text-blue-400' onClick={() => {
                                        const newDoc = { ...hearing }
                                        delete newDoc.id
                                        setValues(newDoc)
                                        setIsOpen({
                                            type: "update",
                                            show: true,
                                            id: hearing.id
                                        })
                                    }}>Edit</button>
                                    <button className='text-red-500' onClick={() => setDeleteDocument({ show: true, docName: "team", docId: hearing.id })}>Delete</button>
                                </div>
                            </div>
                            <button onClick={() => generateSimplePDF(hearing.caseId, hearing.hearingNo)}>Download Invoice</button>

                        </section>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Hearing