import React from "react"
import {NavLink} from "react-router-dom"
import '../style.css'

const TopNavigation = () => {

    function changeClass(e) {
        const links = document.getElementsByTagName('NavLink')
        for(let i=0; i< links.length; i++){
            links[i] === e.target
                ? links[i].classList.add('active')
                : links[i].classList.remove('active')
        }
        console.log(e.target)
    }

    return (
        <div className="topnav">
            <div className={'navbar'}>
                <NavLink onClick={changeClass} className={'navlink'} exact to="/">
                    <span>Home</span>
                </NavLink>
                <NavLink onClick={changeClass} className={'navlink'} exact to="/numbers">
                    <span>Numbers</span>
                </NavLink>
                <NavLink onClick={changeClass} className={'navlink'} exact to="/about">
                    <span>About</span>
                </NavLink>
            </div>
        </div>
    )
}
export default TopNavigation
