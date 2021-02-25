import OrderDatabase, {Order} from "../Utils/OrderDatabase";

export default test('should get,add,remove, order in OrderDatabase', () => {
    const orders = new OrderDatabase()


    let itens = orders.getOrders()

    expect(itens).toEqual([])

    let order = {client: {cpf: 'sadasd', name: 'sdasdsa'}, description: 'dsadsad', name: 'sadsd'} as Order
    order = orders.addOrder(order)
    itens = orders.getOrders()


    expect(itens).toEqual([order])


    const removedOrder = orders.removeOrderById(0)
    itens = orders.getOrders()


    expect(itens).toEqual([])
    expect(removedOrder).toEqual(order)


})

