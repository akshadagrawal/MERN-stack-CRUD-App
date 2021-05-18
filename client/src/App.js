import Login from "./components/Login";
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Route} from "react-router-dom";

import './App.css';
import { useDispatch } from "react-redux";
import setAuthToken from "./redux/utils/setAuthToken";
import { logout_user } from "./redux/ducks/authReducer";
import Entries from "./components/Entries";
import NavBar from "./components/NavBar";

function App() {

  const dispatch= useDispatch();

  //chck for token
  if(localStorage.token){
    //set Auth Token
    setAuthToken(localStorage.token);

    //decode token
    const decode= jwt_decode(localStorage.token);

      //check for expired time
      const currentTime= Date.now()/1000;
      if(decode.exp < currentTime){

      //Logout
      dispatch(logout_user());

      //redirect 
      window.location.href= "/"
    }
    
  }
  return (
    
      <div className="App">
        <NavBar/>
        <Router>
       
          <Route exact path="/">
            <Login/>
          </Route>
        
        
          <Route path="/dashboard">
            <Entries/>
          </Route>
       
        </Router>
      </div>
   
    
  );
}

export default App;
