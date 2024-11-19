import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const SlidebarItem = ({ name, Icon, isActive = false, action }) => {

    useEffect(()=>{
        if(isActive && action){
            action();
        }
    },[isActive])
    
    return (
        <div className={`slidebar-item ${isActive ? 'active' : ''}`} onClick={action}>
            {Icon && <Icon className="icon" />}
            <   h5 className="name">{name}</h5>
        </div>
    );
};

export default SlidebarItem;