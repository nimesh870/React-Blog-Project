import React , {useEffect , useState} from 'react'
import Container from '../container/Container'
import { PostForm } from '../index'
import databaseService from '../../appwrite_services/database'
import { useParams , Navigate, useNavigate } from 'react-router-dom'

const EditPost = () => {

    const {slug} = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState([])

    useEffect( () => {
        if (slug) {
            databaseService.getPost(slug).then( (post) => setPost(post) )
        }
        else {
            navigate('/')
        }
    }, [slug , navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
