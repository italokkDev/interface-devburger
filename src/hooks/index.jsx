import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";
import PropTypes from "prop-types";


const AppProvider = ({ children }) => {

   return ( 
   <UserProvider>
      <CartProvider>{children}</CartProvider>
         </UserProvider>
   );
};

AppProvider.propTypes = {
   children: PropTypes.node.isRequired,
};

export default AppProvider;