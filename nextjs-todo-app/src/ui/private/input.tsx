import { HTMLInputTypeAttribute } from "react"

interface IProps {
    label?: string 
    name: string
    parentClass?: string
    placeholder?: string
    isRequired?: boolean
    type?: HTMLInputTypeAttribute | undefined
}


export default function Input({ label = '', type = 'text', isRequired = true, placeholder = '', name, parentClass }: IProps) {
    return (
        <div className={parentClass}>
            {label && <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
            <input type={type} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required={isRequired} />
        </div>
    )
}