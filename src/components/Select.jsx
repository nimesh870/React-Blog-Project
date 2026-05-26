import React , { useId } from 'react'

const Select = ({
    options,
    label,
    className = '',
    ref,
    ...props
}) => {

    const id = useId()
  return (
    <div className='w-full'>
      
        {label && <label htmlFor = {id} className='inline-block mb-1.5 pl-1 font-medium text-slate-500'></label>}

        <select id = {id} {...props} ref={ref}
        className= {`px-4 py-2.5 rounded-xl bg-slate-50
             text-slate-900 outline-none focus:bg-white
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50
             duration-200 border border-slate-200 w-full ${className}`}
        >
            {
                options?.map( (option) => (
                    <option key={option} value={option}>{option}</option>
                ) )
            }
        </select>
    </div>
  )
}

export default Select
