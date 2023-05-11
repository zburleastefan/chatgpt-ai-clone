'use client'
import React from 'react';
import { Tooltip } from 'react-tooltip';
import { FcGoogle } from 'react-icons/fc';
import resetPassword from '@/context/auth/resetpassword';
import signIn from '@/context/auth/signin';
import singInWithGoogle from '@/context/auth/singinwithgoogle';
import signUp from '@/context/auth/signup';

function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [reTypedPassword, setReTypedPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorState, setErrorState] = React.useState(false);
    const [isSignUpVisible, setIsSignUpVisible] = React.useState(false);
    const [isResetPassVisible, setIsResetPassVisible] = React.useState(false);

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (isSignUpVisible) {
            const {result, error, message} = await signUp(email, password);
            if (error) {
                setErrorMessage(error.toString());
                setErrorState(true);
                setIsSignUpVisible(false);
            }
            if (message != '') {
                setErrorMessage(message);
                setErrorState(true);
                setIsSignUpVisible(false);
            }
            
        } else if (isResetPassVisible) {
            const {result, error} = await resetPassword(email);
            if (error) {
                setErrorMessage(error.toString());
                setErrorState(true);
                setIsResetPassVisible(false);
            } 
            setErrorMessage('Password reset sent to ' + email + '! Please check your email.');
            setErrorState(true);
            setIsResetPassVisible(false);

        } else  {
            const {result, error} = await signIn(email, password);
            if (error) {
                setErrorMessage(error.toString());
                setErrorState(true);
            }
        }
    }

    const onGoogleLogin = async () => {
        const {result, error} = await singInWithGoogle();
        if (error) {
            setErrorMessage(error.toString());
            setErrorState(true);
        }
    }

return (
    <div 
        className="relative bg-[#11A37F] bg-no-repeat bg-center bg-cover object-scale-down place-items-center 
        bg-[url('/chatgptLogo.svg')] h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >      
        <section className='grid w-screen h-screen justify-center md:mt-10 items-center align-middle'>
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
                    {   isSignUpVisible ? 
                        (   // signup

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
                                        <button   
                                            className="p-2 cursor-pointer font-semibold hover:underline underline-offset-4
                                            decoration-amber-400 hover:decoration-4 text-amber-400"                                  
                                            onClick={() => setIsSignUpVisible(false)}
                                        >      
                                            Sign in                                                         
                                        </button> 
                                    </div>
                                </div>
                            </div>              
                
                        ) : isResetPassVisible ? 
                        (  //restpassword     

                            <div>
                                <h1  className='text-white p-1 font-semibold'>Reset Password</h1>
                                <label htmlFor="email" className='text-white/90 text-start'>
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
                            
                                <button   
                                    className="hover:shadow-lg hover:shadow-amber-400 p-3 mt-5 w-fit cursor-pointer 
                                    rounded-full bg-[#11A37F] hover:bg-green-500 text-white font-semibold disabled:bg-gray-300 
                                    disabled:cursor-not-allowed"                                  
                                    type="submit"
                                    disabled={(email == null) || (email.match('@') == null)}   
                                >      
                                    Send password reset email                                                            
                                </button>  
                                <div className='mt-5 justify-center'>
                                    <div className="text-sm text-white">
                                        <span>Go to </span>
                                        <div   
                                            className="inline-block p-2 cursor-pointer font-semibold hover:underline underline-offset-4
                                            decoration-amber-400 hover:decoration-4 text-amber-400"                                  
                                            onClick={() => setIsResetPassVisible(false)}
                                        >      
                                            <span>Sign in</span>                                                            
                                        </div> 
                                    </div>
                                </div> 
                            </div>              
                
                        ): errorState ? 
                        ( // error

                            <div className='items-center justify-center flex flex-col'>
                                <h1 className='text-white'>{errorMessage}</h1>
                                <div   
                                    className="hover:shadow-lg hover:shadow-amber-400 p-3 w-24 mt-5 cursor-pointer 
                                    rounded-full bg-[#11A37F] hover:bg-green-500 text-white font-semibold"                                  
                                    onClick={() => setErrorState(false)}
                                >     
                                    <p>Ok</p>                                                                
                                </div>
                            </div>

                        ) : 
                        ( // signin
                                                    
                            <div >
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
                                        data-tooltip-content="Enter a valid email address"
                                        className='tooltip w-full rounded-full p-1 bg-white/30 text-white placeholder:text-white'
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
                                        data-tooltip-content="Enter password"
                                        className='tooltip w-full rounded-full p-1 bg-white/30 text-white placeholder:text-white'
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
                                    <div 
                                        onClick={() => setIsSignUpVisible(true)}  
                                        className="inline-block md:p-2 cursor-pointer font-semibold 
                                        hover:underline underline-offset-4 decoration-[#11A37F] hover:decoration-4 text-[#11A37F]"
                                    >
                                        <span>Sign up</span>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setIsResetPassVisible(true)} 
                                    className="text-center cursor-pointer font-semibold hover:underline 
                                    underline-offset-4 decoration-red-500 hover:decoration-4 text-red-500"
                                >
                                    <span>Forgot password</span>
                                </div>

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
                        )
                    }
                </form>                         
                <Tooltip anchorSelect=".tooltip" className='shadow-sm shadow-red-400 text-white font-sans text-xs rounded-full p-1 bg-white/30 absolute' />                
            </div>
            <div className='align-bottom justify-center items-center'>
                <div className='text-gray-700 flex-col'>
                    <p>Powered by</p>
                    <div className='flex-row'>
                        <a 
                        className='text-gray-600' 
                        href="https://openai.com/"  
                        target="_blank"  
                        >
                            <span className='text-gray-500 p-2 font-bold'>OpenAI</span>
                        </a>
                        <a 
                        className='text-gray-600' 
                        href="https://firebase.google.com/"  
                        target="_blank"  
                        >
                            <span className='text-gray-500 p-2 font-bold'>Firebase</span>
                        </a>
                        <a 
                        className='text-gray-600' 
                        href="https://vercel.com/"  
                        target="_blank"  
                        >
                            <span className='text-gray-500 p-2 font-bold'>Vercel</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
)}

export default SignIn;