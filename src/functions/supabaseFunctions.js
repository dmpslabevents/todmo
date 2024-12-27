import {supabase} from '../supabaseClient'
export const checkSession = async () => {
    try {
        const {data: {session}} = await supabase.auth.getSession();
        if (!session?.user){
            return false;
        }
        return session.user
    }
    catch(er){
        return er;
    }
}
export const supabaseFetch = async (from, select, eqFieldName, eqFieldValue, isSingle) => {
    // Build the query dynamically
    let query = supabase.from(from).select(select);
    
    if (eqFieldName && eqFieldValue) {
      query = query.eq(eqFieldName, eqFieldValue);
    }
    
    if (isSingle) {
      query = query.single();
    }else{
        query = query.maybeSingle()
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  };
  