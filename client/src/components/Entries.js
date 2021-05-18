import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Container } from 'reactstrap';
import NavBar from './NavBar'
import Tab1 from './tabs/Tab1';
import Tab2 from './tabs/Tab2';

const Entries = () => {
    const [tab1, setTab1]= useState(true);
    const [tab2,setTab2] = useState(false);
    const history=useHistory();
    const errors= useSelector(state=> state.error);
    const isAuthenticated=useSelector(state => state.auth.isAuthenticated);


    let display;
    if(tab1) display= <Tab1/>
    else display= <Tab2/>
    return (
        <div>
            <NavBar/>
            <Container >
            { (errors=== "No token, authorization denied" &&!isAuthenticated) && history.push('/')}
                <div className="tabDiv">
                <Button onClick={()=>{setTab1(true); setTab2(false)}} className={tab1 ? "selected": "tabbtn" } >Add Entry</Button>
                <Button onClick={()=>{setTab2(true); setTab1(false)}} className={tab2 ? "selected": "tabbtn" }  >View Entries</Button>
                </div>
                
                {display}
                
            </Container>
            
        </div>
    )
}

export default Entries
