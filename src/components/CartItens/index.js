import React from "react";
import { Container, Header, Body, EmptyCart } from "./styles";
import { useCart } from "../../hooks/CardContext";
import formatCurrency from "../../utils/formatCurrency";

function CartItems() {
    const { cartProducts, increaseProducts, decreaseProducts } = useCart()
    return (
        <Container>
            <Header>
                <p></p>
                <p>Items</p>
                <p>Preço</p>
                <p style={{ paddingRight: 30 }}>Quantidade</p>
                <p>Total</p>
            </Header>
            {cartProducts && cartProducts.length > 0 ? (
                cartProducts.map(product => (
                    <Body key={product.id}>
                        <img src={product.url} alt="foto do produto" />
                        <p>{product.name}</p>
                        <p>{formatCurrency(product.price)}</p>
                        <div className="quantity-container">
                            <button onClick={() => decreaseProducts(product.id)}>-</button><p>{product.quantity}</p><button onClick={() => increaseProducts(product.id)}>+</button>
                        </div>
                        <p>{formatCurrency(product.quantity * product.price)}</p>
                    </Body>
                ))
            ) : (
                <EmptyCart>Carrinho vazio</EmptyCart>
            )}
        </Container >
    )
}
export default CartItems;