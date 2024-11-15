import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import stripePromise from '../../config/stripeConfig';
import { CheckoutForm } from '../../components';




export function CheckOut() {
    const {state: {clientSecret}, } = useLocation();

    if (!clientSecret) {
       
        return <div>Erro: Tente novamente!</div>;
    }


    return(
        <Elements stripe={stripePromise} options={{clientSecret}} >
            <CheckoutForm />
        </Elements>
    );
}