import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { taskApi } from '../api/api';
const TaskCard = ({ id, name, description, list, color, done, fetchTasks, showEditTaskModal, showDeleteTaskModal}) => {
    const handleCheck = async () => {
        const res = await taskApi.toggleTaskStatus(id);
        console.log(res.data);
        await fetchTasks();
    };

    const handleDelete = () => {
        showDeleteTaskModal(id);
    };

    const handleEdit = () => {
        console.log('>>> check task id ' + id);
        showEditTaskModal(id);
    };

    return (
        <div className="task-card">
            <div className="task-card__checkbox-container" onClick={handleCheck}>
                <div className={`task-card__checkbox ${done ? 'task-card__checkbox--done' : ''}`}>
                    {done && <div className="task-card__checkbox-inner" />}
                </div>
            </div>

            <div className="task-card__content">
                <h2 className={`task-card__title ${done ? 'task-card__title--done' : ''}`}>{name}</h2>
                <div className="task-card__details">
                    <div className="task-card__description-box">
                        <p className={`task-card__description ${done ? 'task-card__description--done' : ''}`}>{description}</p>
                        {done && <span class="task-card__done-label">✔ DONE</span>}
                    </div>
                    <div className="task-card__info">
                        <div className="task-card__color-indicator" style={{ background: color }}></div>
                        <p className="task-card__list-name">{list}</p>
                    </div>
                </div>
            </div>

            <div className="task-card__actions">
                <div className="task-card__edit-icon" onClick={handleEdit}>
                    <FaPen />
                </div>
                <div className="task-card__delete-icon" onClick={handleDelete}>
                    <RiDeleteBin6Fill />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
