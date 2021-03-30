import React, { useState , useEffect } from 'react';
import { getAllProducts} from "../api/ProductsCRUD";

const ProductContext = React.createContext([{}, () => {}]);

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        getAllProducts().then(res =>  {
            setProducts(res?.data)
            console.log('RES',res);
        }, err =>  {
            console.log("Error")
        })
    },[products])
    return (
        <ProductContext.Provider value={[products, setProducts]}>{children}</ProductContext.Provider>
    );
};

export { ProductsProvider, ProductContext };
