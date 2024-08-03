import { useStateContext } from '@/context/Statecontext'
import addDocument from '@/firebase/addDocument'
import deleteFile from '@/firebase/deleteFile'
import getDocuments from '@/firebase/getDocuments'
import updateDocument from '@/firebase/updateDocument'
import uploadFile from '@/firebase/uploadFile'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../base/Header'
import InputSection from '../base/InputSection'
import ListedInput from '../base/ListedInput'
import PrimaryButton from '../base/PrimaryButton'
import PrimaryInput from '../base/PrimaryInput'
import SectionLink from '../base/SectionLink'
import SelectInput from '../base/SelectInput'
import Textarea from '../base/Textarea'

function Lawyer() {
  const DOCNAME = "lawyer"
  const { setLoading, setAlert, currentUser } = useStateContext()
  const [dataFound, setDataFound] = useState(false)
  const [values, setValues] = useState({
    userId: currentUser.uid,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: currentUser.email,
    whatsappNumber: "",
    city: "",
    country: "",
    desc: "",
    image: "",
    registrationNo: "",
    associatedName: "",
    category: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileRef = useRef(null)
  const selectImage = () => {
    fileRef.current.click()
  }
  const imageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      return setAlert({ isShow: true, duration: 3000, message: "Select image file to upload.", type: "error" })
    }
    setLoading(true)
    const filePath = crypto.randomUUID() + "-" + file.name
    try {
      values.image && await deleteFile(values.image)
      const url = await uploadFile(file, filePath)
      setValues(prevState => ({
        ...prevState,
        image: url
      }))
      setAlert({ isShow: true, duration: 3000, message: "Image has been upload.", type: "success" })
    } catch (error) {
      setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
    }
    setLoading(false)
  }
  const deleteImage = async () => {
    if (!values.image) {
      setAlert({ isShow: true, duration: 3000, message: "No Image Found", type: "error" })
      return
    }
    setLoading(true)
    try {
      await deleteFile(values.image)
      setValues(prevState => ({
        ...prevState,
        image: ""
      }))
      setLoading(false)
      return setAlert({ isShow: true, duration: 3000, message: "Image Deleted successfully.", type: "success" })
    } catch (error) {
      setLoading(false)
      return setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
    }
  }
  const handleOnSubmit = async e => {
    e.preventDefault()
    if (!currentUser) {
      return
    }
    setIsLoading(true)
    try {
      const data = {...values}
      let res
      if (dataFound) {
        delete data.id
        res = await updateDocument(DOCNAME, data, values.id)
      } else {
        res = await addDocument(DOCNAME, data)
      }
      setAlert({ isShow: true, duration: 3000, message: res, type: "success" })
      setIsSuccess(true)
    } catch (error) {
      setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
    }
    setIsLoading(false)
  }
  useEffect(() => {
    setValues(
      {
        userId: currentUser.uid,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: currentUser.email,
        whatsappNumber: "",
        city: "",
        country: "",
        desc: "",
        image: "",
        registrationNo: "",
        associatedName: "",
        category: ""
      }
    )
    async function fetchDocuments() {
      setLoading(true)
      console.log(currentUser.uid)
      const documents = await getDocuments(DOCNAME, currentUser?.uid);
      
      console.log(documents)
      documents.length !== 0 && setDataFound(true)
      documents.length  !== 0 && setValues(documents[0])
      setLoading(false)
    }
    fetchDocuments()
  }, [currentUser])
  const lawyerCategory = [
    {
      value: "criminalLawyer",
      name: "Criminal Lawyer"

    },
    {
      value: "familyLawyer",
      name: "Family Lawyer"

    },
    {
      value: "corporateLawyer",
      name: "Corporate Lawyer"
    },
    {
      value: "civilLawyer",
      name: "Civil Lawyer"
    },
    {
      value: "ipLawyer",
      name: "IP Lawyer"
    },
    {
      value: "taxLawyer",
      name: "Tax Lawyer"
    },
    {
      value: "cyberLawyer",
      name: "Cyber Lawyer"
    },
    {
      value: "publicLawyer",
      name: "Public Lawyer"
    },
    {
      value: "medicalLawyer",
      name: "Medical Lawyer"
    },
    {
      value: "labourLawyer",
      name: "Labour Lawyer"
    },
    {
      value: "governmentLawyer",
      name: "Government Lawyer"
    }
  ]
  console.log(values)
  return (
    <main className='px-4 pt-6 flex'>
      <ul className='hidden md:block space-y-2 w-48 pt-20 font-medium pr-8'>
        <SectionLink id="username" name="Name" />
        <SectionLink id="image" name="Profile Photo" />
        <SectionLink id="contactDetail" name="Contact Detail" />
        <SectionLink id="address" name="Address" />
        <SectionLink id="bio" name="Your Category" />
      </ul>
      <div className='w-full'>
        <Header heading="Admin Profile" detail="Update your profile and personal details." image={values.image || "/boy-512.webp"} />
        <form onSubmit={handleOnSubmit}>
          <InputSection id="username" title="Name">
            <PrimaryInput {...{ values, setValues, placeholder: "First Name", name: "firstName" }} />
            <PrimaryInput {...{ values, setValues, placeholder: "Last Name", name: "lastName" }} />
          </InputSection>
          <InputSection id="image" title="Your Photo" desc="This will be displayed on your profile.">
            <div className='flex justify-between  py-4'>
              <span className='w-24 aspect-square relative rounded-full overflow-hidden bg-teal-100 shadow-lg shadow-slate-900/50'>
                {values.image ? (
                  <Image src={values.image} alt="user uimage" fill="object-fit" />
                ) : (
                  <span className='text-gray-500 flex justify-center items-center text-center font-image h-full w-full font-semibold'>No Image</span>
                )}
              </span>
              <div className='space-x-3'>
                <input type="file" name="image" onChange={imageChange} className="sr-only" ref={fileRef} />
                <button onClick={deleteImage} type="button" className='px-2 py-1 bg-red-500 disabled:bg-red-300 rounded text-gray-50 hover:bg-red-400 shadow-lg shadow-slate-900/50' disabled={!values.image}>
                  Delete
                </button>
                <button type='button' onClick={selectImage} className='px-2 py-1 bg-gray-100 rounded text-gray-800 hover:bg-gray-200 shadow-lg shadow-slate-900/50'>
                  {values.image ? "Update" : "Add Image"}
                </button>
              </div>
            </div>
          </InputSection>
          <InputSection id="contactDetail" title="Your Contact Detail" desc="this contact is use by Client">
            <PrimaryInput {...{ values, setValues, placeholder: "Phone Number", name: "phoneNumber", type: "tel", maxLen: 11 }} />
            <PrimaryInput {...{ values, setValues, placeholder: "Email Address", name: "email", type: "email", maxLen: 40, minLen: 8 }} />
            <PrimaryInput {...{ values, setValues, placeholder: "Whatsapp Number", name: "whatsappNumber", isRequired: false, type: "tel", maxLen: 11 }} />
          </InputSection>
          <InputSection id="address" title="Address" desc="current address">
            <PrimaryInput {...{ values, setValues, placeholder: "City", name: "city" }} />
            <PrimaryInput {...{ values, setValues, placeholder: "Country", name: "country" }} />
          </InputSection>
          <InputSection id="bio" title="Your Category" desc="Write your category.">
            <SelectInput {...{values, setValues, placeholder: "---Select Lawyer category---", list: lawyerCategory, name: "category"}} />
            <PrimaryInput {...{ values, setValues, placeholder: "Registration No.", name: "registrationNo", isRequired: true, maxLen: 120 }} />
            <PrimaryInput {...{ values, setValues, placeholder: "Associated Name", name: "associatedName", isRequired: true, maxLen: 120 }} />
            <Textarea {...{ values, setValues, placeholder: "Description...", name: "desc", maxLen: 300 }} />
            {/* <ListedInput {...{ values, setValues, placeholder: "Skill", name: "skills", desc: "At least add three skills" }} /> */}
          </InputSection>
          <section className='pt-5 pb-8 w-full flex justify-end'>
            <PrimaryButton {...{ text: "Save Changes", isLoading, isSuccess, setIsSuccess }} />
          </section>
        </form>
      </div>
    </main>
  )
}

export default Lawyer