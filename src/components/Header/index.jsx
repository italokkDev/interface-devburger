import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';
import { useCart } from '../../hooks/CartContext'; 
import { Container, Navigation, Options, Profile, Logout, LinkContainer, HeaderLink, Content, CartBadge } from './styles'; 
import { UserCircle, ShoppingCart } from 'phosphor-react';

export function Header() {
    const navigate = useNavigate();
    const { logout, userInfo } = useUser();
    const { pathname } = useLocation();
    const { cartProducts = [] } = useCart(); 

    function logoutUser() {
        logout();
        navigate('/login');
    }

    
    const totalItems = cartProducts.reduce((acc, product) => acc + product.quantity, 0);

    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === '/'}>Home</HeaderLink>
                        <hr />
                        <HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>Cardápio</HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircle color="#fff" size={35} />
                        <div>
                            <p>
                                Olá, <span>{userInfo?.name || 'Visitante'}</span>
                            </p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>
                    <LinkContainer>
                        <div style={{ position: 'relative' }}>
                            <ShoppingCart color="#fff" size={24} />
                            {totalItems > 0 && (
                                <CartBadge>{totalItems}</CartBadge> 
                            )}
                        </div>
                        <HeaderLink to="/carrinho">Carrinho</HeaderLink>
                    </LinkContainer>
                </Options>
            </Content>
        </Container>
    );
}
