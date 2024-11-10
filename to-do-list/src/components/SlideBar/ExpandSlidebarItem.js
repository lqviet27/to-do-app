import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import CategoryItem from '../CategoryItem';
import { MdAddCircleOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

const ExpandSlidebarItem = ({ name, Icon, categList }) => {
    const [active, setActive] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [nameCate, setNameCate] = useState('');
    const [colorCate, setColorCate] = useState('');

    // const { categList } = useContext(CategoriesContext);
    // lấy dữ liệu cate từ redux ( redux sẽ get dữ liệu cate từ api)

    const handleActivate = () => {
        setActive(!active);
    };

    const handleAddNew = () => {
        setAddNew(!addNew);
    };

    const handleSubmitAddNewCategory = () => {
        
        handleAddNew();
    };

    return (
        <div className="expand-slidebar-item">
            <div className={`header ${active ? 'active' : ''}`} onClick={handleActivate}>
                {Icon && <Icon className="icon" />}
                <h5 className="name">{name}</h5>
                <div className="toggle-icon" style={{ transform: `rotate(${active ? '-90deg' : '0deg'})` }}>
                    <MdKeyboardDoubleArrowDown />
                </div>
            </div>

            {active && (
                <div className="content">
                    {categList.map((cat) => (
                        <CategoryItem name={cat.name} color={cat.color} key={cat.name} />
                    ))}
                    <div className="add-category" onClick={handleAddNew}>
                        <MdAddCircleOutline className="add-icon" />
                        <span>Add new</span>
                    </div>
                </div>
            )}

            {addNew && (
                <div className="add-new">
                    <div className="color-picker">
                        <input type="color" value={colorCate} onChange={(e) => setColorCate(e.target.value)} />
                    </div>
                    <div className="name-input">
                        <input
                            type="text"
                            placeholder="Enter new category"
                            value={nameCate}
                            onChange={(e) => setNameCate(e.target.value)}
                        />
                    </div>
                    <div className="submit-icon" onClick={() => handleSubmitAddNewCategory()}>
                        <FaCheck />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpandSlidebarItem;
