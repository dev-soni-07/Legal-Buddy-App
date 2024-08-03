import { useStateContext } from '@/context/Statecontext'
import deleteFile from '@/firebase/deleteFile'
import uploadFile from '@/firebase/uploadFile'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function ListedImageInput({ values, setValues, name, desc }) {
    const { setLoading, currentUser, setAlert } = useStateContext()
    const [currentImage, setCurrentImage] = useState("")
    const fileRef = useRef(null)
    const selectImage = () => {
        fileRef.current.click()
    }
    const imageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return setAlert({ isShow: true, duration: 3000, message: "Select image file to upload.", type: "error" })
        }
        console.log(file)
        setLoading(true)
        const filePath = crypto.randomUUID() + "-" + file.name
        try {
            const url = await uploadFile(file, filePath)
            const imageObject = { image: url, index: values[name].length + 1, id: crypto.randomUUID(), name: file.name }
            const imageArray = [...values[name], imageObject]
            setValues(prevState => ({
                ...prevState,
                [name]: imageArray
            }))
            console.log(values[name])
            setAlert({ isShow: true, duration: 3000, message: "Image has been upload.", type: "success" })
        } catch (error) {
            setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
        }
        setLoading(false)
    }
    const deleteImage = async (index, arrayIndex) => {
        if (!values[name][arrayIndex]) {
            setAlert({ isShow: true, duration: 3000, message: "No Image Found", type: "error" })
            return
        }
        setLoading(true)
        try {
            await deleteFile(values[name][arrayIndex].image)
            const newValue = values[name].filter(doc => doc.index !== index)
            setValues(prevState => ({
                ...prevState,
                [name]: newValue
            }))
            setLoading(false)
            return setAlert({ isShow: true, duration: 3000, message: "Image Deleted successfully.", type: "success" })
        } catch (error) {
            setLoading(false)
            return setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
        }
    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const itemsCopy = [...values[name]];
        const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
        itemsCopy.splice(result.destination.index, 0, reorderedItem);
        const redefine = itemsCopy.map((item, i) => {
            return { ...item, index: i + 1 }
        })
        setValues(prevState => ({
            ...prevState,
            [name]: redefine
        }))
    }
    return (
        <div className='w-full'>
            <div className="">
                <input type="file" name={name} onChange={imageChange} className="sr-only" ref={fileRef} />
                <button type='button' onClick={selectImage} className='bg-blue-600 rounded px-4 w-full font-medium hover:bg-blue-700 shadow-slate-900/50 justify-center py-2 items-center transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed shadow-lg flex gap-2 outline-none' >
                    <svg className='h-7 stroke-current' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 12C13.5 15.18 10.93 17.75 7.75 17.75C4.57 17.75 2 15.18 2 12C2 8.82 4.57 6.25 7.75 6.25" stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 12C10 8.69 12.69 6 16 6C19.31 6 22 8.69 22 12C22 15.31 19.31 18 16 18" stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Add Image</button>
            </div>
            {desc && <p className='text-gray-300 pt-1 text-sm'>{desc}</p>}
            {values[name] && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                        {(provided) => (
                            <ul {...provided.droppableProps}
                                ref={provided.innerRef} className='space-y-2 py-2'>
                                {values[name].map((val, i) => (
                                    <Draggable key={val.id} draggableId={val.id} index={i} className="">
                                        {(provided, snapshot) => (
                                            <li {...provided.draggableProps}
                                                ref={provided.innerRef} className="flex w-full items-center border border-gray-700 bg-gray-600 px-2 rounded shadow-lg shadow-slate-900/50">
                                                <span  {...provided.dragHandleProps} data-drag={snapshot.isDragging}>
                                                    <svg className='h-8 hover:fill-gray-400 fill-gray-300 transition-colors cursor-grabbing pr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.5 7C9.60457 7 10.5 6.10457 10.5 5C10.5 3.89543 9.60457 3 8.5 3C7.39543 3 6.5 3.89543 6.5 5C6.5 6.10457 7.39543 7 8.5 7Z" fill="current" />
                                                        <path d="M15.5 7C16.6046 7 17.5 6.10457 17.5 5C17.5 3.89543 16.6046 3 15.5 3C14.3954 3 13.5 3.89543 13.5 5C13.5 6.10457 14.3954 7 15.5 7Z" fill="current" />
                                                        <path d="M10.5 12C10.5 13.1046 9.60457 14 8.5 14C7.39543 14 6.5 13.1046 6.5 12C6.5 10.8954 7.39543 10 8.5 10C9.60457 10 10.5 10.8954 10.5 12Z" fill="current" />
                                                        <path d="M15.5 14C16.6046 14 17.5 13.1046 17.5 12C17.5 10.8954 16.6046 10 15.5 10C14.3954 10 13.5 10.8954 13.5 12C13.5 13.1046 14.3954 14 15.5 14Z" fill="current" />
                                                        <path d="M10.5 19C10.5 20.1046 9.60457 21 8.5 21C7.39543 21 6.5 20.1046 6.5 19C6.5 17.8954 7.39543 17 8.5 17C9.60457 17 10.5 17.8954 10.5 19Z" fill="current" />
                                                        <path d="M15.5 21C16.6046 21 17.5 20.1046 17.5 19C17.5 17.8954 16.6046 17 15.5 17C14.3954 17 13.5 17.8954 13.5 19C13.5 20.1046 14.3954 21 15.5 21Z" fill="current" />
                                                    </svg>
                                                </span>
                                                <span className='w-full flex items-center gap-2 text-sm text-gray-50 rounded font-medium h-20 '>
                                                    <span className='h-full relative w-28 border border-gray-500 bg-gray-100 cursor-not-allowed'>
                                                        <Image src={val.image} alt="Project Image" fill="object-fit" />
                                                    </span>
                                                    <Link href={val.image} target="_blank" >{val.name.length > 25 ? val.name.slice(0, 25) : val.name}</Link>
                                                </span>
                                                <button onClick={() => deleteImage(val.index, i)} className="cursor-pointer">
                                                    <svg className='pl-4 pr-2 h-7 hover:fill-gray-400 fill-gray-300 transition-colors' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30958 3.54424C7.06741 2.56989 8.23263 2 9.46699 2H20.9997C21.8359 2 22.6103 2.37473 23.1614 2.99465C23.709 3.61073 23.9997 4.42358 23.9997 5.25V18.75C23.9997 19.5764 23.709 20.3893 23.1614 21.0054C22.6103 21.6253 21.8359 22 20.9997 22H9.46699C8.23263 22 7.06741 21.4301 6.30958 20.4558L0.687897 13.2279C0.126171 12.5057 0.126169 11.4943 0.687897 10.7721L6.30958 3.54424ZM10.2498 7.04289C10.6403 6.65237 11.2734 6.65237 11.664 7.04289L14.4924 9.87132L17.3208 7.04289C17.7113 6.65237 18.3445 6.65237 18.735 7.04289L19.4421 7.75C19.8327 8.14052 19.8327 8.77369 19.4421 9.16421L16.6137 11.9926L19.4421 14.8211C19.8327 15.2116 19.8327 15.8448 19.4421 16.2353L18.735 16.9424C18.3445 17.3329 17.7113 17.3329 17.3208 16.9424L14.4924 14.114L11.664 16.9424C11.2734 17.3329 10.6403 17.3329 10.2498 16.9424L9.54265 16.2353C9.15212 15.8448 9.15212 15.2116 9.54265 14.8211L12.3711 11.9926L9.54265 9.16421C9.15212 8.77369 9.15212 8.14052 9.54265 7.75L10.2498 7.04289Z" fill="current" />
                                                    </svg>
                                                </button>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    )
}

export default ListedImageInput