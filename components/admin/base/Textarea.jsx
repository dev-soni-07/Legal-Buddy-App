import React from 'react'

function Textarea({ isRequired = true, maxLen = 100, minLen = 0, isUnique = false, placeholder, values, setValues, name }) {
    const onChangeHandler = e => {
        const {name, value} = e.target
        setValues(prevState => ({
          ...prevState,
          [name]: value
        }))
      }
    return (
        <div className='w-full'>
            <textarea name={name} minLength={minLen} maxLength={maxLen} placeholder={placeholder} value={values[name]} onChange={onChangeHandler} required={isRequired} className="px-4 sm:py-3 py-2.5 bg-gray-200 text-gray-800 placeholder:text-gray-500 border border-gray-500 outline-none hover:bg-gray-100 hover:placeholder:text-gray-400 focus:placeholder:text-gray-400 focus:bg-gray-50 focus:border-gray-400 shadow-lg shadow-slate-900/50 rounded w-full text-sm h-24" />
            <div className='flex justify-end gap-4 py-1 text-xs'>
                {isUnique && <span className='bg-blue-500 text-white px-2 py-1 rounded-sm block shadow-lg shadow-slate-900/50'>Unique</span>}
                {isRequired && <span className='bg-red-500 text-white px-2 py-1 rounded-sm block shadow-lg shadow-slate-900/50'>Required</span>}
            </div>
        </div>
    )
}

export default Textarea