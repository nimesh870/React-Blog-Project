import React , {useEffect , useState} from 'react'
import Container from '../container/Container'
import { PostForm } from '../index'
import databaseService from '../../appwrite_services/database'
import { useParams, useNavigate } from 'react-router-dom'

const EditPost = () => {

    const {slug} = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    // fetches the post from appwrite using slug from the URL
    useEffect( () => {
        if (slug) {
            databaseService.getPost(slug).then( (post) => setPost(post) )
        }
        else {
            navigate('/')
        }
    }, [slug , navigate])

  return post ? (
    <div className='py-12 min-h-screen bg-slate-50'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : (
        <div className='min-h-screen bg-slate-50 flex justify-center items-center'>
            <div className='flex flex-col items-center gap-3'>
                <h1 className='text-2xl font-extrabold text-slate-900'>No post Found!</h1>
                <p className='text-slate-500 text-sm'>The post you are looking for doesnot exist</p>
            </div>
        </div>
  )
}

export default EditPost
