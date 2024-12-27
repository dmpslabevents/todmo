// import { supabase } from "../supabaseClient";

import { authOut, authSet } from "../store/auth.store";
import { checkSession, supabaseFetch } from "./supabaseFunctions";
import { supabase } from "../supabaseClient";
export async function isAuth(dispatch, navigate) {
    const session = await checkSession();
    if (session) {
      const data = await supabaseFetch("operators", "name, role", "email", session.email, false);
      console.log(data)
      if (!data) {
        
        logout(dispatch, navigate);
        return null;
      }
      const { name, role } = data;  // Assuming it returns an array
      dispatch(authSet({ auth: true, email: session.email, name, role }));
      return true;
    }
    return null;    
  }
  

export async function login(email, password, dispatch, navigate){
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password
      });
      if(data){
        const auth = await isAuth(dispatch, navigate)
        if (auth){
            return true;
        }
        else{
            logout(dispatch, navigate)
            return false;
        }
      }
      return false
}

export async function logout(dispatch, navigate){
    const { error } = await supabase.auth.signOut();
        if (error) {
          localStorage.clear();
          dispatch(authOut);
          navigate("/opl");
        } else {
          dispatch(authOut()); 
          localStorage.clear();
          navigate("/opl");
        }
}