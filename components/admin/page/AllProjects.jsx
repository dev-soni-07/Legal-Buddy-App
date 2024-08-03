import { useStateContext } from '@/context/Statecontext'
import getDocuments from '@/firebase/getDocuments'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import DragAndDropParent from '../base/DragAndDropParent'
import Header from '../base/Header'

function AllProjects() {
    const DOCNAME = "projects"
    const { setLoading, deleteDocument, setDeleteDocument } = useStateContext()
    const [items, setItems] = useState([])
    useEffect(() => {
        async function fetchDocuments() {
            setLoading(true)
            const documents = await getDocuments(DOCNAME);
            setItems(documents)
            setLoading(false)
        }
        !deleteDocument.show && fetchDocuments()
    }, [deleteDocument.show])
    console.log(items)
    return (
        <main className='px-4 pt-6 flex'>
            <div className='w-full'>
                <Header heading="Projects" detail="All projects" image="/projects.jfif" />
                <div className="">
                    {items.length !== 0 ? (
                        <DragAndDropParent {...{ docName: DOCNAME, setItems, items, divClasses: "grid mb-4 my-10 gap-6 gridRepeatProject ml-4" }}>
                            {items && items.map((project, i) => (
                                <Draggable key={project.id} draggableId={project.id} index={i} className="">
                                    {(provided, snapshot) => (
                                        <li {...provided.draggableProps}
                                        ref={provided.innerRef} className='relative max-h-fit h-max hoverTag'>
                                            <span {...provided.dragHandleProps} className='absolute bg-gray-600 hover:bg-gray-500 cursor-grab right-2 dragButton p-1 h-full rounded-lg rounded-l-none flex justify-center items-center text-gray-200 w-7 transition-[right]' data-drag={snapshot.isDragging}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 stroke-current' viewBox="0 0 16 16" version="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                                    <circle cy="2.5" cx="5.5" r=".75" />
                                                    <circle cy="8" cx="5.5" r=".75" />
                                                    <circle cy="13.5" cx="5.5" r=".75" />
                                                    <circle cy="2.5" cx="10.4957" r=".75" />
                                                    <circle cy="8" cx="10.4957" r=".75" />
                                                    <circle cy="13.5" cx="10.4957" r=".75" />
                                                </svg>
                                            </span>
                                            <div className='flex items-center xs:w-[18rem] xl:w-[23rem] sm:w-80  h-fit rounded-lg overflow-hidden shadow-lg shadow-slate-900/50 z-10'>
                                                <div className="w-full h-full flex justify-center bg-slate-900 pb-2 projectDivShadow z-10">
                                                    {/* bg-[#091218] */}
                                                    <div className='flex flex-col w-full h-full items-center'>
                                                        {/* lg:h-52 lg:w-[28rem] */}
                                                        <div className="w-full md:h-44 h-40 relative">
                                                            <Image src={project.images[0].image} fill="object-fit" alt={project.name} />
                                                        </div>
                                                        <Link href={`/projects/${project.id}`} passHref className='w-11/12 pl-1 pt-6 transition-[scale] hover:scale-[1.01] duration-300'>
                                                            <h className="text-white capitalize text-xl md:text-2xl font-semibold">{project.name}</h>
                                                            <div className="flex gap-2 justify-between py-1">
                                                                {project.tags.map((tag, index) => (
                                                                    index <= 2 && <span className="text-gray-500 text-xs sm:text-base uppercase font-bold flex items-center gap-2 projectTagShadow" key={index}>
                                                                        {index === 0 || <span>•</span>}
                                                                        <span>{tag.value}</span>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <p className="text-slate-200 font-medium text-base pb-4">{project.shortDescription}</p>
                                                        </Link>
                                                        <div className='w-full flex justify-around px-4'>
                                                            <Link href={`/admin/${project.id}/edit`} className="px-4 py-1.5 text-sm w-full block text-blue-300 hover:bg-blue-500 hover:text-gray-100 rounded transition-colors text-center">Edit</Link>
                                                            <button onClick={() => setDeleteDocument({ show: true, docName: "projects", docId: project.id, docImages: project.images })} className="px-4 py-1.5 text-sm w-full block text-red-500 hover:bg-red-400 hover:text-gray-100 rounded transition-colors">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                        </DragAndDropParent>
                    ) : (
                        <h4 className="text-xl font-semibold">
                            No results found
                        </h4>
                    )}
                </div>
            </div>
        </main>
    )
}

export default AllProjects