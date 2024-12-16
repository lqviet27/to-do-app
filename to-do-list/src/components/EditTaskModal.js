import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { taskApi } from '../api/api';
import { toast } from 'react-toastify';
const EditTaskModal = ({ show, setShow, task, listCate, fetchListTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setCategory(task.category_id ? task.category_id : listCate[0]?.id);
        }
    }, [task, listCate]);

    const handleSubmitEditTask = async () => {
        const data = {
            title: title,
            description: description,
            category_id: category,
        };
        console.log('>>> data', data);
        const res = await taskApi.updateTask(task.id, data);
        console.log(res.data);
        toast.success('Update task successfully');
        handleCloseEdit();
        await fetchListTasks();
    };
    const handleCloseEdit = () => {
        setShow(false);
    };
    return (
        <>
            <Modal show={show} onHide={handleCloseEdit} animation={false} size="xl" backdrop="static">
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
                                {/* <option value="">Select category</option> */}
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

export default EditTaskModal;
