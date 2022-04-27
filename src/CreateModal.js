import { useEffect } from "react";
import { useState } from "react";
import { getCategories, getSuppliers, createProduct } from "./api";

const CreateModal = ({ setState, updateProducts }) => {
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        getCategories().then((response) => setCategories(response));
        getSuppliers().then((response) => setSuppliers(response));
    }, []);
    const onSubmit = (event) => {
        event.preventDefault();
        const productName = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const supplierID = document.getElementById("select-supplier").value;
        const categoryID = document.getElementById("select-category").value;
        createProduct(productName, supplierID, categoryID, price)
            .then((product) => updateProducts((prevState) => [product, ...prevState]))
            .then(setState(false));
    };
    return (
        <div className="overlay">
            <div className="create-modal">
                <form className="modal-inner" onSubmit={onSubmit}>
                    <label for="name">Product Name:</label>
                    <input type="text" id="name" />
                    <label for="price">Product Price:</label>
                    <input type="number" id="price" step="0.01" />
                    {categories && (
                        <>
                            <label for="select-category">Category:</label>
                            <select id="select-category">
                                {categories.map((category, key) => {
                                    return (
                                        <option key={key} value={category.categoryid}>
                                            {category.categoryname}
                                        </option>
                                    );
                                })}
                            </select>
                        </>
                    )}
                    {suppliers && (
                        <>
                            <label for="select-supplier">Supplier:</label>
                            <select id="select-supplier">
                                {suppliers.map((supplier, key) => {
                                    return (
                                        <option key={key} value={supplier.supplierid}>
                                            {supplier.suppliername}
                                        </option>
                                    );
                                })}
                            </select>
                        </>
                    )}
                    <div className="footer">
                        <div
                            className="red-button"
                            onClick={() => {
                                setState(false);
                            }}
                        >
                            Close
                        </div>
                        <input type="submit" className="add-button" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateModal;
