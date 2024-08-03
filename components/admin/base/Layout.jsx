import React from 'react'
import SideMenu from './SideMenu'
import { Work_Sans } from 'next/font/google';
import { useStateContext } from '@/context/Statecontext';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import DeleteDocumentModal from './DeleteDocumentModal';
import HamburgerMenuIcon from '@/components/HamburgerMenuIcon';
import Image from 'next/image';
import Link from 'next/link';

const workSans = Work_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "600", "700", "800", "900"], variable: "--font-workSans", style: ['normal'] });

function Layout({ children }) {
  const { userLoading, userProfileData, currentUser, loading } = useStateContext()
  const { push } = useRouter()
  if (userLoading && currentUser === null) {
    return <Loader bgFull={true} />
  }
  if (!userLoading && currentUser === undefined) {
    push('/admin/login')
    return (
      <div className="bg-blue-200 h-screen w-full fixed top-0 flex justify-center items-center z-50">
        <h1 className="font-cutiveMono text-3xl">
          Sorry You Are Not Logged In
        </h1>
      </div>
    )
  }
  return (
    <div className={`${workSans.variable} font-workSans bg-slate-300 min-h-screen text-slate-800 flex flex-col`}>
      {loading && <Loader />}
      <nav className="flex items-center justify-between flex-wrap bg-slate-900 px-8 pt-4 pb-2 border-b ">
        <div className="text-white mr-6 flex items-center gap-4">
          <Link href='/admin' passHref>
            <Image src={'/LOGO.png'} alt="website Logo" height={90} width={80} />
          </Link>

          <div>
            <span className="font-semibold text-xl tracking-tight block">LEGAL BUDDY</span>
            <span className='text-white-400 text-xs'>MAXIMISE YOUR LAW FIRM&apos;S POTENTIAL</span>
            <br />
            {/* <span className='text-gray-400 text-xs'> ~ developed by: DEV SONI</span> */}
          </div>
        </div>
        <div id="hamburger" className="absolute top-2 right-2 w-20 h-16 overflow-x-hidden scrollbar-hide">
          <HamburgerMenuIcon />
        </div>
      </nav>
      <SideMenu />
      <DeleteDocumentModal />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white mt-auto">
        <p className="text-sm md:text-base lg:text-lg">
          Legal Buddy &copy; 2024. All rights reserved.
        </p>
        <p className="text-sm md:text-base lg:text-lg">
          Made with ❤️ by{' '}
          <a
            href="https://linkedin.com/in/dev-soni-sde/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Dev Soni
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Layout