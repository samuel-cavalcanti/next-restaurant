import {useState} from "react";
import Menu from '../components/menu'
import {useRouter} from "next/router";
import Register from "../components/register";

export async function getServerSideProps(context) {
    const baseUrl = process.env.VERCEL_URL
    const response = await fetch(`${baseUrl}/api/pratos`)
    const dishes = await response.json()

    return {
        props: {
            dishes,
            baseUrl
        }
    }
}

export default function Home(props) {


    const dishes = props.dishes;
    const router = useRouter()

    const [selectedDish, setDish] = useState(undefined)

    const selectDish = (dish) => {
        setDish(dish)
    }

    const menu = <Menu dishes={dishes} selectDish={selectDish.bind(this)}/>;


    const submitEvent = (client) => {
        const order = {name: selectedDish.name, description: selectedDish.description, client}
        const url = `${props.baseUrl}/api/pedidos`
        const requestInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST', body: JSON.stringify(order)
        }

        fetch(url, requestInit)
        router.push(`/aguarde/${selectedDish.name}`);
    }

    const register = <Register submit={submitEvent.bind(this)}/>


    console.log(selectedDish)

    const currentSelection = selectedDish ? register : menu


    return (
        currentSelection
    )
}
