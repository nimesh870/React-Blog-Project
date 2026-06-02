import React , { useEffect } from 'react'
import Container from '../container/Container'
import PostCard from '../PostCard'
import databaseService from '../../appwrite_services/database'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../features/postSlice'

const AllPost = () => {

  const authStatus = useSelector(state => state.auth.status)
  const posts = useSelector(state => state.post?.posts) || []
  const dispatch = useDispatch();

  useEffect(() => {
    // fetches all post regardless its query in appwrite
    databaseService.getPosts([]).then( (AllPosts) => {
      if (AllPosts) {
        dispatch(setPosts(AllPosts.documents))
      }
    })
  }, [authStatus])

  if (posts.length === 0) {
        return (
            <div className='w-full min-h-screen bg-slate-50 flex items-center justify-center'>
              <Container>
                <div className='flex flex-col items-center gap-3'>
                  <h1 className='text-3xl font-extrabold text-slate-900'>No posts available</h1>
                  <p className='text-slate-500 text-sm'>Check back later for new content.</p>
                </div>
              </Container>
            </div>
        )
  }

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