import React, { createContext, useCallback, useContext, useState } from 'react'

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [activeModal, setActiveModal] = useState("");
    // extra data the open modal needs (userId, picture, movie...)
    const [modalData, setModalData] = useState(null);

    const openModal = (name, data = null) => {
        setModalData(data);
        setActiveModal(name);
    };

    /* user - delete own account */
    const openDeleteOwnAccountModal = () => {
        openModal("deleteOwnAccountModal");
    };

    /* admin - update / delete user */
    const openUpdateUserModal = (userId) => {
        openModal("updateUserModal", { userId });
    };

    const openDeleteUserModal = (user) => {
        openModal("deleteUserModal", { userId: user._id, userName: user.name, userEmail: user.email });
    };

    /* movie / tv show details */
    const openPictureModal = (picture) => {
        openModal("pictureModal", { picture });
    };

    const openStreamingModal = (movieInfo, type) => {
        openModal("streamingModal", { movieInfo, type });
    };

    const openTrailerModal = (trailer, title) => {
        openModal("trailerModal", { trailer, title });
    };


    // useCallback so Modal's useEffect doesn't re-run on every render
    const closeModal = useCallback(() => {
        setActiveModal("");
        setModalData(null);
    }, []);

    return (
        <ModalContext.Provider value={{
            activeModal, modalData, closeModal,
            openDeleteOwnAccountModal, openUpdateUserModal, openDeleteUserModal,
            openPictureModal, openStreamingModal, openTrailerModal
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) { throw new Error("useModal must be used inside ModalProvider"); }
    return context;
};
