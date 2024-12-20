import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { userApi } from '../api/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ChangePassModal = ({ show, setShow }) => {
    const user = useSelector((state) => state.auth.user);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);

    const handleClose = () => {
        setShow(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };
    const handleCloseReset = () => {
        setShowResetModal(false);
    };

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirmation do not match.');
            return;
        }

        try {
            const res = await userApi.changePassword(user.id, {
                old_password: currentPassword,
                new_password: newPassword,
            });

            if (res.status === 200) {
                toast.success('Password changed successfully.');
                handleClose();
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('Failed to change password.');
        }
    };

    const handleResetPassword = async () => {
        try {
            const res = await userApi.resetPassword(user.id);
            console.log(res.data);
            toast.success('Password reset successfully. \n' + res.data);
            handleCloseReset();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} size="sm" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="current-password">Current Password</label>
                        <input
                            type="password"
                            id="current-password"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="new-password">New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="confirm-password">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Change Password
                    </button>
                    <button className="btn btn-warning" onClick={() => setShowResetModal(true)}>
                        Reset Password
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showResetModal} onHide={() => setShowResetModal(false)} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to reset your password?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowResetModal(false)}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleResetPassword}>
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChangePassModal;
