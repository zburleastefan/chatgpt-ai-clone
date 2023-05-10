import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import SignIn from '@/app/signin/page';
import LoadingDots from '@/app/components/LoadingDots';

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext({});
export const useAuthContext = () =>  React.useContext(AuthContext);
export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<Boolean>(true);
   
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
                className="flex flex-col bg-[#11A37F] bg-no-repeat bg-center bg-cover justify-start
                text-center bg-[url('/chatgptLogo.svg')]
                h-screen sm:pt-[10%] overflow-y-hidden overflow-x-clip p-3"
            >
                <h1 className='text-2xl text-[#11A37F] font-mono font-bold'>Loading</h1>
                <LoadingDots/>
            </div>
        : user && user.emailVerified == true ? 
            children
        :
            <SignIn />
        }
    </AuthContext.Provider>
  );
}