import Button from './styles'
import { useNavigate } from 'react-router-dom';

export function BackButton() {
const navigate = useNavigate();
    
    return(
<Button  
className="custom-btn btn-12"
onClick={() => {
  navigate(
   {
      pathname: '/',
     
   });
}}><span>↩︎ Voltar</span><span>↩︎ Voltar</span></Button>
    )
}


