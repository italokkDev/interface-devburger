import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PostAddIcon from '@mui/icons-material/PostAdd';

const listLinks = [
   {
    id: 1,
    label: 'Pedidos',
    link: '/pedidos',
    icon: DescriptionOutlinedIcon 
   },
   {
      id: 2,
      label: 'Produtos',
      link: '/listar-produtos',
      icon: FastfoodIcon 
     },
     {
      id: 2,
      label: 'Novo Produto',
      link: '/adicionar-produto',
      icon: PostAddIcon
     }
];

export default listLinks