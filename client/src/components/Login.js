import React, { useState } from 'react'
import { Alert, Button, Container, Form, FormGroup, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { login_user } from '../redux/ducks/authReducer';
import { useHistory } from 'react-router';


const Login = () => {
    const history= useHistory();
    const [user,setUser]= useState({
        email:'',
        password: ''
    });
    const dispatch= useDispatch();
    const isAuthenticated=useSelector(state => state.auth.isAuthenticated);
    const errors= useSelector(state=> state.error);
    
    const handleChange= (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }; 

    const handleSubmit= (e) =>{
        e.preventDefault();
        dispatch(login_user(user));   
    }

    if(isAuthenticated){
         history.push('/dashboard');
    }


    return (   
        <>
            <Container className="mt-5">
                <h1 className= "header" style={{marginBottom:"25px"}}>Welcome!</h1>
                {errors.email &&<Alert color="danger" className= "alert">{errors.email}</Alert> }
                {errors.password &&<Alert color="danger" className= "alert">{errors.password}</Alert> }



                    <Form className="form" onSubmit={handleSubmit} noValidate>
                        <h3 className="header">Please Login to continue!</h3>
                    <FormGroup className="mt-3" >
                        <Input 
                            formNoValidate
                            className="input"
                            type="email" 
                            name="email" 
                            id="email" 
                            value={user.email}
                            onChange= {handleChange}
                            placeholder="Enter your Email" 
                        />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Input 
                            formNoValidate
                            className="input"
                            type="password" 
                            name="password" 
                            id="password" 
                            value={user.password}
                            onChange= {handleChange}
                            placeholder="Enter your Password" 
                        />
                    </FormGroup>
                    <FormGroup className="btndiv">
                        <Button className="submitButton" size="md" type="submit">Submit</Button>
                    </FormGroup>
                    
                </Form>
                
            </Container> 
            
        </>
    )
}

export default Login
