import React from 'react'
import { useId } from 'react'

const Input = ({
    label,
    type = 'text',
    className = '',
    ref,
    ...props
}) => {
    const id = useId()
    return (
        <div className='w-full'>
            { label && <label className='inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700' htmlFor={id}>{label}</label>}
            <input 
            type = {type}
            className={`px-4 py-2.5 rounded-lg bg-slate-50
                 text-slate-900 outline-none focus:bg-white border focus:border-indigo-500
                  duration-200 focus:ring-2 focus:ring-indigo-500/20
                   placeholder:text-slate-400 transition-all w-full ${className}`}
            ref={ref}
            {...props}
            id = {id}
            />
        </div>
    )
}

export default Input