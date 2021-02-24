import type {NextApiRequest, NextApiResponse} from 'next'
import Pusher from "pusher";


type RestaurantClient = {
    name: string,
    cpf: string,
}

type Order = {
    id: number,
    description: string,
    name: string,
    client: RestaurantClient,
}


const orders: { [key: number]: Order } = {
    0: {id: 0, name: 'Café', description: 'com 2 colheres de açucar', client: {name: 'anna', cpf: '123.456.789.12'}},
    1: {
        id: 1,
        name: 'Arroz com feijão',
        description: 'retirar o feijão e o arroz, obrigado',
        client: {name: 'anna', cpf: '123.456.789.12'}
    },
    2: {id: 2, name: 'Macarrão 4 queijos', description: '', client: {name: 'anna', cpf: '123.456.789.12'}},
}

const channels = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
})

export default (request: NextApiRequest, res: NextApiResponse) => {

    const pusherChannel = process.env.PUSHER_CHANNEL
    const pusherEvent = process.env.PUSHER_EVENT

    let lastId = 2


    const postNewOrderEvent = async () => {
        const newOrder = {...request.body, id: lastId} as Order
        orders[lastId] = newOrder
        lastId++

        await channels.trigger(pusherChannel, pusherEvent, newOrder)
        res.status(201).json(newOrder)
        res.end()
        console.log("new order event")
    }

    const deleteOrderEvent = () => {
        const {id} = request.body
        const order = orders[id]
        delete orders[id]
        res.json(order)
        res.status(202).end()

    }

    switch (request.method) {
        case 'GET':
            res.status(200).json(Object.values(orders));
            res.end()
            console.log("get orders")
            return;


        case 'POST':
            postNewOrderEvent()
            return;

        case 'DELETE':
            deleteOrderEvent()
            return;

        default:
            res.status(405).end();
            return;

    }


}
