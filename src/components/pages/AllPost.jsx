import React , { useState , useEffect } from 'react'
import Container from '../container/Container'
import { PostCard } from '../index'
import databaseService from '../../appwrite_services/database'
import { useSelector } from 'react-redux'

const AllPost = () => {

  const [posts, setPosts] = useState([])
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    // fetches all post regardless its query in appwrite
    databaseService.getPosts([]).then( (Allpost) => {
      if (Allpost) {
        setPosts(Allpost.documents)
      }
    })
  }, [authStatus])

  return (
    <div className='w-full py-12 min-h-screen bg-slate-50'>
      <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {posts.map( (post) => (
            <div key={post.$id}> <PostCard {...post} name = {post.authorName} /> </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPost