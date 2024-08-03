import React from 'react'

function SelectInput({ isRequired = true, placeholder, values, setValues, name, list }) {
    const onChangeHandler = e => {
        const { name, value } = e.target
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    return (
        <div className='w-full'>
            <select name={name} onChange={onChangeHandler} required={isRequired} value={values[name]} className="px-4 sm:py-3 py-2.5 bg-gray-200 text-gray-800 placeholder:text-gray-500 border border-gray-500 outline-none hover:bg-gray-100 hover:placeholder:text-gray-400 focus:placeholder:text-gray-400 focus:bg-gray-50 focus:border-gray-400 shadow-lg shadow-slate-900/50 rounded w-full text-sm">
                <option className='py-4'>{placeholder}</option>
                {list.map((item, i) => (
                    <option value={item.value} key={i}>{item.name}</option>
                ))}
            </select>
            <div className='flex gap-4 py-1 text-xs justify-end'>
                {isRequired && <span className='bg-red-500 text-white px-2 py-1 rounded-sm block shadow-lg shadow-slate-900/50'>Required</span>}
            </div>
        </div>
    )
}

export default SelectInput