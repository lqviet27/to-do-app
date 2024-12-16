import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { taskApi } from '../api/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddModal = ({ show, setShow, listCate, fetchListTasks }) => {
    const user = useSelector((state) => state.auth.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setShow(false);
    };

    useEffect(() => {
        console.log(">>> RE-RENDER add modal")
        if (listCate.length > 0) {
            setCategory(listCate[0].id);
        }
    },[category, listCate]);

    const handleSubmitCreateTask = async () => {
        console.log(">>> check 2 cataList", listCate);
        console.log(title, description, category);
        const data = {
            title: title,
            description: description,
            category_id: category ? category : null,
            user_id: user.id,
        };
        const res = await taskApi.createTask(data);
        console.log(res);
        if (res.status === 201) {
            toast.success('Create task successfully');
            fetchListTasks(user.id);
        }
        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="xl"
                backdrop="static"
                className="modal-add-student"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter task title"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter task description"
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <select
                                className="form-select"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {listCate.length > 0 ? (
                                    <></>
                                ) : (
                                    <option value="">None</option>
                                )}
                                {Array.isArray(listCate) &&
                                    listCate.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmitCreateTask}>
                        Create
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
