import { OffersCarousel, CategoryCarousel } from '../../components';
import { Banner, Container } from './styles';


export function Home( ) {
    return(
        <main>
            <Banner>
               <h1>Bem Vindo(a)!</h1>
            </Banner>
            <Container>
                
                    <CategoryCarousel/>
                    <OffersCarousel/>
                    <div> Carrossel Produtos </div>
            
            </Container>
        </main>
    );
}