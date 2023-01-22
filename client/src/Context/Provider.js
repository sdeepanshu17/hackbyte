import axios from "axios";
import { useState,useContext,useEffect,createContext } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const userToken = localStorage.getItem('userToken');
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {

        if (!userToken) {
            // navigate('/login');
            return;
        }

        const user = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }

            const { data } = await axios.get('http://localhost:4000/api/users', config);
            setUser(data);
        }
        user();
    }, [navigate, fetchAgain]);

    return (
        <Context.Provider
            value={{ user, setUser, userToken, fetchAgain, setFetchAgain }}
        >
            {children}
        </Context.Provider>
    )
}
export const ContextState = () => {
    return useContext(Context)
}

export default ContextProvider;