import type { NextApiRequest, NextApiResponse } from 'next'

type FoodPlate = {
    description: string,
    title: string
}

const orders: FoodPlate[] = [
    { title: 'Quero Café', description: 'Café de verdade não tem leite' },
    { title: 'Café, eu quero', description: 'Café de verdade não tem açúcar' },
    { title: 'I could some coffee', description: `if the truth is hurts they don't believe it` },
    { title: 'some coffee, I could', description: ' buy me a coffee  ☕' },
]


export default (req: NextApiRequest, res: NextApiResponse<FoodPlate[]>) => {
    res.status(200).json(orders)
}