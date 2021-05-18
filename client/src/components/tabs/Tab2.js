import React from 'react';
import { Button, Container, Table } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { delete_entry} from '../../redux/ducks/entryReducer';

const Tab2 = () => {

    const dispatch= useDispatch();
    const entries= useSelector(state=> state.entry.entries);

    const handleDelete=(id)=>{
        dispatch(delete_entry(id));
    }
    return (
        <div>
            <Container className="mt-5">
            {entries.length === 0 ? <h5 style={{marginLeft: "30%"}}>No Users added!! Add few... </h5>  :(
                <Table className="table" >
                <thead>
                    <tr className="tableHead">
                    <th style={{paddingLeft:"50px"}}><h5>Username</h5></th>
                    <th><h5>Email</h5></th>
                    <th><h5>Address</h5></th>
                    <th><h5>Mobile Number</h5></th>
                    <th></th>

                    </tr>
                </thead>
                <tbody>                    
                        {entries.map (entry=> (
                            <tr key= {entry._id}>
                                <td style={{paddingLeft:"50px"}}>{entry.username}</td>
                                <td>{entry.email}</td>
                                <td>{entry.address}</td>
                                <td>{entry.mobile}</td> 
                                <td><Button color="danger" onClick={()=>handleDelete(entry._id)}> Delete</Button></td> 
                             </tr>
                        ))}
                    
                    
                </tbody>
                </Table>
            )}

            
            </Container>
            
        </div>
    )
}

export default Tab2
