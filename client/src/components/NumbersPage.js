import React, {useState, useEffect} from "react"
import api from "../api"
import NumbersList from "./numbers"
import {AppContext} from './App'
import {sortBy, filter} from 'lodash'
import NumberForm from "./forms/NumberForm";

function NumbersPage () {

    const [numbers, setNumbers] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [finedContacts, setFinedContacts] = useState()
    const [editData, setEditData] = useState()
    const [showAddForm, setShowAddForm] = useState(false)


    useEffect(()=>{
        api.numbers.fetchAll()
            .then(number=> setNumbers(sortBy(number, [function(i){return i.name.toLowerCase()}])))
    }, [])

    const deleteNumber = (numberN) =>{
        api.numbers.delete(numberN)
        setNumbers(()=>numbers.filter(number=>number._id !== numberN._id))
     }

    const saveNumbers = number => {
        (number._id ? updateNumber(number) : addNumber(number))
        setShowAddForm(false)
    }

    const addNumber = numberData =>{
        api.numbers.create(numberData).then(number=>
                setNumbers([...numbers, {...number}]))
    }

    const updateNumber = numberData =>{
        api.numbers.update(numberData).then(number=>
        setNumbers(numbers.map(item => (item._id === number._id ? number : item)),
        ))
        setEditData()}

    const updateFindValue = (e) => {
        setSearchValue(e.target.value)
    }

    const toggleForm = (data) =>{
        setEditData(numbers.filter(item=>item._id === data))
        setShowAddForm(true)
        }

     const closeForm = () =>{
        setEditData()
         setShowAddForm(false)
     }


    const findContact = () => {
        setFinedContacts(filter(numbers, (item)=>{
            if(item.name.toLowerCase().includes(searchValue.toLowerCase()))
                return item
            if(item.telephone.toLowerCase().includes(searchValue.toLowerCase()))
                return item}))
    }

    const createContact = () =>{
        setEditData()
        setShowAddForm(!showAddForm)
    }

    useEffect(()=>{
        if(searchValue)findContact()}, [searchValue])

        return (
            <AppContext.Provider
                value={{
                    deleteNumber: deleteNumber,
                    toggleForm: toggleForm
                }}>
                    <div className={'main-content'}>
                        <div className={'search-div'}>
                            <h4>Contacts</h4>
                            <button onClick={createContact}>Create contact</button>
                            <input className={'search'}
                                type="text"
                                onChange={updateFindValue}
                                value={searchValue}
                                placeholder='Find contact'
                            />
                        </div>

                        {searchValue ?
                            <NumbersList numbers={finedContacts}/> :
                            <NumbersList numbers={numbers}/>
                        }
                    </div>
                {showAddForm && <NumberForm click={closeForm} number={editData} submit={saveNumbers} />}

            </AppContext.Provider>
        )
    }

export default NumbersPage
