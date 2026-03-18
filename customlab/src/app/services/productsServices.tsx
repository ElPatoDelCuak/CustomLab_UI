export const useProductsServices = () => {
    const getProducts = async () => {
        const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/productos",
        {
            method : "GET",
        });
        return await response.json();
    };
    return { getProducts };
}