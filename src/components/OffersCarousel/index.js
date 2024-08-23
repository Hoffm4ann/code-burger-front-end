import React, { useEffect, useState } from "react";
import Offers from "../../assets/offers.png";
import { Container, CategoryImg, ContainerItems, Image, Button } from "./styles";
import api from "../../services/api";
import Carousel from 'react-elastic-carousel';
import formatCurrency from "../../utils/formatCurrency";
import { useCart } from "../../hooks/CardContext";
import { useHistory } from "react-router-dom";

function OffersCarousel() {
    const [offers, setOffers] = useState([])
    const { putProductInCart } = useCart()
    const { push } = useHistory()

    useEffect(() => {
        async function loadOffers() {
            const { data } = await api.get("products")

            const onlyOffers = data.filter(product => product.offer).map(product => {
                return { ...product, fotmatedPrice: formatCurrency(product.price) }
            })


            setOffers(onlyOffers)
        }
        loadOffers()
    }, []);

    const breakPoint = [
        { width: 1, itemsToShow: 1 },
        { width: 400, itemsToShow: 2 },
        { width: 600, itemsToShow: 3 },
        { width: 900, itemsToShow: 4 },
        { width: 1300, itemsToShow: 5 }
    ]

    return (
        <Container>
            <CategoryImg src={Offers} alt="logo-da-oferta" />
            <Carousel itemsToShow={5} style={{ width: "90%" }} breakPoints={breakPoint}>
                {offers && offers.map(product => (
                    <ContainerItems key={product.id}>
                        <Image src={product.url} alt="foto do produto" />
                        <p>{product.name}</p>
                        <p>{formatCurrency(product.price)}</p>
                        <Button onClick={() => {
                            putProductInCart(product)
                            push("/carrinho")
                        }}>Peça agora</Button>
                    </ContainerItems>
                ))
                }
            </Carousel>
        </Container>
    )
}
export default OffersCarousel;