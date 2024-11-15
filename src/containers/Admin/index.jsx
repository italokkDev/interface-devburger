import React from "react";
import { Container, ContainerItem } from "./styles";
import Orders from "./Orders";
import { MenuAdmin } from "../../components";
import ListProducts from "./ListProducts";
import { useLocation} from "react-router-dom";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";


export function Admin() {

  const location = useLocation();

  
  
  return (
    <Container>
     <MenuAdmin/>
     <ContainerItem>
     {location.pathname === "/pedidos" && <Orders/>}
     {location.pathname === "/listar-produtos" && <ListProducts/>}
     {location.pathname === "/adicionar-produto" && <NewProduct/>}
     {location.pathname === "/editar-produto" && <EditProduct/>}
     </ContainerItem>
    </Container>
  );
}

