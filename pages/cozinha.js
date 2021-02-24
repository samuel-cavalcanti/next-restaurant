import styles from '../styles/Home.module.css'
import logo from "../components/logo";
import React, {useState} from "react";
import {Card, ListGroup} from "react-bootstrap";
import Pusher from "pusher-js";


export async function getServerSideProps(context) {
    const baseUrl = process.env.VERCEL_URL
    const response = await fetch(`${baseUrl}/api/pedidos`)
    const orders = await response.json()

    const pusherOptions = {
        channel: process.env.PUSHER_CHANNEL,
        newOrderEvent: process.env.PUSHER_EVENT,
        cluster: process.env.PUSHER_CLUSTER
    }

    return {
        props: {
            orders,
            baseUrl,
            pusherOptions
        }
    }
}


export default function Kitchen(props) {

    const initialState = props.orders
    const pusherOptions = props.pusherOptions

    const [orders, setOrders] = useState(initialState)

    const removeOrder = (index) => {
        const newOrders = [...orders]
        const [deletedOrder] = newOrders.splice(index, 1)
        const url = `${props.baseUrl}/api/pedidos`
        const requestInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE', body: JSON.stringify({id: deletedOrder.id})
        }

        fetch(url, requestInit)
        setOrders(newOrders)
    }

    const newOrderEvent = (order) => {
        const newOrders = [...orders, order]
        setOrders(newOrders)
    }

    const pusher = new Pusher('0b600ebca53ae8bb534c', {
        cluster: 'us2',
        encrypted: true
    })

    const channel = pusher.subscribe(pusherOptions.channel)

    channel.bind(pusherOptions.newOrderEvent, newOrderEvent.bind(this))


    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title} style={{margin: 50}}>
                    Lista de pedidos
                </h1>
                <ListGroup>
                    {orders.map((order, index) => (
                        <div key={index} className={styles.card} onClick={() => removeOrder(index)}>
                            <h3>{order.name}</h3>
                            <Card.Text>{order.description}</Card.Text>
                        </div>
                    ))}
                </ListGroup>

            </main>
            {logo}
        </div>
    )
}
