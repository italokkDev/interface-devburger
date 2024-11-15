import './styles.css';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useCart } from '../../../hooks/CartContext';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';

export function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { state: { dpmCheckerLink }, } = useLocation();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage('Erro ao carregar o serviço de pagamento. Tente novamente mais tarde.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        const products = cartProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          price: product.price
        }));

        const { status } = await api.post('/orders', { products }, { 
          validateStatus: () => true,
        });

        if (status === 200 || status === 201) {
          setTimeout(() => {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
            }, 3000);
            clearCart();
          toast.success('Pedido realizado com sucesso!');
        } else if (status === 409) {
          toast.error('Falha ao realizar seu pedido.');
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error('Erro ao realizar pedido:', error);
        toast.error('Falha no sistema! Tente novamente.');
      }
    } else {
      navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <div className='container'>
    <div id="payment-status">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className='button'>
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar Agora"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>

      <div id="dpm-annotation">
        <p>
          Os métodos de pagamento são disponibilizados conforme sua região.&nbsp;
          <a href={dpmCheckerLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            id="dpm-integration-checker">
            Ver métodos de pagamento
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}

