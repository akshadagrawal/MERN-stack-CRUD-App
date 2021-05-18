import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS } from './errors';
export const LOGIN_USER= "login_user";
export const LOGOUT_USER= "logout_user";



const initialState= {
    isAuthenticated: null,
}
export const login_user=(userData)=>dispatch=> {
       
     
     //post request using axios
     axios.post('/api/auth/login',userData )
        .then(res=>{
           //save to local storage
           const {token}= res.data;

           //set item in local storage
           localStorage.setItem('token', token);

           //set token to auth header
           setAuthToken(token);

           //set isAuthnicated is true
            dispatch({
                type: LOGIN_USER
            });
    
        })
        .catch(err=> {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const logout_user= () =>dispatch=>{
    //remove the auth token
    localStorage.removeItem('token');

    //remove auth heade for private routes
    setAuthToken(false);


    dispatch({
        type: LOGOUT_USER
    })

}

const authReducer= (state= initialState, action) =>{
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false
            }
        default: 
            return state;
    }
}

export default authReducer;
 