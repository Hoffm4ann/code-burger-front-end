import React from "react";
import PropTypes from "prop-types";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CardContext";

const AppProvider = ({ children }) => (
    <CartProvider>
        <UserProvider>{children}</UserProvider>
    </CartProvider>
)



AppProvider.propType = {
    Children: PropTypes.node
}

export default AppProvider;