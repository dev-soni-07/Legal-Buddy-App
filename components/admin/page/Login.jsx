import { useStateContext } from '@/context/Statecontext'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import PrimaryButton from '../base/PrimaryButton'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setAlert } = useStateContext()
  const {push} = useRouter()
  
  async function handleOnClick(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setAlert({ isShow: true, duration: 3000, message: "Login successfully", type: "success" })
      setIsSuccess(true)
      push("/admin")
    } catch (error) {
      console.log(error)
      setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
    }
    setIsLoading(false)
  }
  return (
    <main className='h-screen flex justify-center items-start flex-col max-w-sm w-full mx-auto font-workSans'>
      <h1 className='text-3xl md:text-5xl font-semibold pb-6 md:pb-8 text-center w-full text-gray-200'>Login</h1>
      <form onSubmit={e => handleOnClick(e)} className='flex flex-col w-full px-4 gap-4'>
        <input type="email" autoComplete='true' placeholder='Email Address' value={email} onChange={e => setEmail(e.target.value)} required name='email' className='px-4 py-3 bg-gray-200 rounded placeholder:text-gray-500 border border-gray-200 outline-none hover:bg-gray-100 hover:border-gray-400 focus:bg-gray-100 focus:border-gray-400 shadow-lg shadow-slate-900/50' />
        <input type="password" name="password" placeholder='Password' required autoComplete='true' value={password} onChange={e => setPassword(e.target.value)} className='px-4 py-3 bg-gray-200 rounded placeholder:text-gray-500 border border-gray-200 outline-none hover:bg-gray-100 hover:border-gray-400 focus:bg-gray-100 focus:border-gray-400 shadow-lg shadow-slate-900/50' />
        <PrimaryButton {...{ text: "login", isLoading, isSuccess, setIsSuccess }} />
      </form>
      <Link href='/admin/signup' className='pt-3 text-blue-300 pl-4 cursor-pointer inline'>Do not have account?</Link>
      <span className='pt-3 text-gray-300 pl-4 cursor-pointer inline'>Forgot password?</span>
    </main>
  )
}
