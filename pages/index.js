import React, {useState} from "react";
import MenuPage from '../components/MenuPage'
import RegisterPage from "../components/registerPage";
import WaitPage from "../components/WaitPage";
import PusherClient from "../Utils/pusherClient";
import ReadyPage from "../components/ReadyPage";
import ErrorPage from "../components/ErrorPage";


export async function getServerSideProps(context) {
    const baseUrl = process.env.VERCEL_URL
    console.log("baseURL", baseUrl)
    const response = await fetch(`${baseUrl}/api/pratos`)
    const dishes = await response.json()

    const pusherOptions = {
        channel: process.env.PUSHER_CHANNEL,
        removeOrderEvent: process.env.PUSHER_REMOVE_ORDER_EVENT,
        cluster: process.env.PUSHER_CLUSTER
    }

    return {
        props: {
            dishes,
            baseUrl,
            pusherOptions
        }
    }
}

export default function Home(props) {

    const states = {
        selectDish: 0,
        register: 1,
        wait: 2,
        ready: 3
    }

    const initialState = {
        state: states.selectDish,
        selectedDish: undefined,
        client: undefined
    }

    const pusherAppKey = '0b600ebca53ae8bb534c'

    const pusherClient = new PusherClient(pusherAppKey, props.pusherOptions.cluster, props.pusherOptions.channel)


    const [globalState, setGlobalState] = useState(initialState)

    const selectDish = (dish) => {
        setGlobalState({...globalState, selectedDish: dish, state: states.register})
    }

    const dishIsReady = (order) => {
        console.log("new order", order)
        console.log("global state", globalState)

        setGlobalState({...globalState, state: states.ready})
    }

    const postOrder = async (order) => {
        const url = `${props.baseUrl}/api/pedidos`
        const requestInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST', body: JSON.stringify(order)
        }
        const response = await fetch(url, requestInit)

        const newOrder = await response.json()
        console.log("client event listener: ", `${props.pusherOptions.removeOrderEvent}-${newOrder.id}`)

        pusherClient.listenerEvent(`${props.pusherOptions.removeOrderEvent}-${newOrder.id}`, dishIsReady.bind(this))
    }

    const submitEvent = (client) => {
        const selectedDish = globalState.selectedDish
        const order = {name: selectedDish.name, description: selectedDish.description, client}

        postOrder(order)
        setGlobalState({...globalState, client: client, state: states.wait})

    }


    const registerPage = <RegisterPage submit={submitEvent.bind(this)}/>
    const menuPage = <MenuPage dishes={props.dishes} selectDish={selectDish.bind(this)}/>
    const waitPage = <WaitPage dishName={globalState.selectedDish?.name}/>
    const readyPage = <ReadyPage client={globalState.client} dish={globalState.selectedDish}/>
    const errorPage = <ErrorPage/>

    switch (globalState.state) {
        case states.selectDish:
            return menuPage

        case states.register:
            return registerPage

        case states.wait:
            return waitPage

        case states.ready:
            return readyPage

        default:
            return errorPage
    }


}
