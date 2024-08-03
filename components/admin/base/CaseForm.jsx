import { useStateContext } from '@/context/Statecontext'
import getDocuments from '@/firebase/getDocuments'
import React, { useEffect, useState } from 'react'
import InputSection from './InputSection'
import ListedImageInput from './ListedImageInput'
import ListedInput from './ListedInput'
import PrimaryButton from './PrimaryButton'
import PrimaryInput from './PrimaryInput'
import SelectInput from './SelectInput'
import Textarea from './Textarea'
import TextEditor from './TextEditor'

function CaseForm({ handleOnSubmit, isLoading, isSuccess, setIsSuccess, values, setValues, text, caseTypeList, lawyer, setLawyer }) {
    const { setLoading, currentUser } = useStateContext()
    const [clients, setClients] = useState([])

    useEffect(() => {
        async function fetchLawyerData() {
            setLoading(true)
            const documents = await getDocuments("team", currentUser?.uid);
            setLawyer([])
            documents.length !== 0 && generateLawyerList(documents)
            setLoading(false)
        }
        async function fetchClientData() {
            setLoading(true)
            const documents = await getDocuments("client", currentUser?.uid);
            setClients([])
            documents.length !== 0 && generateClientList(documents)
            setLoading(false)
        }
        fetchClientData()
        fetchLawyerData();
    }, [currentUser])
    const generateLawyerList = (lawyer) => {
        console.log(lawyer, "fr")
        lawyer.map(lawyer => {
            setLawyer(perv => [
                ...perv,
                { value: lawyer.name, name: lawyer.name, perHeiringCost: parseInt(lawyer.perHeiringCost) }
            ])
        })
    }
    const generateClientList = (client) => {
        client.map(client => {
            setClients(perv => [
                ...perv,
                { value: client.name, name: client.name }
            ])
        })
    }
    const subCaseType = {
        "criminalCase": [
            {
                "name": "Murder",
                "type": "Murder"
            },
            {
                "name": "Robbery",
                "type": "Robbery"
            },
            {
                "name": "Theft",
                "type": "Theft"
            },
            {
                "name": "Kidnapping",
                "type": "Kidnapping"
            },
            {
                "name": "Rape",
                "type": "Rape"
            },
            {
                "name": "Assault",
                "type": "Assault"
            },
            {
                "name": "Forgery",
                "type": "Forgery"
            },
            {
                "name": "Fraud",
                "type": "Fraud"
            }
        ],
        "civilCase": [
            {
                "name": "Property Dispute",
                "type": "Property Dispute"
            },
            {
                "name": "Breach of Contract",
                "type": "Breach of Contract"
            },
            {
                "name": "Recovery of Money",
                "type": "Recovery of Money"
            },
            {
                "name": "Specific Performance",
                "type": "Specific Performance"
            },
            {
                "name": "Breach of Trust",
                "type": "Breach of Trust"
            },
            {
                "name": "Partition Suits",
                "type": "Partition Suits"
            }
        ],
        "corporateCase": [
            {
                "name": "Fundamental Rights",
                "type": "Fundamental Rights"
            },
            {
                "name": "Interpretation of Constitution",
                "type": "Interpretation of Constitution"
            },
            {
                "name": "Appointment & Removal of Public Officials",
                "type": "Appointment & Removal of Public Officials"
            },
            {
                "name": "Validity of Laws",
                "type": "Validity of Laws"
            }
        ],
        "labourCase": [
            {
                "name": "Wages, Salaries & Benefits",
                "type": "Wages, Salaries & Benefits"
            },
            {
                "name": "Termination of employment",
                "type": "Termination of employment"
            },
            {
                "name": "Industrial Disputes",
                "type": "Industrial Disputes"
            },
            {
                "name": "Trade Union Disputes",
                "type": "Trade Union Disputes"
            },
            {
                "name": "Harrassment",
                "type": "Harrassment"
            }
        ],
        "taxCase": [
            {
                "name": "Income Tax",
                "type": "Income Tax"
            },
            {
                "name": "GST Disputes",
                "type": "GST Disputes"
            },
            {
                "name": "Custom Duty",
                "type": "Custom Duty"
            },
            {
                "name": "Excise Duty",
                "type": "Excise Duty"
            }
        ],
        "ipCase": [
            {
                "name": "Patent",
                "type": "Patent"
            },
            {
                "name": "Trademark",
                "type": "Trademark"
            },
            {
                "name": "Copyright",
                "type": "Copyright"
            },
            {
                "name": "Design Disputes",
                "type": "Design Disputes"
            },
            {
                "name": "Geographical Indication",
                "type": "Geographical Indication"
            }
        ],
        "familyCase": [
            {
                "name": "Harrassment",
                "type": "Harrassment"
            },
            {
                "name": "Domestic Voilence",
                "type": "Domestic Voilence"
            },
            {
                "name": "Divorce",
                "type": "Divorce"
            },
            {
                "name": "Child Custody",
                "type": "Child Custody"
            },
            {
                "name": "Property Disputes",
                "type": "Property Disputes"
            }
        ],
        "cyberCase": [
            {
                "name": "Cyber crime",
                "type": "Cyber crime"
            },
            {
                "name": "Cyber Bullying",
                "type": "Cyber Bullying"
            },
            {
                "name": "Data Protection",
                "type": "Data Protection"
            },
            {
                "name": "Cyber Security",
                "type": "Cyber Security"
            },
            {
                "name": "Domain Name Disputes",
                "type": "Domain Name Disputes"
            },
            {
                "name": "Cyber Stalking",
                "type": "Cyber Stalking"
            }
        ],
        "medicalCase": [
            {
                "name": "Malpractice",
                "type": "Malpractice"
            },
            {
                "name": "Wrongful Death",
                "type": "Wrongful Death"
            },
            {
                "name": "Health Insurance",
                "type": "Health Insurance"
            },
            {
                "name": "Healthcare Regulation",
                "type": "Healthcare Regulation"
            },
            {
                "name": "Hospital Disputes",
                "type": "Hospital Disputes"
            },
            {
                "name": "Mental Health",
                "type": "Mental Health"
            },
            {
                "name": "End-of-life Issues",
                "type": "End-of-life Issues"
            },
            {
                "name": "Medical Product",
                "type": "Medical Product"
            }
        ],
        "governmentCase": [
            {
                "name": "Constitutional Laws",
                "type": "Constitutional Laws"
            },
            {
                "name": "Election Laws",
                "type": "Election Laws"
            },
            {
                "name": "Government Contract",
                "type": "Government Contract"
            },
            {
                "name": "Civil Rights",
                "type": "Civil Rights"
            },
            {
                "name": "National Security",
                "type": "National Security"
            },
            {
                "name": "Municipal Laws",
                "type": "Municipal Laws"
            }
        ],
        "publicCase": [
            {
                "name": "Constitutional Laws",
                "type": "Constitutional Laws"
            },
            {
                "name": "Civil Rights",
                "type": "Civil Rights"
            },
            {
                "name": "Consumer Protection",
                "type": "Consumer Protection"
            },
            {
                "name": "Environmental Law:",
                "type": "Environmental Law:"
            },
            {
                "name": "Media Law",
                "type": "Media Law"
            },
            {
                "name": "Public Contracts",
                "type": "Public Contracts"
            }
        ]
    }
    const stageOfCases = [
        {
            value: "pending",
            name: "Pending"
        },
        {
            value: "archived",
            name: "Archived"
        },
        {
            value: "running",
            name: "Running"
        },
    ]
    return (
        <form onSubmit={handleOnSubmit}>
            <InputSection id="clientName" title="Client Name">
                <SelectInput {...{ setValues, values, name: "name", placeholder: "---Select Client---", list: clients }} />
            </InputSection>
            <InputSection id="responded" title="Responded Details">
                <PrimaryInput {...{ name: "respondedName", placeholder: "Responded Name", setValues, values, maxLen: 50 }} />
                <PrimaryInput {...{ name: "respondedLawyer", placeholder: "Responded Lawyer", setValues, values, maxLen: 50 }} />
            </InputSection>
            <InputSection id="caseLawyer" title="Client Lawyer">
                <SelectInput {...{ setValues, values, name: "lawyer", placeholder: "---Select Lawyer---", list: lawyer }} />
                {values.lawyer && <span>Heiring Cost of lawyer: 
                    {values.lawyer && lawyer ? lawyer.filter(item => item.value === values.lawyer)[0]?.perHeiringCost : 0}
                </span>}
            </InputSection>
            <InputSection id="caseDetails" title="Case Details">
                <PrimaryInput {...{ setValues, values, name: "caseNo", placeholder: "Case Number", type: "tel", maxLen: 50 }} />
                <SelectInput {...{ setValues, values, name: "caseType", placeholder: "---Select Case Type---", list: caseTypeList }} />
                <SelectInput {...{ setValues, values, name: "caseSubType", placeholder: "---Select Case Sub Type---", list: subCaseType[values.caseType] || [], isRequired: true }} />
                <SelectInput {...{ setValues, values, name: "stageOfCase", placeholder: "---Select Stage of Case---", list: stageOfCases || [], isRequired: true }} />
                <Textarea {...{ name: "description", placeholder: "Case Description", setValues, values, isRequired: true }} />
            </InputSection>
            <InputSection id="registration" title="Registration Details">
                <PrimaryInput {...{ name: "registrationNumber", placeholder: "Registration Number", setValues, values, maxLen: 50, type: "tel" }} />
                <PrimaryInput {...{ name: "registrationDate", placeholder: "Registration Date", setValues, values, maxLen: 50, type: "date" }} />
                <PrimaryInput {...{ name: "firstHeartingDate", placeholder: "First Hearing Date", setValues, values, maxLen: 50, type: "date" }} />
            </InputSection>

            <InputSection id="filling" title="Filling Details">
                <PrimaryInput {...{ name: "fillingNumber", placeholder: "Filling Number", setValues, values, maxLen: 50, type: "tel" }} />
                <PrimaryInput {...{ name: "fillingDate", placeholder: "Filling Date", setValues, values, maxLen: 50, type: "date" }} />
            </InputSection>

            <InputSection id="remarks" title="Remarks">
                <Textarea {...{ name: "remarks", placeholder: "Remarks", setValues, values, isRequired: false }} />
            </InputSection>

            <section className='pt-5 pb-8 w-full flex justify-between'>
                <span>Total Cost: {values.caseType ? caseTypeList.filter(item => item.value === values.caseType)[0].cost : 0 + values.lawyer ? lawyer.filter(item => item.value === values.lawyer)[0]?.perHeiringCost : 0}</span>
                <PrimaryButton {...{ text: text || "Create Case", isLoading, isSuccess, setIsSuccess }} 
                />
                
            </section>
        </form>
    )
}

export default CaseForm