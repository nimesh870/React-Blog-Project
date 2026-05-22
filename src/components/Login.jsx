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
    const {register , handleSubmit , formState : {error}} = useForm()
    const [error, setError] = useState('')

    const login = async ({email , password}) => {
        setError('')
        try {
            // returns session if credentials are matched
            const session = await authService.login(email , password)
            if (session) {
                // fetches data of logged user
                const userData = await authService.getUser()
                if (userData) dispatch(authLogin(userData)) // updates status and userData
                navigate('/')
            }
        } 
        catch (error) {
            setError(error.message)
        }
    }
    
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-25'>
                <Logo width='100%' />
            </span>
        </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don't have any account?&nbsp;
                <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                </Link>
        </p>
        {error.email && <p className='text-red-600 mt-8 text-center'>{error.email.message}</p>}
        {error.password && <p className='text-red-600 mt-8 text-center'>{error.password.message}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
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

                  <Button type='submit' className='w-full'>Sign In</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login