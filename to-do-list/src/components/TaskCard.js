import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { taskApi } from '../api/api';
const TaskCard = ({
    id,
    name,
    description,
    list,
    color,
    done,
    fetchTasks,
    handleNotDone,
    handleDone,
    handleAll,
    currentFilter,
    showEditTaskModal,
    showDeleteTaskModal,
}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    const handleCheck = async (event) => {
        event.stopPropagation(); // Ngăn sự kiện lan truyền
        const res = await taskApi.toggleTaskStatus(id);
        console.log(res.data);
        handleNotDone();
        switch (currentFilter) {
            case 'done':
                console.log('>>> check done');
                handleDone();
                break;
            case 'all':
                handleAll();
                break;
            default:
                handleNotDone();
                break;
        }
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
        <div className={`task-card ${expanded ? 'task-card--expanded' : ''}`}>
            <div className="task-card__header" onClick={toggleExpand}>
                <div className="task-card__checkbox-container" onClick={(e) => handleCheck(e)}>
                    <div className={`task-card__checkbox ${done ? 'task-card__checkbox--done' : ''}`}>
                        {done && <div className="task-card__checkbox-inner" />}
                    </div>
                </div>

                <h2 className={`task-card__title ${done ? 'task-card__title--done' : ''}`}>
                    {name ? name : '( Không có tiêu đề )'}
                </h2>
            </div>

            {expanded && (
                <div className="task-card__content">
                    <div className="task-card__details">
                        <div className="task-card__description-box">
                            <p className={`task-card__description ${done ? 'task-card__description--done' : ''}`}>
                                {description}
                            </p>
                            {done && <span className="task-card__done-label">✔ DONE</span>}
                        </div>
                        <div className="task-card__info">
                            <div className="task-card__color-indicator" style={{ background: color }}></div>
                            <p className="task-card__list-name">{list}</p>
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
            )}
        </div>
    );
};

export default TaskCard;
