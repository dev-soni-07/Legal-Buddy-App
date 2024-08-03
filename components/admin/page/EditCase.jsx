import { useStateContext } from '@/context/Statecontext'
import getDocument from '@/firebase/getDocument'
import updateDocument from '@/firebase/updateDocument'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CaseForm from '../base/CaseForm'
import Header from '../base/Header'
import SectionLink from '../base/SectionLink'

function EditCase() {
    const DOCNAME = "case"
    const { setLoading, setAlert, currentUser } = useStateContext()
    const initialProp = {
        name: "",
        lawyer: "",
        respondedName: "",
        respondedLawyer: "",
        caseNo: "",
        caseType: "",
        caseSubType: "",
        stageOfCase: "",
        fillingNumber: "",
        fillingDate: "",
        registrationNumber: "",
        registrationDate: "",
        firstHeartingDate: "",
        remarks: ""
    }
    const [values, setValues] = useState(initialProp)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [lawyer, setLawyer] = useState([])

    const { query, push } = useRouter()
    const { id } = query;
    const caseTypeList = [
        {
            value: "criminalCase",
            name: "Criminal Case",
            cost: 15000

        },
        {
            value: "familyCase",
            name: "Family Case",
            cost: 10000

        },
        {
            value: "corporateCase",
            name: "Corporate Case",
            cost: 20000
        },
        {
            value: "civilCase",
            name: "Civil Case",
            cost: 12000
        },
        {
            value: "ipCase",
            name: "IP Case",
            cost: 13000
        },
        {
            value: "taxCase",
            name: "Tax Case",
            cost: 14000
        },
        {
            value: "cyberCase",
            name: "Cyber Case",
            cost: 9000
        },
        {
            value: "publicCase",
            name: "Public Case",
            cost: 5000
        },
        {
            value: "medicalCase",
            name: "Medical Case",
            cost: 8000
        },
        {
            value: "labourCase",
            name: "Labour Case",
            cost: 4000
        },
        {
            value: "governmentCase",
            name: "Government Case",
            cost: 11000

        }
    ]
    const handleOnSubmit = async e => {
        e.preventDefault()
        if (!currentUser) {
            return
        }
        const baseCost = caseTypeList.filter(item => item.value === values.caseType)[0].cost
        const perHeiringCost = lawyer.filter(item => item.value === values.lawyer)[0].perHeiringCost
        setIsLoading(true)
        try {
            const data = { ...values, userId: currentUser?.uid, baseCost, perHeiringCost }
            await updateDocument(DOCNAME, data, id)
            setAlert({ isShow: true, duration: 3000, message: "Successfully Updated", type: "success" })
            setIsSuccess(true)
            push("/admin/cases")
        } catch (error) {
            setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
        }
        setIsLoading(false)
    }
    useEffect(() => {
        async function fetchDocuments() {
            setLoading(true)
            const document = await getDocument(DOCNAME, id);
            if (document === "no data") {
                setAlert({ isShow: true, duration: 3000, message: "No data found check url", type: "error" })
                replace("/admin/projects")
            } else {
                setLoading(false)
                const { id, ...data } = document
                setValues(data)
            }
        }
        fetchDocuments()
    }, [])
    return (
        <main className='px-4 pt-6 flex'>
            <ul className='hidden md:block w-48 pt-20 font-medium pr-8'>
                <SectionLink id="clientName" name="Client Name" />
                <SectionLink id="responded" name="Responded detail" />
                <SectionLink id="caseLawyer" name="Case Lawyer" />
                <SectionLink id="caseDetails" name="Case Details" />
                <SectionLink id="registration" name="Registration" />
                <SectionLink id="filling" name="Filling details" />
                <SectionLink id="remarks" name="Remarks" />
            </ul>
            <div className="w-full">
                <Header heading="Edit Case" detail="Edit case and detail about it." image="/editproject.jfif" />
                <CaseForm {...{ handleOnSubmit, isLoading, isSuccess, setIsSuccess, values, setValues, text: "Update Case", caseTypeList, lawyer, setLawyer }} />
            </div>
        </main>
    )
}

export default EditCase