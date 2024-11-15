import { createContext, useContext, useState, useEffect } from "react";


const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const putUserData = (userInfo) => {
        setUserInfo(userInfo);

    localStorage.setItem('devburger:userData', JSON.stringify(userInfo));
    };

    const logout = () => {
        setUserInfo({});
        localStorage.removeItem('devburger:userData');
    };

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('devburger:userData');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
        setLoading(false);
    }, []);
    

    return(
        <UserContext.Provider value={{userInfo, loading, putUserData, logout}}>
            {children}
            </UserContext.Provider>
    );
}; 
  

export const useUser = () => {
    const context = useContext(UserContext);

    if(!context){
        throw new Error('useUser must be a valid context');
    }

    return context;
};
