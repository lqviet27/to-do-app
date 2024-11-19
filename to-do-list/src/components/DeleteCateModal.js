import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { categoryApi } from '../api/api';

const DeleteCateModal = ({ show, setShow, cate, fetchListCategories }) => {
    const handleCloseDelete = () => {
        setShow(false);
    };
    const handleSubmitDelete = async () => {
        const res = await categoryApi.deleteCategory(cate.id);
        if (res.status === 200) {
            toast.success('Delete category successfully');
            setShow(false);
        } else {
            toast.error('Delete category failed');
        }
        await fetchListCategories();
    };
    return (
        <>
            <Modal show={show} onHide={handleCloseDelete} animation={false} size="sm" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure delete category has id: {cate.id} </p>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseDelete}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmitDelete}>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteCateModal;
