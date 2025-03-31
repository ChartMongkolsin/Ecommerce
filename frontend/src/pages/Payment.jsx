import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import useUserStore from '../stores/userstore';
import { checkout } from '../api/checkout';
import { useState } from 'react';
import { useParams } from 'react-router';
const stripePromise = loadStripe("pk_test_51R80FrRplpVJaCw85XTcYPrerntEdjDZFpTGfINg4Fbhd2pDbXY3s0tBsew9Oms2SPRmRWeMViA9JsnO60d5kOUo002M5ZDg5E");


function Payment() {
    //Javascript
    const token = useUserStore(state=>state.token)

    const fetchClientSecret = async (id) => {
        try {
            const res = await checkout(token, id);
            console.log('res',res);
            return res.data.clientSecret
        } catch (error) {
            console.error("Error fetching client secret:", error);
        }
    };

    const options = {fetchClientSecret};
    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>

    )
}

export default Payment