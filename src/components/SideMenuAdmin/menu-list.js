import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import paths from '../../constants/paths';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const listLinks = [
    {
        id: 1,
        label: "Pedidos",
        link: paths.Order,
        icon: ShoppingCartCheckoutIcon
    },
    {
        id: 2,
        label: "Listar Produtos",
        link: paths.Products,
        icon: ShoppingCartIcon
    },
    {
        id: 3,
        label: "Novo Produto",
        link: paths.NewProduct,
        icon: AddShoppingCartIcon
    }
]
export default listLinks;