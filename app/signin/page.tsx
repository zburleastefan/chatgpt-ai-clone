'use client'
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import signIn from '@/context/auth/signin';
import singInWithGoogle from '@/context/auth/singinwithgoogle';
import { toast } from 'react-hot-toast';
import Notification from '../../components/Notification';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import Link from 'next/link';

type Props = {}

function SignIn({}: Props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const {result, error} = await signIn(email, password);
        if (error) {
            toast.error(error.toString());
        }
    }

    const onGoogleLogin = async () => {
        const {result, error} = await singInWithGoogle();
        if (error) {
            toast.error(error.toString());
            if(auth.currentUser?.emailVerified != true) {
                await sendEmailVerification(auth?.currentUser!)
                .then(() => {
                    toast.success('Please check your email and activate your account!')
                }).catch((err) => {
                    toast.error(err.toString())
                });
            }
        }
    }

return (
    <div 
        className="relative bg-[#11A37F] bg-no-repeat bg-center bg-cover object-scale-down place-items-center 
        bg-[url('/chatgptLogo.svg')] h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >      
        <section className='grid w-screen h-screen justify-center md:mt-10 items-center align-middle overflow-y-auto overflow-x-hidden'>
            <Notification/>
            <div className='relative flex flex-1 md:m-20 flex-col items-center justify-center'>
                {/* Circles */}
                <div className='absolute border blur-sm border-amber-400 rounded-full h-[420px] w-[420px] 
                md:h-[570px] md:w-[570px] opacity-90 animate-pulse' />
                <div className='absolute border border-dashed border-blue-700 rounded-full h-[430px] w-[430px] 
                md:h-[590px] md:w-[590px] opacity-30' />
                <div className='absolute border blur-sm border-red-500 rounded-full h-[410px] w-[410px] 
                md:h-[550px] md:w-[550px] opacity-90 animate-pulse' />
                <div className='absolute border border-double border-red-400 rounded-full h-[420px] w-[420px] 
                md:h-[570px] md:w-[570px] opacity-30'/>
                <div className='absolute border border-red-400 rounded-full h-[200px] w-[200px] 
                opacity-70 animate-ping' />
                
                <form className='relative flex flex-col justify-center items-center text-center align-middle bg-transparent' 
                    onSubmit={handleForm}
                >                                                                           
                    <div className='justify-between flex flex-col'>
                        <div className='flex-1 md:mb-5'>
                            <h1  className='text-white p-1 font-semibold'>Sign In</h1>
                            <label htmlFor="email" className='text-white/90 p-1 text-start'>
                                <p className='p-1'>Email</p>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"                                   
                                    required                                                                                
                                    placeholder="Enter email address..."
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full rounded-full p-1 bg-white/30 text-white placeholder:text-white'
                                />
                            </label>
                        
                            <label htmlFor="password" className='text-white/90 text-start'>
                                <p className='mt-1 p-1'>Password</p>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                   
                                    required                                                                             
                                    placeholder="********"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full rounded-full p-1 bg-white/30 text-white placeholder:text-white'
                                />
                            </label>
                        
                            <button   
                                className="hover:shadow-lg hover:shadow-amber-400 p-2 mt-3 md:mt-5 cursor-pointer 
                                rounded-full bg-[#11A37F] hover:bg-green-500 text-white font-semibold disabled:bg-gray-300 
                                disabled:cursor-not-allowed"                                  
                                type="submit"
                                disabled={(email == null) || (email.match('@') == null) || (password == '' || password.length < 5)}   
                            >     
                                Sign in                                                                 
                            </button>

                            <div className="text-sm text-white mt-1">
                                <span>No account yet? </span>    
                                <Link 
                                    href={'/signup'}
                                    className="inline-block md:p-2 cursor-pointer font-semibold 
                                    hover:underline underline-offset-4 decoration-[#11A37F] hover:decoration-4 text-[#11A37F]"
                                >
                                    Sign up
                                </Link>
                            </div>
                            <Link  
                                href={'/forgotpassword'} 
                                className="text-center cursor-pointer font-semibold hover:underline 
                                underline-offset-4 decoration-red-500 hover:decoration-4 text-red-500"
                            >
                                Forgot password
                            </Link >

                            <div  className=' text-center items-center m-1'>
                                <div className='flex items-center'>
                                    <div className='flex-1 h-[1px] bg-white '/>
                                        <div>
                                            <p className='p-1 md:p-2 text-white italic font-mono'> OR </p>
                                        </div>
                                    <div className='flex-1 h-[1px] bg-white'/>        
                                </div>
                            </div>

                            <div className='flex items-center justify-center'>
                                <div
                                    onClick={onGoogleLogin} 
                                    className="p-2 hover:shadow-lg w-fit hover:shadow-amber-400 opacity-90 hover:bg-green-500
                                    hover:opacity-95 bg-[#11A37F] rounded-full cursor-pointer font-semibold text-white md:mt-1"
                                >
                                    <FcGoogle className='inline-block w-8 h-8 md:w-12 md:h-12'/> 
                                    <span> Sign in with Google</span>
                                </div>               
                            </div> 
                        </div> 
                    </div>              
                </form>                         
            </div>
        </section>
        <div className='text-gray-700'>
            <p>Powered by</p>
            <div className='flex-row flex'>
                <a 
                className='text-gray-600' 
                href="https://openai.com/"  
                target="_blank"  
                >
                    <p className='text-gray-500 p-1 font-bold'>OpenAI</p>
                </a>
                <a 
                className='text-gray-600' 
                href="https://firebase.google.com/"  
                target="_blank"  
                >
                    <p className='text-gray-500 p-1 font-bold'>Firebase</p>
                </a>
                <a 
                className='text-gray-600' 
                href="https://vercel.com/"  
                target="_blank"  
                >
                    <p className='text-gray-500 p-1 font-bold'>Vercel</p>
                </a>
            </div>
        </div>
                              
    </div>
)}

export default SignIn;