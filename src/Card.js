import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import React from "react"

const PUBLIC_KEY = "pk_test_51LX0LLKBIaBSQ6dHZRldDqW"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Card() {
    return (
        <Elements stripe={stripeTestPromise}>
            <Payment />
        </Elements>
    )
}

function Payment() {

    const elements = useElements()
    const stripe = useStripe()

    const handlesubmit = async (e) => {
        e.preventDefault()

        const response = await axios.post("http://localhost:8000/setup-intent/", {
            amount: 1000,
        })
        console.log("Created payment")
        console.log(response.data.client_secret)
        

        // const confirmCardPayment = await stripe.confirmCardPayment(
        //     response.data.client_secret, {
        //         // payment_method: {
        //         //     card: elements.getElement(CardElement)
        //         // }
        //         payment_method: "pm_1LZRZcKBIaBSQ6dHZ835E8v3"
        //     }
        // )
        // console.log(confirmCardPayment)
        // console.log(confirmCardPayment.paymentIntent.status)

        
        


        const confirmCardSetup = await stripe.confirmCardSetup(
            response.data.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            })
            .then(function (result) {
                console.log(result)
            });
        console.log(confirmCardSetup) 
    }
    return (
        <>
            <h1>Card</h1>
            <form onSubmit={handlesubmit}>
                <label htmlFor="card-element">Card</label>
                <CardElement id="card-element" />
                <button>Pay</button>
            </form>
        </>
    )
}
