import React, {useContext} from "react"
import {AppContext} from '../App'

const NumberCard =({number}) => {
        const {deleteNumber, toggleForm} = useContext(AppContext)

        return (
            <div className={'card-container'}>
            <div className={'card-item'}>
                <img className={'card-img'} src={number.img} />
                <div className={'info'}>
                    <span>{number.name}</span>
                    <span>{number.telephone}</span>
                </div>
                <div className={'card-buttons'}>
                    <button onClick={() => deleteNumber(number)}>Delete</button>
                    <button  onClick={()=>toggleForm(number._id)}>Edit</button>
                </div>
            </div>
            </div>
                )
}

export default React.memo(NumberCard)
