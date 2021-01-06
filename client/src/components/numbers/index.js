import React, {useEffect, useState} from "react"
import NumberCard from "./NumberCard"

export default function NumbersList({numbers}) {

    const [data, setData] = useState('')

    useEffect(()=>setData(numbers), [numbers])

    return (
        <div>
            {data
                ? data.map(number => <NumberCard key={number._id} number={number} />)
                : "no numbers"
            }
        </div>
    )
}


