import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const TaskCard = ({ id, name, list, color, done }) => {
    color = 'red';
    // const { setShowDelete, setId } = useContext();
    // const { checkTask } = useContext();

    function handleCheck() {
        // checkTask(id);
    }

    function handleDelete() {
        // setShowDelete(true);
        // setId(id);
    }
    return (
        <div className="task-card">
            <div className="task-card__checkbox-container" onClick={handleCheck}>
                {/* <input type="checkbox" className="task-card__checkbox-input" checked={done} readOnly /> */}
                <div className={`task-card__checkbox ${done ? 'task-card__checkbox--done' : ''}`}>
                    {done && <div className="task-card__checkbox-inner" />}
                </div>
            </div>

            <div className="task-card__content">
                <h2 className={`task-card__title ${done ? 'task-card__title--done' : ''}`}>{name}</h2>
                <div className="task-card__details">
                    <div className="task-card__color-indicator" style={{ background: color }}></div>
                    <p className="task-card__list-name">{list}</p>
                </div>
            </div>

            <div className="task-card__actions">
                <div className="task-card__edit-icon">
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
