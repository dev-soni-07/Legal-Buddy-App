import React from 'react'
import InputSection from './InputSection'
import ListedImageInput from './ListedImageInput'
import ListedInput from './ListedInput'
import PrimaryButton from './PrimaryButton'
import PrimaryInput from './PrimaryInput'
import SelectInput from './SelectInput'
import Textarea from './Textarea'
import TextEditor from './TextEditor'

function ProjectForm({handleOnSubmit, isLoading, isSuccess, setIsSuccess, values, setValues, setDescription, description, text}) {
    const categoryList = [
        { value: "nextjs", name: "Next Js" },
        { value: "reactjs", name: "React Js" },
        { value: "javascript", name: "Javascript" },
        {value: "c++", name: "C++"}
    ]
  return (
    <form onSubmit={handleOnSubmit}>
                    <InputSection id="projectName" title="Name">
                        <PrimaryInput {...{ name: "name", placeholder: "Project Name", setValues, values, isUnique: true, maxLen: 50 }} />
                    </InputSection>
                    <InputSection id="tags" title="Tags" desc="List the tech used in the project">
                        <ListedInput {...{ desc: "At least add three tags.", setValues, values, name: "tags", placeholder: "Tech used in project", maxLen: 20, minLen: 3 }} />
                    </InputSection>
                    <InputSection id="category" title="Category" desc="Choose the category you want to put your project in.">
                        <SelectInput {...{ setValues, values, list: categoryList, name: "category", placeholder: "Select Category" }} />
                    </InputSection>
                    <InputSection id="images" title="Images" desc="Added screenshots of your project" >
                        <ListedImageInput {...{ desc: "At least add three images.", setValues, values, name: "images", placeholder: "Project screenshot" }} />
                    </InputSection>
                    <InputSection id="descriptions" title="Descriptions" desc="Short description appear on home and projects page and description appear on main project page">
                        <Textarea {...{ name: "shortDescription", setValues, values, isUnique: true, placeholder: "Short Description", maxLen: 200, minLen: 150 }} />
                        <TextEditor {...{ setDescription, description }} />
                    </InputSection>
                    <InputSection id="languageUsed" title="Language Used" desc="Add frontend and backend language and database used in the project">
                        <PrimaryInput {...{ name: "frontendLanguage", setValues, values, placeholder: "Frontend Language", maxLen: 25, minLen: 3 }} />
                        <PrimaryInput {...{ name: "backendLanguage", setValues, values, placeholder: "Backend Language", maxLen: 25, minLen: 3, isRequired: false }} />
                        <PrimaryInput {...{ name: "database", setValues, values, placeholder: "Database or API used", maxLen: 50, minLen: 3, isRequired: false }} />
                    </InputSection>
                    <InputSection id="sourceAndUrl" title="Source Code and Project Link" desc="Provide Project Source Code / Github Link and Project Url if Deployed on server">
                        <PrimaryInput {...{ name: "sourceCode", setValues, values, placeholder: "Source Code", isUnique: true, maxLen: 60 }} />
                        <PrimaryInput {...{ name: "deployUrl", setValues, values, placeholder: "Project URL", isRequired: false, maxLen: 60 }} />
                    </InputSection>
                    <InputSection id="projectDates" title="Project Dates" desc="Add date project started at and if deployed than deployed at">
                        <PrimaryInput {...{ type: "date", setValues, values, name: "createdAt", placeholder: "Created At" }} />
                        <PrimaryInput {...{ type: "date", setValues, values, name: "deployedAt", placeholder: "Deployed At", isRequired: false }} />
                    </InputSection>
                    <InputSection id="teamUpWith" title="People You team Up" desc="Name of people who contribute in this project.">
                        <ListedInput {...{ setValues, values, name: "teamUpWith", placeholder: "Team Up With", maxLen: 25, isRequired: false }} />
                    </InputSection>
                    <section className='pt-5 pb-8 w-full flex justify-end'>
                        <PrimaryButton {...{ text: text || "Add Project", isLoading, isSuccess, setIsSuccess }} />
                    </section>
                </form>
  )
}

export default ProjectForm