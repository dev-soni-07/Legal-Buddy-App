import { useStateContext } from '@/context/Statecontext'
import addDocument from '@/firebase/addDocument'
import getDocuments from '@/firebase/getDocuments'
import updateDocument from '@/firebase/updateDocument'
import React, { useEffect, useState } from 'react'
import Header from '../base/Header'
import Modal from '../base/Modal'
import PrimaryButton from '../base/PrimaryButton'
import PrimaryInput from '../base/PrimaryInput'

function Clients() {
    const DOCNAME = "client"
    const [clients, setClients] = useState([])
    const { setAlert, currentUser, setLoading, deleteDocument, setDeleteDocument } = useStateContext()
    const [isOpen, setIsOpen] = useState({
        type: "",
        show: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const initialProps = {
        name: "",
        email: "",
        phone: "",
        alternateNo: "",
        country: "",
        state: "",
        city: "",
        address: "",
    }
    const [values, setValues] = useState(initialProps)
    const handleOnSubmit = async (e) => {
        // if (name)
        e.preventDefault()
        const { name, email, phone, alternateNo, country, state, city, address } = values
        if (!name, !email, !phone, !alternateNo, !country, !state, !city, !address) {
            setAlert({ isShow: true, duration: 3000, message: "Add all fields", type: "error" })
        }
        setIsLoading(true)
        try {
            const data = {
                ...values,
                userId: currentUser?.uid
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
    useEffect(() => {
        async function fetchDocuments() {
            setLoading(true)
            const documents = await getDocuments(DOCNAME);
            setClients(documents)
            setLoading(false)
        }
        !deleteDocument.show || !isLoading ? fetchDocuments() : "";
    }, [isLoading, deleteDocument.show])
    return (
        <main className='px-4 py-6 flex min-h-screen'>
            <div className="w-full">
                <Header heading="Clients" detail="Your clients details with their contacts." image="/clients.png" />
                <Modal {...{ isOpen, setIsOpen, size: "lg", heading: "Client" }}>
                    <form className="flex flex-col justify-center w-full" onSubmit={handleOnSubmit}>
                        <div className='flex space-x-4'>
                            <div className='w-full'>
                                <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>Name</label>
                                <PrimaryInput {...{ setValues, values, name: "name", placeholder: "Name", isRequired: false, maxLen: 50 }} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>Email</label>
                                <PrimaryInput {...{ setValues, values, name: "email", placeholder: "Email address", isRequired: false, type: "email", maxLen: 70, minLen: 8 }} />
                            </div>
                        </div>

                        <div className='flex space-x-4'>
                            <div className='w-full'>
                                <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>Phone Number</label>
                                <PrimaryInput {...{ setValues, values, name: "phone", placeholder: "Phone Number", isRequired: false, type: "tel", maxLen: 11, minLen: 10 }} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>Alternate Number</label>
                                <PrimaryInput {...{ setValues, values, name: "alternateNo", placeholder: "Alternate Number", isRequired: false, type: "tel", maxLen: 11, minLen: 10 }} />
                            </div>
                        </div>

                        <div className='flex space-x-4'>
                            <div className='w-full'>

                                <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>Country</label>
                                <PrimaryInput {...{ setValues, values, name: "country", placeholder: "Country", isRequired: false, type: "text", maxLen: 30, minLen: 3 }} />
                            </div>
                            <div className='w-full'>

                                <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>State</label>
                                <PrimaryInput {...{ setValues, values, name: "state", placeholder: "State", isRequired: false, type: "text", maxLen: 30, minLen: 3 }} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>City</label>
                                <PrimaryInput {...{ setValues, values, name: "city", placeholder: "City", isRequired: false, type: "text", maxLen: 30, minLen: 3 }} />
                            </div>
                        </div>

                        <div className='w-full'>
                            <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>Address</label>
                            <PrimaryInput {...{ setValues, values, name: "address", placeholder: "Address", isRequired: false, type: "text", maxLen: 60, minLen: 8 }} />
                        </div>
                        <div className="py-2 flex justify-end gap-4 font-medium">
                            <button type='button' className='text-gray-300 hover:text-gray-200' onClick={() => setIsOpen({ type: "", show: false })}>Close</button>
                            <PrimaryButton {...{ isLoading, setIsSuccess, isSuccess, text: isOpen.type === "new" ? "Add Client" : "Add Client" }} />
                        </div>
                    </form>
                </Modal>
                <div className='w-full flex justify-end'>
                    <button className='px-4 py-2 rounded font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 transition-colors shadow-lg shadow-slate-900/50 capitalize flex items-center gap-2' onClick={() => {
                        setIsOpen({
                            type: "new",
                            show: true
                        })
                        setValues(initialProps)
                    }}>Add Client
                        <img src="/plus.svg" alt="plus Image" className='h-5' /></button>
                </div>
                <div className='pt-10 flex flex-col gap-6'>
                    {clients.map((client, i) => (
                        <section key={i} className="w-full gap-2 border-gray-200 border-b pb-4">
                            <div className='flex flex-wrap gap-4'>
                                <div className='flex space-x-4 justify-between px-2 py-2 w-96 bg-gray-100 border-r'>
                                    <span className="text-black">Name</span>
                                    <span className="text-gray-600">{client.name}</span>
                                </div>
                                <div className='flex space-x-4 justify-between px-2 py-2 w-96 bg-gray-100 border-r'>
                                    <span className="text-black">Phone Number</span>
                                    <span className="text-gray-600">{client.phone}</span>
                                </div>
                                <div className='flex space-x-4 justify-between px-2 py-2 w-96 bg-gray-100 border-r'>
                                    <span className="text-black">Alternate No</span>
                                    <span className="text-gray-600">{client.alternateNo}</span>
                                </div>
                                <div className='flex space-x-4 justify-between px-2 py-2 w-96 bg-gray-100 border-r'>
                                    <span className="text-black">Country</span>
                                    <span className="text-gray-600">{client.country}</span>
                                </div>
                                <div className='flex space-x-4 justify-between px-2 py-2 w-96 bg-gray-100 border-r'>
                                    <span className="text-black">State</span>
                                    <span className="text-gray-600">{client.state}</span>
                                </div>
                                <div className='flex space-x-4 justify-between px-2 py-2 w-96 bg-gray-100 border-r'>
                                    <span className="text-black">City</span>
                                    <span className="text-gray-600">{client.city}</span>
                                </div>
                                <div className='flex space-x-4 justify-between px-2 py-2 w-96 bg-gray-100 border-r'>
                                    <span className="text-black">Address</span>
                                    <span className="text-gray-600">{client.address}</span>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 text-sm">
                                <button className='text-black' onClick={() => {
                                    const newDoc = { ...client }
                                    delete newDoc.id
                                    setValues(newDoc)
                                    setIsOpen({
                                        type: "update",
                                        show: true,
                                        id: client.id
                                    })
                                }}>Edit</button>
                                <button className='text-red-500' onClick={() => setDeleteDocument({ show: true, docName: DOCNAME, docId: client.id })}>Delete</button>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Clients