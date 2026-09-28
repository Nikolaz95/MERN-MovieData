import React from 'react'

//import components
import {
    ModalCard, CloseX, CloseIcon, ModalHeader, IconCircle, Title, SubText,
    Actions, GhostButton, DangerButton
} from './AdminModalStyles';


const TrashIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
        <path d="M10 11v6M14 11v6" />
    </svg>
)

// delete logic is in GlobalModals (onConfirm)
const DeleteAccountModal = ({ titleText, underPText, userName, userEmail, onConfirm, isLoading, onClose }) => {
    return (
        <ModalCard role="alertdialog" aria-labelledby="deleteModalTitle">
            <CloseX onClick={onClose} aria-label="Close">
                <CloseIcon />
            </CloseX>

            <ModalHeader $center>
                <IconCircle $danger>
                    <TrashIcon />
                </IconCircle>
                <div>
                    <Title id="deleteModalTitle">{titleText}</Title>
                    <SubText>{underPText}</SubText>
                    {userName && (
                        <SubText>
                            <strong>{userName}</strong>
                            {userEmail && <> ({userEmail})</>}
                        </SubText>
                    )}
                    <SubText>This action cannot be undone.</SubText>
                </div>
            </ModalHeader>

            <Actions>
                <GhostButton onClick={onClose} disabled={isLoading}>
                    Cancel
                </GhostButton>
                <DangerButton onClick={onConfirm} disabled={isLoading}>
                    {isLoading ? "Deleting..." : "Delete"}
                </DangerButton>
            </Actions>
        </ModalCard>
    )
}

export default DeleteAccountModal
