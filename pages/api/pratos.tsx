import type {NextApiRequest, NextApiResponse} from 'next'

type FoodDish = {
    description: string,
    title: string,
    name: string
}

const orders: FoodDish[] = [
    {title: 'Quero Café', description: 'Café de verdade não tem leite', name: 'Café'},
    {title: 'Café, eu quero', description: 'Café de verdade não tem açúcar', name: 'Café'},
    {title: 'I could some coffee', description: `if the truth is hurts they don't believe it`, name: 'Café'},
    {title: 'some coffee, I could', description: ' buy me a coffee  ☕', name: 'Café'},
]


export default (req: NextApiRequest, res: NextApiResponse<FoodDish[]>) => {
    res.status(200).json(orders)
}
