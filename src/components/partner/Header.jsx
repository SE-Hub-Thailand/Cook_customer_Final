import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../style.css"
import { useState } from "react";
function Header() {
    return(
        <>
            <nav className="flex items-center justify-between p-5 pr-20 bg-white">
                <img src={logo} alt="Logo" width={50} />
                <NavLink
                    className="font-semibold hover:text-yellow-hard"
                    to="/partner/profile-store"
                    style= {({ isActive }) => {
                        return { color: isActive ? "yellow-hard" : ""};
                    }}
                >
                    <p>ข้อมูลร้านค้า</p>
                </NavLink>
            </nav>
        </>
    );
}
export default Header;