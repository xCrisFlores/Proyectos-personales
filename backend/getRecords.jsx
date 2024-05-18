import { supabase } from "../lib/supabase";

export const getRecordsHour = async(id) =>{
    const {data,error} = await supabase
        .from("consumo_hora")
        .select()
        .eq("id", id)

        return data;
        
}