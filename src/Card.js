import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import React from "react"

const PUBLIC_KEY = "pk_test_51LX0LLKBIaBSQ6dHZRldDqWEVWbN7kq1m8vzLUFwjrTh9LJ3hrqFkct6GaseCklmxdo5v3Rj9f7nI1LgN2AeyO4W00O1JFrFcF"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Card() {
	return (
		<Elements stripe={stripeTestPromise}>
			<Payment />
		</Elements>
	)
}

function Payment(){

    const elements = useElements()
    const stripe = useStripe()

    const handlesubmit = async (e) =>{
        e.preventDefault()

        const response = await axios.post("http://localhost:8000/intents/", {
                    amount: 1000,
        })
        console.log("Created payment")
        console.log(response.data.client_secret)

        const confirmCardPayment = await stripe.confirmCardPayment(
            response.data.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }
        )
        console.log(confirmCardPayment.paymentIntent.status)

    } 
    return(
        <>
        <h1>Card</h1>
        <form onSubmit={handlesubmit}>
            <label htmlFor="card-element">Card</label>
            <CardElement id="card-element"/>
            <button>Pay</button>
        </form>
        </>
    )
}