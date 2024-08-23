import React from "react";
import PropTypes from "prop-types";
import { Container, Image, ProductName, ProductPrice } from "./styled";
import Button from "../Button";
import { useCart } from "../../hooks/CardContext";
import { useHistory } from "react-router-dom";
import SideMenuAdmin from "../SideMenuAdmin"

function CardProduct({ product }) {
    const { putProductInCart } = useCart()
    const { push } = useHistory()

    return (
        <Container>
            <Image src={product.url} alt="imagem do produto" />
            <div>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.formatedPrice}</ProductPrice>
                <Button onClick={() => {
                    putProductInCart(product)
                    push("/carrinho")
                }
                }>Adicionar</Button>
            </div>
        </Container>
    )
}

export default CardProduct;

CardProduct.propTypes = {
    product: PropTypes.object
}
