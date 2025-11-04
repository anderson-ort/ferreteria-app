export const productServiceAPIQuery = {
  async getProducts(queryString) {

    const urlQuery = `${import.meta.env.VITE_API_ENDPOINT}/search`
    const token = import.meta.env.VITE_SUPABASE_KEY

    const res = await fetch(urlQuery, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: queryString }), // enviamos JSON
    });


    if (!res.ok) throw new Error('Error al obtener los productos desde la API')
    return res.json()
  },
}
