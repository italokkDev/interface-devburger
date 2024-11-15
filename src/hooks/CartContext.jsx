import { useContext, createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext({});



    export const CartProvider = ({children} ) => {
    const [cartProducts, setCartsProducts] = useState([])

const putProductCart = (product) => {
    const cartIndex = cartProducts.findIndex((prd)=> prd.id === product.id)

    let newProductsInCart = [];

    if (cartIndex >= 0) {
        newProductsInCart = cartProducts;

    newProductsInCart[cartIndex].quantity =
       newProductsInCart[cartIndex].quantity + 1;

    setCartsProducts(newProductsInCart);
    
} else {
    product.quantity = 1;
    newProductsInCart = [...cartProducts, product];
    setCartsProducts(newProductsInCart);
}

updateLocalStorage(newProductsInCart)

};
    
const clearCart = () => {
    setCartsProducts([]);

    updateLocalStorage([]);  
   
};

const deleteProduct = (productId) => {
    const newCart = cartProducts.filter((prd)=> prd.id !== productId);
    
    setCartsProducts(newCart);
    updateLocalStorage(newCart);
};

const increaseProduct = (productId) => {
    const newCart = cartProducts.map(prd => {
        return prd.id === productId ? { ...prd, quantity: prd.quantity + 1} 
        : prd;
    });

    setCartsProducts(newCart);
    updateLocalStorage(newCart);
};

const decreaseProduct = (productId) => {
    const cartIndex = cartProducts.findIndex((prd)=> prd.id === productId);

    if (cartProducts[cartIndex].quantity > 1) {
        const newCart = cartProducts.map(prd => {
            return prd.id === productId ? { ...prd, quantity: prd.quantity - 1} 
            : prd;
        });
    
        setCartsProducts(newCart);
        updateLocalStorage(newCart);
    } else {
        deleteProduct(productId);
    }
};

const updateLocalStorage = (products) => {
    localStorage.setItem('devburger:cartInfo', JSON.stringify(products));
};

useEffect(() => {
    const clientCartData = localStorage.getItem('devburger:cartInfo');

    if (clientCartData) {
     setCartsProducts(JSON.parse(clientCartData)); 
    }
}, []);

        return ( <CartContext.Provider value={{
            cartProducts,
            putProductCart,
            clearCart,
            decreaseProduct,
            increaseProduct,
            deleteProduct,
        }}
        >
            {children}
        </CartContext.Provider>


        );
    };


    export const useCart = () => {
       const context = useContext(CartContext);

       if (!context) {
        throw new Error("useCart must be used with a context");
        
       }
         return context;

    };

    CartProvider.propTypes = {
        children: PropTypes.node.isRequired,
     };