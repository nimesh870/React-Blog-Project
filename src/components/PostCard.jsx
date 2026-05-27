import React from 'react'
import databaseService from '../appwrite_services/database'
import { Link } from 'react-router-dom'

const PostCard = ({ $id , title , featuredImage , name }) => {

  return (
    <Link to={`/post/${$id}`} className='group'>
        <div className='w-full bg-white rounded-2xl p-4
         shadow-md hover:shadow-xl hover:-translate-y-1
          transition-all duration-300 border border-slate-100'>
            <div className='w-full mb-4 overflow-hidden rounded-xl'>
                <img src={databaseService.getFileView(featuredImage)} alt={title} 
                className='w-full h-48 object-cover rounded-xl
                hover:scale-105 transition-transform duration-300'
                />
            </div>
            <h2 className='text-lg font-bold text-slate-800
            group-hover:text-indigo-600 transition-colors duration-200 mt-1'>{title}</h2>
            <p className='text-sm text-slate-500 mt-2'>By {name}</p>
        </div>
    </Link>
  )
}

export default PostCard