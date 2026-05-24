import React from 'react'
import { PostForm } from '../index'
import Container from '../container/Container'

const AddPost = () => {
  return (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost
