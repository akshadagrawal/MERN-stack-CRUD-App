import React from 'react'
import {Navbar,  NavbarBrand } from 'reactstrap';

const NavBar = () => {
    return (
        <>
            <Navbar color="dark" dark expand= "sm" className="mb5-5">
                <NavbarBrand href="#" style={{marginLeft :"7rem"}} >My App</NavbarBrand>
            </Navbar>
        </>
    )
}

export default NavBar
