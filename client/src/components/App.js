import React from "react"
import {Route} from "react-router-dom"
import Number from './numbers/Number'
import TopNavigation from "./TopNavigation"
import HomePage from "./HomePage";
import NumbersPage from './NumbersPage'
import About from './About'

const AppContext = React.createContext()
export {AppContext}

const App = () => {

    return (
        <div>
            <TopNavigation/>
            <div className={'container'}>
                <Route exact path="/" component={HomePage} />
                <Route path="/numbers" render={props => <NumbersPage {...props} />} />
                <Route path="/about" component={About}/>
                <Route path="/number/:_id" exact component={Number} />
            </div>
        </div>
    )
}

export default App
