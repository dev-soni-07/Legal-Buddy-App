import { useStateContext } from '@/context/Statecontext'
import addDocument from '@/firebase/addDocument'
import deleteFile from '@/firebase/deleteFile'
import getDocumentCount from '@/firebase/getDocumentCount'
import getDocuments from '@/firebase/getDocuments'
import updateDocument from '@/firebase/updateDocument'
import uploadFile from '@/firebase/uploadFile'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../base/Header'
import Modal from '../base/Modal'
import PrimaryButton from '../base/PrimaryButton'
import PrimaryInput from '../base/PrimaryInput'
import SelectInput from '../base/SelectInput'

function Team() {
    const DOCNAME = "team"
    const [team, setTeam] = useState([])
    const { setAlert, currentUser, setLoading, setDeleteDocument, deleteDocument } = useStateContext()
    const [isOpen, setIsOpen] = useState({
        type: "",
        show: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const initialProps = {
        name: "",
        category: "",
        image: "",
        perHeiringCost: 0
    }
    const [values, setValues] = useState(initialProps)
    const fileRef = useRef(null)

    const selectImage = () => {
        fileRef.current.click()
    }
    const imageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return setAlert({ isShow: true, duration: 3000, message: "Select image file to upload.", type: "error" })
        }
        setLoading(true)
        const filePath = crypto.randomUUID() + "-" + file.name
        try {
            values.image && await deleteFile(values.image)
            const url = await uploadFile(file, filePath)
            setValues(prevState => ({
                ...prevState,
                image: url
            }))
            setAlert({ isShow: true, duration: 3000, message: "Image has been upload.", type: "success" })
        } catch (error) {
            setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
        }
        setLoading(false)
    }
    const deleteImage = async () => {
        if (!values.image) {
            setAlert({ isShow: true, duration: 3000, message: "No Image Found", type: "error" })
            return
        }
        setLoading(true)
        try {
            await deleteFile(values.image)
            setValues(prevState => ({
                ...prevState,
                image: ""
            }))
            setLoading(false)
            return setAlert({ isShow: true, duration: 3000, message: "Image Deleted successfully.", type: "success" })
        } catch (error) {
            setLoading(false)
            return setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
        }
    }
    const handleOnSubmit = async (e) => {
        // if (name)
        e.preventDefault()
        const { name, category } = values
        if (!name, !category) {
            setAlert({ isShow: true, duration: 3000, message: "Add all fields", type: "error" })
            return
        }
        setIsLoading(true)
        try {
            const data = { ...values, lawyerId: values.lawyerId || await getDocumentCount(DOCNAME) + 1, userId: currentUser?.uid }
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
            setTeam(documents)
            setLoading(false)
        }
        !deleteDocument.show || !isLoading ? fetchDocuments() : "";
    }, [isLoading, deleteDocument.show])
    const lawyerCategory = [
        {
            value: "criminalLawyer",
            name: "Criminal Lawyer"

        },
        {
            value: "familyLawyer",
            name: "Family Lawyer"

        },
        {
            value: "corporateLawyer",
            name: "Corporate Lawyer"
        },
        {
            value: "civilLawyer",
            name: "Civil Lawyer"
        },
        {
            value: "ipLawyer",
            name: "IP Lawyer"
        },
        {
            value: "taxLawyer",
            name: "Tax Lawyer"
        },
        {
            value: "cyberLawyer",
            name: "Cyber Lawyer"
        },
        {
            value: "publicLawyer",
            name: "Public Lawyer"
        },
        {
            value: "medicalLawyer",
            name: "Medical Lawyer"
        },
        {
            value: "labourLawyer",
            name: "Labour Lawyer"
        },
        {
            value: "governmentLawyer",
            name: "Government Lawyer"
        }
    ]
    console.log(team)
    return (
        <main className='px-4 py-6 flex min-h-screen'>
            <div className="w-full">
                <Header heading="Team Members" detail="Your Team Members" image="/teams.png" />
                <Modal {...{ isOpen, setIsOpen, size: "md", heading: `${isOpen.type} Team Member` }}>
                    <form className="flex flex-col justify-center w-full" onSubmit={handleOnSubmit}>
                        <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>Name</label>
                        <PrimaryInput {...{ setValues, values, name: "name", placeholder: "Name", isRequired: true, maxLen: 50 }} />
                        <div className='flex justify-between  py-4'>
                            <span className='w-24 aspect-square relative rounded-full overflow-hidden bg-teal-100 shadow-lg shadow-slate-900/50'>
                                {values.image ? (
                                    <Image src={values.image} alt="user uimage" fill="object-fill" />
                                ) : (
                                    <span className='text-gray-500 flex justify-center items-center text-center font-image h-full w-full font-semibold'>No Image</span>
                                )}
                            </span>
                            <div className='space-x-3'>
                                <input type="file" name="image" onChange={imageChange} className="sr-only" ref={fileRef} />
                                <button onClick={deleteImage} type="button" className='px-2 py-1 bg-red-500 disabled:bg-red-300 rounded text-gray-50 hover:bg-red-400 shadow-lg shadow-slate-900/50' disabled={!values.image}>
                                    Delete
                                </button>
                                <button type='button' onClick={selectImage} className='px-2 py-1 bg-gray-100 rounded text-gray-800 hover:bg-gray-200 shadow-lg shadow-slate-900/50'>
                                    {values.image ? "Update" : "Add Image"}
                                </button>
                            </div>
                        </div>
                        <label htmlFor="heiringPrice" className='text-lg font-medium text-gray-400'>Per Heiring Price</label>
                        <PrimaryInput {...{ setValues, values, name: "perHeiringCost", placeholder: "Heiring Price", isRequired: true, maxLen: 50, type: "number" }} />
                        <label htmlFor="mediaName" className='text-lg font-medium text-gray-400'>Category</label>
                        <SelectInput {...{ values, setValues, placeholder: "---Select Lawyer category---", list: lawyerCategory, name: "category" }} />
                        <PrimaryButton {...{ text: `${isOpen.type} Member`, isLoading, isSuccess, setIsSuccess }} />
                    </form>
                </Modal>
                <div className='w-full flex justify-end'>
                    <button className='px-4 py-2 rounded font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 transition-colors shadow-lg shadow-slate-900/50 capitalize flex items-center gap-2' onClick={() => {
                        setIsOpen({
                            type: "new",
                            show: true
                        })
                        setValues(initialProps)
                    }}> Team member
                        <img src="/plus.svg" alt="plus Image" className='h-5' /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-5
                ">
                    {team.map((member) => (
                        <div className="bg-gray-700 rounded-lg shadow-md" key={member.id}>
                            {member.image ? (
                                <span className="object-cover w-full h-80 rounded-t-lg flex justify-center items-center text-gray-500 bg-gray-200 relative">
                                    <Image className="object-cover w-full h-48 rounded-t-lg" src={member.image} alt="Team member image" fill="object-fit" />
                                </span>
                            ) : (
                                <span className="object-cover w-full h-48 rounded-t-lg flex justify-center items-center text-gray-500 bg-gray-200">No image</span>
                            )}
                            <div className="p-4">
                                <div className="text-sm font-medium text-gray-200">ID: {member.lawyerId}</div>
                                <h3 className="mt-2 text-xl font-semibold text-gray-50">{member.name}</h3>
                                <div className="text-sm font-medium text-gray-300"><span className="font-semibold">Category: </span>{member.category}</div>
                                <div className="text-sm font-medium text-gray-300"><span className="font-semibold">Heiring Price: </span>{member.perHeiringCost}</div>
                                <div className="flex justify-end gap-4 text-sm">
                                    <button className='text-blue-400' onClick={() => {
                                        const newDoc = { ...member }
                                        delete newDoc.id
                                        setValues(newDoc)
                                        setIsOpen({
                                            type: "update",
                                            show: true,
                                            id: member.id
                                        })
                                    }}>Edit</button>
                                    <button className='text-red-500' onClick={() => setDeleteDocument({ show: true, docName: "team", docId: member.id })}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Team