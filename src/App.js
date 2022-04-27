import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "./api";
import CreateModal from "./CreateModal.js";
const App = () => {
    const [products, setProducts] = useState([]);
    const [create, setCreate] = useState(false);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        getProducts().then((response) => setProducts(response));
    }, []);
    const onDelete = () => {
        deleteProduct(selected).then((response) => {
            if (response.success) {
                setProducts((prevState) =>
                    prevState.filter((product) => product.productid !== selected)
                );
            }
        });
    };

    return (
        <>
            {create && <CreateModal setState={setCreate} updateProducts={setProducts} />}
            <div className="table-container">
                <div className="header">
                    <div className="add-button" onClick={() => setCreate(true)}>
                        Add new
                    </div>
                    <div className="red-button" onClick={onDelete}>
                        Delete
                    </div>
                </div>
                {products && (
                    <table cellspacing="0">
                        <tr>
                            <th>Product Name</th>
                            <th>Category Name</th>
                            <th>Country</th>
                            <th>Price</th>
                        </tr>
                        {products.map((product, key) => {
                            return (
                                <tr
                                    key={key}
                                    className={selected === product.productid ? "selected" : ""}
                                    onClick={() => setSelected(product.productid)}
                                >
                                    <td className="name">{product.productname}</td>
                                    <td>{product.categoryName}</td>
                                    <td>{product.supplierCountry}</td>
                                    <td>{product.price}</td>
                                </tr>
                            );
                        })}
                    </table>
                )}
            </div>
        </>
    );
};

export default App;
