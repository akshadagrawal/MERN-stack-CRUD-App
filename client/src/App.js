import Login from "./components/Login";
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

import './App.css';
import { useDispatch } from "react-redux";
import setAuthToken from "./redux/utils/setAuthToken";
import { logout_user } from "./redux/ducks/authReducer";
import Entries from "./components/Entries";

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
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/dashboard">
            <Entries/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
