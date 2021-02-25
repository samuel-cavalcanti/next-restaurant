export type RestaurantClient = {
    name: string,
    cpf: string,
}

export type Order = {
    id: number,
    description: string,
    name: string,
    client: RestaurantClient,
}


export default class OrderDatabase {
    private readonly orders: { [key: number]: Order }
    private lastId: number


    constructor() {
        this.orders = {}
        this.lastId = 0
    }


    getOrders(): Order[] {
        return Object.values(this.orders);
    }

    addOrder(order: Order): Order {
        const newOrder = {...order, id: this.lastId}
        this.orders[this.lastId] = newOrder
        this.lastId++
        return newOrder
    }


    removeOrderById(id: number): Order {
        const order = this.orders[id]
        delete this.orders[id]
        return order
    }
}
