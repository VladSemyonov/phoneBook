import React, {useState, useEffect} from "react"
import ReactImageFallback from "react-image-fallback"
import setFormObject from "./FormUtils";

const initialData = {
    name: "",
    telephone: "",
    img: "http://via.placeholder.com/250x250",
    _id: null,
}

const NumberForm = props => {debugger

    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (props.number) {
            setData(props.number[0])
        } else {
            setData(initialData)
        }
    }, [props.number])

    const handleSubmit = e => {
        e.preventDefault()
        const errors = validate(data)
        setErrors(errors)
        if (Object.keys(errors).length > 0){
            return}
        else {props.submit(data)}
    }


    const validate = data => {
        const errors = {}
        if (data.name.length===0) errors.name = "This field cant be blank"
        if (!data.telephone) errors.telephone = "This field cant be blank"
        if (parseInt(data.telephone) <= 0) errors.telephone = "Error telephone"

        return errors
    }

    return (
        <form className={'add-form'} onSubmit={handleSubmit}>
                <div>
                    <ReactImageFallback className={'preimage'}
                        src={data.img}
                        fallbackImage="http://via.placeholder.com/250x250"
                        alt="thumbnail"
                    />
                </div>
                    <div className={'form-div'}>
                        <div className={'enter-value'}>
                            <label>Image</label>
                            <input
                                value={data.img}
                                onChange={setFormObject(data, setData)}
                                type="text"
                                name="img"
                                id="img"
                                placeholder="img"
                            />
                        </div>
                    </div>
                    <div className={'form-div'}>
                        <div className={'enter-value'}>
                            <label>Name</label>
                            <input type="text"  name="name"  id="name"  placeholder="Contact name"
                                 onChange={setFormObject(data, setData)}
                                 value={data.name}
                            />
                        </div>
                        <span>{errors.name}</span>
                    </div>

                <div className={'form-div'}>
                    <div className={'enter-value'}>
                        <label>telephone</label>
                        <input type="number"  name="telephone" id="telephone"  placeholder="telephone"
                           value={data.telephone}
                           onChange={setFormObject(data, setData)}
                        />
                    </div>
                    <span>{errors.telephone}</span>
                </div>

            <div className={'form-div enter-value'}>
                <button type="submit">Save</button>
                <button onClick={props.click}>Hide</button>
            </div>
        </form>
    )
}

export default NumberForm
