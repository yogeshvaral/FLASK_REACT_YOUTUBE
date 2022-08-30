import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM  from 'react-dom';
import Navbar from './components/Navbar';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import './styles/main.css';
import HomePage from './components/Home';
import SignUpPage from './components/SIgnUp';
import LoginPage from './components/Login';
import CreateRecipePage from './components/Create_Recipes';

const App =()=>{

    return(
        <Router>
        <div className="">
            <Navbar/>
            <Routes>
                <Route path="/create_recipe" element={<CreateRecipePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}>
                </Route>
                <Route path="/" element={<HomePage/>}>
                    
                </Route>                
            </Routes>
        </div>
        </Router>
    )
}
  
ReactDOM.render(<App/>,document.getElementById('root'))