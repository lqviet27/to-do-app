import React, { useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CategoriesContext } from "../../Contexts/categoriesContext";
import CategorieItem from "../Categorie";

const ExpandSidebarItem = ({ name, icon }) => {
    const [active, setActive] = useState(false);
    // const { categList } = useContext(CategoriesContext);
    // lấy dữ liệu cate từ redux ( redux sẽ get dữ liệu cate từ api)

    const handleActivate = () => {
        setActive(!active);
    };

    return (
        <div className="mb-2">
            <div className={`d-flex align-items-center p-2 rounded ${active ? 'bg-light' : ''}`} onClick={handleActivate}>
                <img src={icon} alt={`${name} icon`} className="me-2" />
                <h5 className="mb-0">{name}</h5>
                <img src={active ? "/path/to/arrow-up.svg" : "/path/to/arrow-down.svg"} alt="Toggle" className={`ms-auto ${active ? 'rotate' : ''}`} />
            </div>
            {active && (
                <div className="bg-light p-2 rounded mt-1">
                    {categList.map((cat, index) => (
                        <CategorieItem key={index} name={cat.name} color={cat.color} />
                    ))}
                    <div className="d-flex align-items-center mt-2">
                        <img src="/path/to/add-icon.svg" alt="Add" className="me-2" />
                        <span>Add new</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpandSidebarItem;
