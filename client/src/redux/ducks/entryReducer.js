import axios from 'axios';
import { GET_ERRORS } from './errors';
export const ADD_ENTRY= 'add_entry';
export const GET_ENTRIES= 'get_entries';
export const DELETE_ENTRY= 'delete_entry';
export const AFTER_SUBMIT= 'after_submit';
const initialState= {
    entryAdded: false,
    entries: []
};

export const add_entry=(entry)=>dispatch =>{
    axios.post('/api/entry/', entry)
        .then(res=>{
            dispatch({
                type: ADD_ENTRY,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const get_entires= ()=>dispatch=>{
    axios.get('/api/entry')
        .then(res=>{
           dispatch({
                type: GET_ENTRIES,
                payload: res.data
           })
        }).catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
    
        })
}
export const afterSubmit=()=>{
    return {
        type: AFTER_SUBMIT
    }
}
export const delete_entry=(id) => dispatch=>{
    axios.delete(`/api/entry/${id}`)
        .then(res=>{
            dispatch({
                type:DELETE_ENTRY,
                payload:res.data._id
            })
        })
        .catch( err=> console.log(err));
}

const entryReducer= (state= initialState, action) =>{
    switch(action.type) {
        case ADD_ENTRY:
            return {
                ...state,
                entryAdded: true,
                entries: [...state.entries, action.payload]
            }
        case GET_ENTRIES : 
            return {
                ...state,
                entries : action.payload
            }
        case AFTER_SUBMIT: 
            return{
                ...state,
                entryAdded: false
            }
        case DELETE_ENTRY:
                return {
                    ...state,
                    entries: state.entries.filter(entry=> entry._id !==action.payload)
                }
        default: 
            return state;
    }
}

export default entryReducer;