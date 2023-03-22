import React, {useContext, useReducer} from "react";
import user_reducer from "../reducer/user_reducer";



const initialState = {
    "email": "deva@gmail.com",
    "password": "temppassword",
    

}


const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [state, dispath] = useReducer(user_reducer, initialState);


    return (
        <UserContext.Provider value={{...state}}>{children}</UserContext.Provider>
      )
}

export const useUserContext = () => {
    return useContext(UserContext)
}