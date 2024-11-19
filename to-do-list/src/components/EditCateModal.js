import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { categoryApi } from '../api/api';

const EditCateModal = ({ show, setShow, cate, fetchListCategories }) => {
    const [curCateName, setCurCateName] = useState('');
    const [curCateColor, setCurCateColor] = useState('');

    useEffect(() => {
        if (cate) {
            setCurCateName(cate.name);
            setCurCateColor(cate.color);
        }
    }, [cate.name, cate.color]);
    const handleCloseEdit = () => {
        setShow(false);
    };
    const handleSubmitEditTask = async () => {
        const data = {
            name: curCateName,
            color: curCateColor,
        };
        const res = await categoryApi.updateCategory(cate.id, data);

        if (res.status === 200) {
            toast.success('Update category successfully');
            setShow(false);
        } else {
            toast.error('Update category failed');
        }

        await fetchListCategories();
    };

    return (
        <>
            <Modal show={show} onHide={handleCloseEdit} animation={false} size="l" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <input
                                type="color"
                                className="form-control"
                                id="title"
                                value={curCateColor}
                                onChange={(e) => setCurCateColor(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={curCateName}
                                onChange={(e) => setCurCateName(e.target.value)}
                                placeholder="Enter category name"
                            />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseEdit}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmitEditTask}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditCateModal;
