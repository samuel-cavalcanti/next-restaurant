import type {NextApiRequest, NextApiResponse} from 'next'
import Pusher from "pusher";
import OrderDatabase, {Order} from "../../Utils/OrderDatabase";


const channels = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
})

export default async (request: NextApiRequest, res: NextApiResponse) => {

    request.headers["access-control-allow-origin"] = "*"
    request.headers["access-control-allow-methods"] = "POST"
    request.headers["access-control-allow-headers"] = "Origin, Content-Type, X-Auth-Token"

    const pusherChannel = process.env.PUSHER_CHANNEL
    const pusherNewOrderEvent = process.env.PUSHER_NEW_ORDER_EVENT
    const pusherRemoveOrderEvent = process.env.PUSHER_REMOVE_ORDER_EVENT

    const orders = new OrderDatabase()


    const postNewOrderEvent = async () => {
        let newOrder = {...request.body} as Order
        newOrder = orders.addOrder(newOrder)
        await channels.trigger(pusherChannel, pusherNewOrderEvent, newOrder)

        res.status(201).json(newOrder)
        res.end()

    }

    const deleteOrderEvent = async () => {
        const {id} = request.body
        const order = orders.removeOrderById(id) || {}
        await channels.trigger(pusherChannel, `${pusherRemoveOrderEvent}-${id}`, order)
        res.json(order)
        res.status(202).end()
    }

    switch (request.method) {
        case 'GET':
            const itens = orders.getOrders()
            res.status(200).json(itens);
            res.end()
            console.log("get orders", itens)
            return;


        case 'POST':
            await postNewOrderEvent()
            return;

        case 'DELETE':
            await deleteOrderEvent()
            return;

        default:
            res.status(405).end();
            return;

    }


}
