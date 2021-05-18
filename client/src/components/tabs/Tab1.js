import  { useEffect, useState } from 'react'
import { Alert, Button, Container, Form, FormGroup, Input, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { add_entry, afterSubmit, get_entires } from '../../redux/ducks/entryReducer';
import { GET_ERRORS } from '../../redux/ducks/errors';


const Tab1 = () => {
    const dispatch= useDispatch();
    const errors= useSelector(state=> state.error);
    const isAdded= useSelector(state=> state.entry.entryAdded)

    const [user,setUser] = useState({
        username: '',
        email :'',
        address: '',
        mobile: ''
    });
    const handleChange= (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }; 



    useEffect(()=>{
        dispatch(get_entires());
    },[dispatch]);  

    const handleSubmit= (e) =>{
        e.preventDefault();
        dispatch(add_entry(user));        
    }
   const [temp,setTemp]= useState(false);
    if(isAdded && temp){
        setUser ({
            username: '',
            email :'',
            address: '',
            mobile: ''
        });
        dispatch(afterSubmit());
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }

    return (
        <div>

            <Container className="mt-5">
                {!isAdded && errors.username &&<Alert color="danger" className= "alert">{errors.username}</Alert> }
                { !isAdded && errors.email &&<Alert color="danger" className= "alert">{errors.email}</Alert> }
                { !isAdded && errors.address &&<Alert color="danger" className= "alert">{errors.address}</Alert> }
                { !isAdded && errors.mobile &&<Alert color="danger" className= "alert">{errors.mobile}</Alert> }

                {isAdded && (
                    <Modal isOpen={!temp}>
                        <ModalBody>
                            User Added Succesfully!!!
                        </ModalBody>
                        <ModalFooter>
                                <Button onClick={()=>{setTemp(true)}}>Continue</Button>  
                        </ModalFooter>
                    </Modal>
                )}


                    <Form className="form-tab1" onSubmit={handleSubmit} noValidate>
                        <h3 className="header">Add Entry</h3>
                    <FormGroup className="mt-3" >
                        <Input 
                            formNoValidate
                            className="input"
                            type="text" 
                            name="username" 
                            id="username" 
                            value={user.username}
                            onChange= {handleChange}
                            placeholder="Enter Username" 
                        />
                    </FormGroup>
                    <FormGroup className="mt-3" >
                        <Input 
                            formNoValidate
                            className="input"
                            type="email" 
                            name="email" 
                            id="email" 
                            value={user.email}
                            onChange= {handleChange}
                            placeholder="Enter  email" 
                        />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Input 
                            formNoValidate
                            className="input"
                            type="text" 
                            name="address" 
                            id="address" 
                            value={user.address}
                            onChange= {handleChange}
                            placeholder="Enter Address" 
                        />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Input 
                            formNoValidate
                            className="input"
                            type="text" 
                            name="mobile" 
                            id="mobile" 
                            value={user.mobile}
                            onChange= {handleChange}
                            placeholder="Enter Mobile Number" 
                        />
                    </FormGroup>
                    <FormGroup className="btndiv">
                        <Button className="submitButton" size="md" type="submit">Add User</Button>
                    </FormGroup>
                    
                </Form>
                
            </Container>
        </div>
    )
}

export default Tab1
