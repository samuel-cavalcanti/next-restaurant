import React from 'react';
import WaitPage from "../../components/WaitPage";

export async function getStaticPaths() {
    return {
        paths: [
            {
                params:
                    {
                        dishName: 'Café'
                    }
            }
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    const dishName = context.params.dishName

    return {
        props: {
            dishName: dishName
        }
    }
}


export default function WaitPage(props) {
    const wait = <WaitPage dishName={props.dishName}/>

    return wait
}
