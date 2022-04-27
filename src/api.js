const API_URL = "https://intense-ocean-72693.herokuapp.com";

export const getProducts = async () => {
    try {
        const request = await fetch(`${API_URL}/products`);
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getCategories = async () => {
    try {
        const request = await fetch(`${API_URL}/categories`);
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getSuppliers = async () => {
    try {
        const request = await fetch(`${API_URL}/suppliers`);
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = async (productName, supplierID, categoryID, price) => {
    try {
        const request = await fetch(`${API_URL}/products/create`, {
            body: JSON.stringify({
                productName,
                supplierID,
                categoryID,
                price,
            }),
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id) => {
    try  {
        const request = await fetch(`${API_URL}/products/delete/${id}`, {
            method: "DELETE"
        })
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}
