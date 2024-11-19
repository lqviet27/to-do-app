import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import CategoryItem from '../CategoryItem';
import { MdAddCircleOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { categoryApi } from '../../api/api';
import { useSelector } from 'react-redux';
const ExpandSlidebarItem = ({
    isActive,
    name,
    Icon,
    categList,
    fetchListCate,
    fetchListCategories,
    setCurrentCate,
    fetchTaskByCate,
    handleActiveCategories
}) => {
    const user = useSelector((state) => state.auth.user);
    const [activeTogge, setActiveToggle] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [nameCate, setNameCate] = useState('');
    const [colorCate, setColorCate] = useState('');
    
    const handleActivate = () => {
        setActiveToggle(!activeTogge);
    };

    const handleAddNew = () => {
        setAddNew(!addNew);
    };

    const handleClose = () => {
        setNameCate('');
        setColorCate('');
        setAddNew(!addNew);
    };
    const isSubmitEnabled = nameCate.trim() !== '' && colorCate.trim() !== '';

    const handleSubmitAddNewCategory = async () => {
        if (isSubmitEnabled) {
            const data = {
                name: nameCate,
                color: colorCate,
                user_id: user.id,
            };
            const res = await categoryApi.createCategory(data);
            console.log(res);
            await fetchListCate();
            handleClose();
        }
    };

    return (
        <div className="expand-slidebar-item">
            <div className={`header ${isActive ? 'active' : ''}`} onClick={handleActivate}>
                {Icon && <Icon className="icon" />}
                <h5 className="name">{name}</h5>
                <div className="toggle-icon" style={{ transform: `rotate(${activeTogge ? '-90deg' : '0deg'})` }}>
                    <MdKeyboardDoubleArrowDown />
                </div>
            </div>

            {activeTogge && (
                <div className="content">
                    {categList.map((cat) => (
                        <CategoryItem
                            key={cat.id}
                            cate={cat}
                            fetchListCategories={fetchListCategories}
                            setCurrentCate={setCurrentCate}
                            fetchTaskByCate={fetchTaskByCate}
                            handleActiveCategories={handleActiveCategories}
                        />
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
                    <div
                        className={`submit-icon ${isSubmitEnabled ? '' : 'disabled'}`}
                        onClick={() => handleSubmitAddNewCategory()}
                        style={{ cursor: isSubmitEnabled ? 'pointer' : 'not-allowed' }}
                    >
                        <FaCheck />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpandSlidebarItem;
