import React , { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({children , authentication = true}) => {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector( state => state.auth.status )

    useEffect(() => {
            
        if ( authentication && authStatus !== authentication ) {
            navigate('/login')
        }
        else if( !authentication && authStatus !== authentication ) {
            navigate('/')
        }
        setLoader(false)
    }, [authStatus , navigate , authentication])

    return loader ? (
    <div className='min-h-screen bg-slate-50 p-8'>
        <div className='max-w-7xl mx-auto'>

            {/* Navbar skeleton */}
            <div className='flex items-center justify-between mb-8'>
                <div className='w-24 h-8 bg-slate-200 rounded-xl animate-pulse'></div>
                <div className='flex gap-4'>
                    <div className='w-16 h-8 bg-slate-200 rounded-xl animate-pulse'></div>
                    <div className='w-16 h-8 bg-slate-200 rounded-xl animate-pulse'></div>
                    <div className='w-16 h-8 bg-slate-200 rounded-xl animate-pulse'></div>
                </div>
            </div>

            {/* Cards skeleton */}
            <div className='grid grid-cols-4 gap-4'>
                {[1,2,3,4].map((item) => (
                    <div key={item} className='bg-white rounded-2xl p-4 border border-slate-100 shadow-sm'>
                        {/* Image skeleton */}
                        <div className='w-full h-48 bg-slate-200 rounded-xl animate-pulse mb-4'></div>
                        {/* Title skeleton */}
                        <div className='w-3/4 h-4 bg-slate-200 rounded-full animate-pulse mb-2'></div>
                        {/* Subtitle skeleton */}
                        <div className='w-1/2 h-4 bg-slate-200 rounded-full animate-pulse'></div>
                    </div>
                ))}
            </div>

        </div>
    </div>
) : <>{children}</>
}

export default AuthLayout
