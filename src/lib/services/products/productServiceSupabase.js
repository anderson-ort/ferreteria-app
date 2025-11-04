import { supabase } from "../../infra/supabase/supabase"

export const productServiceSupabase = {
    async getProducts() {
        const { data, error } = await supabase
        .from('productos')
        .select('id, nombre, precio, descripcion');


        if (error) throw new Error(error.message)

        return data
    }
}