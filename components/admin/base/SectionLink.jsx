import Link from 'next/link'
import React from 'react'

function SectionLink({id, name}) {
  return (
    <li className="w-full"><Link className='px-4 py-1.5 text-sm w-full block text-gray-800 hover:bg-gray-500 hover:text-gray-100 rounded transition-colors' href={`#${id}`}>{name}</Link></li>
  )
}

export default SectionLink