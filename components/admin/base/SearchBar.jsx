import React from 'react'

function SearchBar() {
    return (
        <section id='searchBar' class="flex items-center justify-center pt-6">
            <div class="relative max-w-xl w-3/4 min-w-[18rem]">
                <div class="absolute flex items-center pointer-events-none justify-center h-full aspect-square
                        ">
                    <svg className='h-7 w-7 stroke-gray-700' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="6" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.5 14.5L19 19" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <input class="block w-full bg-gray-600 text-white rounded-md py-3 pl-[2.75rem] text-base pr-3 leading-tight focus:outline-none focus:bg-gray-300 focus:text-gray-900 transition-colors duration-500 focus:placeholder:text-gray-700" type="text" placeholder="Search something..." />
            </div>
        </section>
    )
}

export default SearchBar