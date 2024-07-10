import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const ErrContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState({});
  const [err, setErr] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ErrContext.Provider value={{ err, setErr }}>
        {props.children}
      </ErrContext.Provider>
    </UserContext.Provider>
  );
}
