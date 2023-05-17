'use client'
import React from 'react';
import Notification from '@/components/Notification';
import signUp from '@/context/auth/signup';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';

type Props = {}

function SignUp({}: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [reTypedPassword, setReTypedPassword] = React.useState('');

  const handleForm = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const {result, error, message} = await signUp(email, password);
    if (error) {
        toast.error(error.toString());
    }
    if (message != '') {
        toast.success(message);
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
            
          <form onSubmit={handleForm}
            className='relative flex flex-col justify-center items-center text-center align-middle bg-transparent' 
          >                                              
            <div>
              <h1  className='text-white text-center p-1 font-semibold'>Create new account</h1>
              <label htmlFor="email" className='text-white/90 p-1 text-start'>
                <p className='p-1'>Email</p>
                <input
                  id="email"
                  name="email"
                  type="email"                                   
                  required                                                                                
                  placeholder="Enter email address..."
                  onChange={(e) => setEmail(e.target.value)}
                  data-tooltip-content="Enter a valid email address"
                  className='tooltip rounded-full p-1 w-full bg-white/30 text-white placeholder:text-white'
                />
              </label>
          
              <label htmlFor="password" className='text-white/90 text-start'>
                <p className='mt-3 p-1'>Password</p>
                <input
                  id="password"
                  name="password"
                  type="password"                                   
                  required                                                                               
                  placeholder="Enter new password..."
                  onChange={(e) => setPassword(e.target.value)}
                  data-tooltip-content="Enter minimum 6 characters"
                  className='tooltip w-full rounded-full p-1 bg-white/30 text-white placeholder:text-white'
                />
              </label>
          
              <label htmlFor="retypedPassword" className='text-white/90 text-start'>
                <p className='p-1'>Password</p>
                <input
                  id="retypedPassword"
                  name="retypedPassword"
                  type="password"                                   
                  required                                                                              
                  placeholder="Re-enter new password..."
                  onChange={(e) => setReTypedPassword(e.target.value)}
                  data-tooltip-content="Enter minimum 6 characters"
                  className='tooltip  w-full rounded-full p-1 bg-white/30 text-white placeholder:text-white'
                />
              </label>
          
              <button   
                className="hover:shadow-lg hover:shadow-amber-400 p-2 mt-5 w-fit cursor-pointer 
                rounded-full bg-[#11A37F] hover:bg-green-500 text-white font-semibold disabled:bg-gray-300 
                disabled:cursor-not-allowed"                                  
                type="submit"
                disabled={(email == '') || (email.match('@') == null) || (password.length <= 5) || (reTypedPassword.length <= 5) || (reTypedPassword.match(password) == null) || (password.match(reTypedPassword) == null)}
              >     
                Sign up                                                                 
              </button>
          
              <div className='mt-2 justify-center'>
                <div className="text-sm text-white">
                  <span>Already have an account? </span>
                  <Link   
                    href={'/'}
                    className="p-2 cursor-pointer font-semibold hover:underline underline-offset-4
                    decoration-amber-400 hover:decoration-4 text-amber-400"                         
                  >      
                    Sign in                                                         
                  </Link> 
                </div>
              </div>
            </div>  
          </form>    
          <Tooltip anchorSelect=".tooltip" className='shadow-sm shadow-red-400 text-white font-sans text-xs rounded-full p-1 bg-white/30 absolute' />                
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
          <a 
            className='text-gray-600' 
            href="https://www.prisma.io/"  
            target="_blank"  
            >
              <p className='text-gray-500 p-1 font-bold'>Prisma</p>
          </a>
        </div>
      </div>                     
    </div>                 
  )
}

export default SignUp;