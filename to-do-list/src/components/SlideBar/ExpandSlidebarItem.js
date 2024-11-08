import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import CategoryItem from '../CategoryItem';
import { MdAddCircleOutline } from 'react-icons/md';

const ExpandSlidebarItem = ({ name, Icon }) => {
    const [active, setActive] = useState(false);
    const categList = [
        {
            name: 'Work',
            color: 'red',
        },
        {
            name: 'Study',
            color: 'blue',
        },
    ];
    // const { categList } = useContext(CategoriesContext);
    // lấy dữ liệu cate từ redux ( redux sẽ get dữ liệu cate từ api)

    const handleActivate = () => {
        setActive(!active);
    };

    return (
        <div className="mb-2">
            <div
                className={`d-flex align-items-center p-2 rounded ${active ? 'bg-light' : ''}`}
                onClick={handleActivate}
            >
                {Icon && <Icon className="me-2" />}
                <h5 className="mb-0">{name}</h5>
                {/* <img
                    src={active ? '/path/to/arrow-up.svg' : '/path/to/arrow-down.svg'}
                    alt="Toggle"
                    className={`ms-auto ${active ? 'rotate' : ''}`}
                /> */}
                <div classname>
                    <MdKeyboardDoubleArrowDown />
                </div>
            </div>
            {active && (
                <div className="bg-light p-2 rounded mt-1">
                    {categList.map((cat) => (
                        <CategoryItem name={cat.name} color={cat.color} />
                    ))}
                    <div className="d-flex align-items-center mt-2">
                        {/* <img src="" alt="Add" className="me-2" /> */}
                        <MdAddCircleOutline />
                        <span>Add new</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpandSlidebarItem;
