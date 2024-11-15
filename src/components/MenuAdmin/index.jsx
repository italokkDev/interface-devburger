import { Container, ItemContainer, ListLink} from "./styles"
import listLinks from "./MenuList"
import LogoutIcon from '@mui/icons-material/Logout';
import {useUser} from "../../hooks/UserContext";
import { useLocation } from "react-router-dom";


export function MenuAdmin() {
    const {logout} = useUser();
    const { pathname } = useLocation();
    return(
        <Container>
           <hr></hr>
           {listLinks.map(item => (
         <ItemContainer key={item.id} isActive={pathname === item.link}>
            <item.icon className="icon"/>
            <ListLink to={item.link}>{item.label}</ListLink>
         </ItemContainer>
            ))}
           <hr></hr>
           <ItemContainer style={{position:"absolute", bottom:"10px", left:"50%"  }}>
           <LogoutIcon style={{color:"#FFFFFF"}}/>
           <ListLink to="/login" onClick={logout} > Sair</ListLink>
           </ItemContainer>
         </Container>
    )
};