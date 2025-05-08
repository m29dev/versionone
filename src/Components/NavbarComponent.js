import React from 'react'
import '../Styles/navbar.css'

const NavbarComponent = () => {
    return (
        <div className="navbar">
            <div className="logo">VersionOne</div>

            <div className="features">
                <div className="btn">Home</div>
                <div className="btn">Lessons</div>
                <div className="btn">Tests</div>
            </div>
        </div>
    )
}

export default NavbarComponent
