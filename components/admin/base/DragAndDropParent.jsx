import { useStateContext } from '@/context/Statecontext'
import getDocuments from '@/firebase/getDocuments'
import updateDocument from '@/firebase/updateDocument'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function DragAndDropParent({ children, docName, items, setItems, divClasses }) {
    const [data, setData] = useState(items)
    useEffect(() => {
      if (items) setData(items)
    }, [items])
    
    const { setAlert, setLoading } = useStateContext()
    const update = async (index, id) => {
        setLoading(true);
        try {
            await updateDocument(docName, { index }, id)
            const documents = await getDocuments(docName);
            setData(documents)
        } catch (error) {
            setAlert({
                isShow: true,
                duration: 3000,
                message: error.message,
                type: "error",
            });
        }
        setLoading(false);
    }
    const changeIndex = (data, redefine) => {

        redefine.map((item => {
            const post = data.filter((post => post.id == item.id))[0]
            if (post.index !== item.index) {
                update(item.index, item.id)
            }
        }))
    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const itemsCopy = [...items];
        const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
        itemsCopy.splice(result.destination.index, 0, reorderedItem);
        const redefine = itemsCopy.map((item, i) => {
            return { ...item, index: i + 1 }
        })
        setItems(redefine);
        changeIndex(data, redefine)
    }
    const classesName = divClasses || "flex gap-4 flex-wrap pr-10 pt-4"
    return (
        <>
            {items && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={classesName}
                            >
                                {children}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </>
    )
}

export default DragAndDropParent