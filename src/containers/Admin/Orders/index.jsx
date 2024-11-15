import React, {useEffect, useState} from "react";
import api from "../../../services/api"
import { Container, LinkMenu, Menu } from "./styles";
import formatDate from '../../../utils/formatDate'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from "./row";
import status from "./orderStatus";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [rows, setRows] = useState([]);
  const [activeStatus, setActiveStatus] = useState(1);

  useEffect(() => { 
    async function loadOrders(){
        const {data} = await api.get('orders');
       
        setOrders(data);
        setFilteredOrders(data);
     }
    loadOrders();
  }, []);

  function createData(order) {
    return {
      orderId: order._id,
      name: order.user.name,
      date: formatDate(order.createdAt),
      status: order.status,
      products: order.products
    };
  }

  useEffect(() => { 
    const newRows = filteredOrders.map(ord => createData(ord))
    setRows(newRows)
  }, [filteredOrders]);

  useEffect(() => { 
    if (activeStatus === 1) {
      setFilteredOrders(orders);
    } else {
      const newFilteredOrders = orders.filter(order => order.status === status.find(s => s.id === activeStatus).value);
      setFilteredOrders(newFilteredOrders);
    }
  }, [orders, activeStatus]);

  function handleStatus(status){
    setActiveStatus(status.id);
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      await api.put(`orders/${orderId}`, { status: newStatus });
      
      const updatedOrders = orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      
      setOrders(updatedOrders);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Menu>
        {status && status.map(status => (
          <LinkMenu key={status.id}
            onClick={() => handleStatus(status)}
            isActive={activeStatus === status.id}
          >
            {status.label}
          </LinkMenu>
        ))}
      </Menu>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} />
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Pedidos</TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Data do pedido</TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row 
                key={row.orderId} 
                row={row} 
                updateOrderStatus={updateOrderStatus}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;