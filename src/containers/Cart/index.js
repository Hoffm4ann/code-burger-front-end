import React from "react";
import CartLogo from "../../assets/cart-image.png";
import { Container, CartImg, Wrapper } from "./styles";
import CartItems from "../../components/CartItens";
import CartResume from "../../components/CartResume"

function Cart() {
    return (
        <Container>
            <CartImg src={CartLogo} alt="logo-do-carrinho" />
            <Wrapper>
                <CartItems />
                <CartResume />
            </Wrapper>
        </Container>
    )
}
export default Cart;