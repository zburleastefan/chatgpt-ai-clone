import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import SignIn from '@/app/signin/page';
import SignUp from '@/app/signup/page';
import { usePathname } from 'next/navigation';
import ForgotPassword from '@/app/forgotpassword/page';
import LoadingDots from '../components/LoadingDots';

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext({});
export const useAuthContext = () =>  React.useContext(AuthContext);
export const AuthContextProvider = ({
    children,
}:{
    children: React.ReactNode
}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<Boolean>(true);
    const pathName = usePathname();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
    <AuthContext.Provider value={{user}}>
        { loading ? 
            <div 
                className="flex flex-col bg-[#11A37F] bg-no-repeat bg-center bg-cover
                text-center bg-[url('/chatgptLogo.svg')] justify-center
                h-screen sm:pt-[10%] overflow-y-hidden overflow-x-clip p-3"
            >
                <h1 className="text-3xl font-display font-serif md:text-5xl font-bold tracking-normal text-[#11A37F] ">
                    Loading{" "}
                    <span className="relative text-3xl"><LoadingDots /></span>
                </h1>
            </div>
        : user && user.emailVerified == true ? 
            children
        : pathName?.includes('forgotpassword') ?
            <ForgotPassword />
        : pathName?.includes('signup') ?
            <SignUp/>
        :
            <SignIn/>
        }
    </AuthContext.Provider>
  );
}