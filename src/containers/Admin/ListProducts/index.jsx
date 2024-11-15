import React, { useEffect, useState } from "react";
import { Container, EditIconStyle, Img, TrashImage } from "./styles"; 
import api from "../../../services/api" 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatPrice } from "../../../utils/formatPrice";
import PaidIcon from '@mui/icons-material/Paid'; 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; 
import { useNavigate } from "react-router-dom"; 
import Trash from '../../../assets/trash.svg';


function ListProducts() {
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate();
  

  
  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('products'); 
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }
    loadOrders();
  }, []);

  
  function isOffer(offerStatus) {
    if (offerStatus) {
      return <PaidIcon style={{ color: "#FF0000" }} />; 
    }
    return <AttachMoneyIcon style={{ color: "#FFFFFF" }} />; 
  }

  
  function editProduct(product) {
    navigate('/editar-produto', { state: { product } });
  }

  
  async function handleDelete(productId) {
    try {
    
      await api.delete(`products/${productId}`);
      
    
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      
      
      alert("Produto excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir o produto. Tente novamente.");
    }
  }

  return (
    <Container>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Produto em Oferta</TableCell>
              <TableCell align="center">Imagem do Produto</TableCell>
              <TableCell></TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
           
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell> 
                  <TableCell align="center">{isOffer(product.offer)}</TableCell> 
                  <TableCell align="center">
                    <Img src={product.url} alt="imagem-produto" /> 
                  </TableCell>
                  <TableCell>
                    
                    <EditIconStyle onClick={() => editProduct(product)} aria-label="Edit product" />
                  </TableCell>
                  <TableCell>
                   
                    <TrashImage 
                      src={Trash} 
                      alt="Delete product" 
                      onClick={() => handleDelete(product.id)} 
                      aria-label="Delete product" 
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">Nenhum produto encontrado</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ListProducts;
