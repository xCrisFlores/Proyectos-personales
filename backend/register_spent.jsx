import { supabase } from "../lib/supabase";

export const spent_hour = async(tiempos, litros, consumo) =>{
    
    try {
    
        const { data, error } = await supabase
          .from('consumo_hora')
          .insert([
            { 
              tiempos: tiempos,
              litros: litros,
              consumo: consumo 
            }
          ]);
          
      } catch (error) {
      
      }

}