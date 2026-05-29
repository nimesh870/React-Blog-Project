import React , { useState , useEffect } from 'react'
import { Logo , Button , Input } from './index'
import authService from '../appwrite_services/authentication'
import { Link , useNavigate } from 'react-router-dom'
import { login } from '../features/authSlice'
import { useDispatch , useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { showToast } from '../features/toastSlice'

const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authStatus = useSelector(state => state.auth.status)
    const {register , handleSubmit} = useForm()
    const [error, setError] = useState('')

    const signUp = async ({email , password , name}) => {
        setError('')
        try {
            const userAccount = await authService.createUserAccount({email , password , name})
            if (userAccount) {
                const currentUserData = await authService.getUser()
                if (currentUserData) 
                {
                    dispatch(login({
                        $id : currentUserData.$id,
                        name : currentUserData.name,
                        email : currentUserData.email,
                    }))

                    dispatch(showToast({
                        message : "Account Created Successfully!",
                        type : 'success'
                    }))

                }
                navigate('/')
            }
            else{
                dispatch(showToast({
                    message : "User already exist.",
                    type : 'error'
                }))
            }
        } catch (error) {
            dispatch(showToast({
                message : "User already exist!",
                type : 'error'
            }))
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-50'>
        <div className={`mx-auto w-full max-w-lg bg-white rounded-2xl
             p-10 border border-slate-200 shadow-xl shadow-slate-200/50`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-25'>
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className="text-center text-3xl font-extrabold text-slate-900 leading-tight mt-4">Sign up to create account</h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-500
                         transition-colors duration-200"
                    >
                        Sign In
                    </Link>
                </p>

                <form onSubmit={handleSubmit(signUp)} className='mt-6'>
                    <div className='space-y-5'>
                        {/* Name input */}
                        <Input
                            label = "Full-Name: "
                            placeholder = "Your name"
                            type ='text'
                            {...register('name' , {
                                required : true
                            })}
                        />

                        {/* Email Input */}
                        <Input 
                            label = "Email: "
                            type='email'
                            placeholder = "example@example.com"
                            {...register('email' , {
                                required : true,
                                validate : {
                                    matchPattern : (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/. 
                            test(value) || "Enter a valid email address."
                                }
                            })}
                        />

                        {/* Password Input */}
                        <Input 
                            label = 'Password: '
                            type='password'
                            placeholder = "Enter your password"
                            {...register('password' , {
                                required : true,
                                minLength : 8,
                            })}
                        />

                        <Button type='submit' className='w-full cursor-pointer'>Create Account</Button>
                    </div>
                </form>
        </div>
    </div>
  )
}

export default SignUp
