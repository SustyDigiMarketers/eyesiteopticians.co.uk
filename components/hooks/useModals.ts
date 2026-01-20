import { useState } from 'react';

export const useModals = () => {
    const [isAdmissionFormOpen, setAdmissionFormOpen] = useState(false);
    const [isLoginPageOpen, setLoginPageOpen] = useState(false);

    const handleAdmissionClick = () => setAdmissionFormOpen(true);
    const handleCloseAdmissionForm = () => setAdmissionFormOpen(false);

    const handleOpenLoginPage = () => setLoginPageOpen(true);
    const handleCloseLoginPage = () => setLoginPageOpen(false);

    return {
        isAdmissionFormOpen,
        isLoginPageOpen,
        modalHandlers: {
            handleAdmissionClick,
            handleCloseAdmissionForm,
            handleOpenLoginPage,
            handleCloseLoginPage,
        }
    };
};