import { createContext, useState } from "react";

export const UserContext = createContext()

export default function UserProvider (props) {
const [user, setUser] = useState({emailAddress: "Yusha"});
return (
    <UserContext.Provider value={{user, setUser}}>
    {props.children}
    </UserContext.Provider>
)
}