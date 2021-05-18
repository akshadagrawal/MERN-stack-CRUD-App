import axios from 'axios';

const setAuthToken = (token) =>{
    if(token) {

        //Apply header to every token
        axios.defaults.headers.common['x-auth-token']= token;
    }else{
        //Delete auth header
         delete axios.defaults.headers.common['x-auth-token'];

    }
}
export default setAuthToken;