import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {IContextType, IUser} from "@/types";
import {getCurrentUser} from "@/services/authService.ts";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const INITIAL_USER = {
    id: 0,
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {
    },
    setIsAuthenticated: () => {
    },
    checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)


const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()
    const checkAuthUser = async (): Promise<boolean> => {
        try {
            const currentUser: IUser = await getCurrentUser();

            if (!currentUser) {
                return false
            }
            setUser(currentUser)
            setIsAuthenticated(true);
            return true;
        } catch (err) {
            console.log(err)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    // onload da page, verificando se o user esta autenticado
    useEffect(() => {
        const jwt: string | undefined = Cookies.get('jwt');
        if (jwt == null || jwt == undefined || jwt.split(' ')[0] !== 'Bearer') {
            navigate('/login')
        }
        checkAuthUser()
            .then((bool: boolean) => {
                if (!bool) {
                    console.log(bool)
                    navigate('/login')
                    return
                }
                console.log(bool)
            })
    }, []);

    // values que serão exportados no authContext
    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext)