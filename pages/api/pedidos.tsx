import type { NextApiRequest, NextApiResponse } from 'next'

type Order = {
    id: Number,
    description: string,
    name: string
}


const orders: Order[] = [
    { id: 0, name: 'Café', description: 'É... tem uma mina chata pra KRL, querendo café.' },
    { id: 1, name: 'Arroz com feijão', description: 'retirar o feijão e o arroz, obrigado' },
    { id: 2, name: 'Macarrão 4 queijos', description: '' },
]

// const subscribers: NextApiResponse<any>[] =[]

export default (request: NextApiRequest, res: NextApiResponse<any>) => {

    switch (request.method) {
        case 'GET':
            res.status(200).json(orders);
            return;

        // case 'HEAD':
        //     res.status(200).json({ md5: 'not implemented' });
        //     return;

        // case 'POST':
        //     // todo
        //     res.status(201).json({})
        //     return;

        default:
            res.status(405).end();
            return;
    }


}