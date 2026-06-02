import React, {useEffect} from 'react'
import databaseService from '../../appwrite_services/database'
import Container from '../container/Container'
import PostCard from '../PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../features/postSlice'

const Home = () => {

    const authStatus = useSelector(state => state.auth.status)
    const posts = useSelector(state => state.post?.posts) || []
    const dispatch = useDispatch();

    // fetches all active post from appwrite and display them as cards
    useEffect( () => {
        if (!authStatus) {
            return
        }

        databaseService.getPosts().then( (posts) => {
            if (posts) {
                dispatch(setPosts(posts.documents))
            }
        } )
    }, [authStatus])

    if (posts.length === 0) {
        return (
            <div className='w-full min-h-screen bg-slate-50 flex justify-center text-center'>
                <Container>
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <h1 className='text-3xl font-extrabold text-slate-900'>Login to read posts.</h1>
                        <p className='text-slate-500 text-sm'>
                            Join us today and start reading amazing posts.
                        </p>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-12 min-h-screen bg-slate-50'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {posts.map( (post) => (
                        <div key={post.$id}>
                            <PostCard {...post} name = {post.authorName} />
                        </div>
                    ) )}
                </div>
            </Container>
        </div>
    )
}

export default Home
