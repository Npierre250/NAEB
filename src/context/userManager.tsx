import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const signup = async ({
    email,
    password,
    isNaseMember,
    nesaCode,
    phoneNumber,
  }: any) => {
    const { data: result, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          isNaseMember,
          nesaCode,
          phoneNumber,
        },
      },
    });
    if (error) {
      throw error;
    }
    setUser(result);
  };
  const login = async ({ email, password }: any) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    setUser(data);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
