import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const SlidebarItem = ({ name, Icon, isActive = false }) => {
    return (
        <div className={`d-flex align-items-center p-2 rounded ${isActive ? 'bg-light text-primary' : ''}`}>
            {/* <img src={icon} alt={`${name} icon`} className="me-2" /> */}
            {Icon && <Icon className="me-2" />}
            <h5 className="mb-0">{name}</h5>
        </div>
    );
};

export default SlidebarItem;