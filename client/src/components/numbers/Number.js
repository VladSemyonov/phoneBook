import React, {useState, useEffect} from "react"
import api from "../../api"

const Number = props => {
    const [number, setNumber] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        api.films.fetchById(props.match.params._id).then(number => {
                setNumber(number)
                setIsLoading(false)
        })
    }, [props.match.params._id])

    return (
        <>
            {isLoading ? (
                <h1>....Loading ....</h1>
            ) : (
                <>
                    <div className="ui grid">
                        <div className="four wide column">
                            <img
                                className="ui fluid image"
                                src={number.img}
                                alt={number.name}
                            />
                        </div>

                        <div className="six wide column">
                            <p>Duration {number.duration}</p>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Number
