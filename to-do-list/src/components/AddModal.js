import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { taskApi } from '../api/api';
import { toast } from 'react-toastify';

const AddModal = ({ show, setShow, listCate, fetchListTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const userId = 1;
    const handleClose = () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setShow(false);
    };

    const handleSubmitCreateTask = async () => {
        console.log(title, description, category);
        const data = {
            title: title,
            description: description,
            category_id: category,
            user_id: userId,
        };
        const res = await taskApi.createTask(data);
        console.log(res);
        if (res.status === 201) {
            toast.success('Create task successfully');
            fetchListTasks(userId);
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
                                <option value="">Select category</option>
                                {listCate.map((cat) => (
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
