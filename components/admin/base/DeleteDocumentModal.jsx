import { useStateContext } from '@/context/Statecontext'
import { db } from '@/firebase'
import deleteFile from '@/firebase/deleteFile'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import Modal from './Modal'
import PrimaryButton from './PrimaryButton'

function DeleteDocumentModal() {
    const { deleteDocument, setDeleteDocument, setAlert } = useStateContext()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (deleteDocument.docName === "projects") {
                console.log(deleteDocument.docImages)
                deleteDocument.docImages && await deleteDocument.docImages.map((image) => {
                    console.log(image.image)
                    deleteFile(image.image)
                })
            } else {
                deleteDocument.docImages && await deleteDocument.docImages.map((image) => {
                    deleteFile(image)
                })
            }
            await deleteDoc(doc(db, deleteDocument.docName, deleteDocument.docId))
            setIsSuccess(true)
        } catch (error) {
            console.log(error)
            setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
        }
        setDeleteDocument({ show: false })
        setIsLoading(false)
    }
    return (
        <Modal {...{ isOpen: deleteDocument, setIsOpen: setDeleteDocument, size: "sm", heading: "Are you sure?" }}>
            <form className="flex flex-col justify-center w-full" onSubmit={handleOnSubmit}>
                <p className="text-gray-400 sm:text-xl text-lg text-center py-2 md:py-4 lg:py-6">
                    Do you really want to delete these records? This process cannot be undo.
                </p>
                <div className="py-2 mt-2 flex justify-end gap-4 font-medium border-t border-gray-500">
                    <button type='button' className='text-gray-300 hover:text-gray-200 text-center' onClick={() => setDeleteDocument({ show: false })}>No, Cancel</button>
                    <PrimaryButton {...{ isLoading, setIsSuccess, isSuccess, text: "Yes, I am", color: "red" }} />
                </div>
            </form>
        </Modal>
    )
}

export default DeleteDocumentModal