import Modal from 'react-bootstrap/Modal';
import { taskApi } from '../api/api';
import { toast } from 'react-toastify';
const DeleteTaskModal = ({show, setShow, task, fetchListTasks  }) => {

    const handleCloseDelete = () => {
        setShow(false);
    }
    const handleSubmitDeleteTask = async () => {
        const id = task ? task.id : null;
        if (id === null) {
            return;
        }
        const res = await taskApi.deleteTask(id);
        await fetchListTasks();
        handleCloseDelete();
        toast.success('Delete task successfully');
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseDelete}
                animation={false}
                size="sm"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <p>Are you sure delete task has id: {task && task.id}</p>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseDelete}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmitDeleteTask}>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteTaskModal;
