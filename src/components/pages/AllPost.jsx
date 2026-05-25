import React , { useState , useEffect } from 'react'
import Container from '../container/Container'
import { PostCard } from '../index'
import databaseService from '../../appwrite_services/database'

const AllPost = () => {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    // fetches all post regardless its query in appwrite
    databaseService.getPosts([]).then( (Allpost) => {
      if (Allpost) {
        setPosts(Allpost.documents)
      }
    })
  }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map( (post) => (
            <div key={post.$id} className='p-2 w-1/4'> <PostCard {...post} /> </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPost