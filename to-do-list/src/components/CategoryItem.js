import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Dropdown from 'react-bootstrap/Dropdown';
import EditCateModal from './EditCateModal';
import DeleteCateModal from './DeleteCateModal';
import { taskApi } from '../api/api';

const CategoryItem = ({ cate, fetchListCategories, setCurrentCate, fetchTaskByCate, handleActiveCategories }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const handleToggle = () => {
        setShowOptions(!showOptions);
    };
    // lay ra id cua user tu user trong redux
    const user_id = 1;

    const handleGetTaskByCate = () => {
        handleActiveCategories();
        setCurrentCate(cate);
        fetchTaskByCate(cate.id);
    };
    return (
        <>
            <div className="category-item-containner" onClick={handleGetTaskByCate}>
                <div
                    className="category-item-containner__color"
                    style={{
                        backgroundColor: cate.color,
                    }}
                ></div>

                <div className="category-item-containner__content">{cate && cate.name}</div>

                <div className="category-item-container__options" onClick={handleToggle}>
                    <Dropdown>
                        <Dropdown.Toggle variant="Secondary" id="dropdown-basic" size="sm"></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item size="sm" onClick={() => setShowEdit(true)}>
                                <FaPen /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item size="sm" onClick={() => setShowDelete(true)}>
                                <RiDeleteBin6Fill /> Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <EditCateModal
                show={showEdit}
                setShow={setShowEdit}
                cate={cate}
                fetchListCategories={fetchListCategories}
            />

            <DeleteCateModal
                show={showDelete}
                setShow={setShowDelete}
                cate={cate}
                fetchListCategories={fetchListCategories}
            />
        </>
    );
};

export default CategoryItem;
