import React , { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { Logo , Input , Button} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite_services/authentication'
import { login as authLogin } from '../features/authSlice'
import { useForm } from 'react-hook-form'

const Login = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , handleSubmit } = useForm()
    const [error, setError] = useState('')

    const login = async ({email , password}) => {
        setError('')
        try {
            // returns session if credentials are matched
            const session = await authService.login({email , password})
            if (session) {
                // fetches data of logged user
                const userData = await authService.getUser()
                if (userData) dispatch(authLogin({
                    $id : userData.$id,
                    email : userData.email,
                    name : userData.name
                })) // updates status and userData
                navigate('/')
            }
        } 
        catch (error) {
            setError(error.message)
        }
    }
    
  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-slate-50'>
      <div className={`mx-auto w-full max-w-lg bg-white rounded-2xl p-10
         border border-slate-200 shadow-xl shadow-slate-200/50`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-25'>
                <Logo width='100%' />
            </span>
        </div>
            <h2 className='text-center text-3xl font-extrabold
             text-slate-900 leading-tight mt-4'>Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-slate-500">
                Don't have any account?&nbsp;
                <Link
                        to="/signup"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                    >
                        Sign Up
                </Link>
        </p>

        {error && (
                    <p className='text-red-500 text-sm text-center mt-4 
                    bg-red-50 border border-red-200 
                    rounded-xl py-2 px-4'>
                        {error}
                 </p>
        )}


        <form onSubmit={handleSubmit(login)} className='mt-6 space-y-1'>
            <div className='space-y-1'>
                {/* Email input */}
                <Input
                    label = "Email: "
                    placeholder = "example@example.com"
                    type ='email'
                    // register → lets React Hook Form track input values without needing useState
                    {...register('email' , {
                        required : true,
                        validate : {
                            matchPattern : (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/. 
                            test(value) || "Enter a valid email address."
                        }
                    })}
                 />

                 {/* Password input */}
                 <Input
                    label = 'Password: '
                    type ='password'
                    placeholder = "Enter your password"
                    {...register('password' , {
                        required : true,
                        minLength : 8
                    })}
                  />

                  <Button type='submit' className='w-full cursor-pointer'>Sign In</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login