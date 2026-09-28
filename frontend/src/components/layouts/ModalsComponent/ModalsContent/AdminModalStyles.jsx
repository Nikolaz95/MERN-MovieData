import styled from "styled-components"

// shared styles for UpdateProfileModal and DeleteAccountModal

const colors = {
    card: "#1c2230",
    cardBorder: "rgba(255, 255, 255, 0.08)",
    input: "#121722",
    inputBorder: "#2c3444",
    text: "#f1f3f7",
    textMuted: "#a9b1c2",
    primary: "#1ed5a9",
    primaryHover: "#3ee6bd",
    danger: "#e5484d",
    dangerHover: "#f0656a",
};

export const ModalCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: min(420px, calc(100vw - 32px));
    padding: 28px;
    background-color: ${colors.card};
    border: 1px solid ${colors.cardBorder};
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    color: ${colors.text};
    font-family: Roboto, Helvetica, Arial, sans-serif;

    @media (max-width: 425px) {
        padding: 22px 18px;
    }
`

export const CloseX = styled.button`
    position: absolute;
    top: 14px;
    right: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: ${colors.textMuted};
    cursor: pointer;
    transition: background-color 150ms, color 150ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        color: ${colors.text};
    }
`

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: ${({ $center }) => ($center ? "column" : "row")};
    align-items: center;
    gap: 14px;
    text-align: ${({ $center }) => ($center ? "center" : "left")};
    padding-right: ${({ $center }) => ($center ? "0" : "32px")};
`

export const IconCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    color: ${({ $danger }) => ($danger ? colors.danger : colors.primary)};
    background-color: ${({ $danger }) => ($danger ? "rgba(229, 72, 77, 0.15)" : "rgba(30, 213, 169, 0.15)")};
`

export const Avatar = styled.img`
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${colors.primary};
`

export const Title = styled.h2`
    margin: 0;
    font-size: 22px;
    font-weight: 700;
`

export const SubText = styled.p`
    margin: 4px 0 0;
    font-size: 15px;
    line-height: 1.5;
    color: ${colors.textMuted};
    word-break: break-word;

    strong {
        color: ${colors.text};
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

export const Label = styled.label`
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: ${colors.textMuted};
`

export const Input = styled.input`
    width: 100%;
    padding: 12px 14px;
    font-size: 15px;
    color: ${colors.text};
    background-color: ${colors.input};
    border: 1px solid ${colors.inputBorder};
    border-radius: 10px;
    outline: none;
    transition: border-color 150ms, box-shadow 150ms;

    &::placeholder {
        color: #5d6679;
    }

    &:focus {
        border-color: ${colors.primary};
        box-shadow: 0 0 0 3px rgba(30, 213, 169, 0.2);
    }
`

// role picker (user / admin)
export const RoleToggle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    padding: 4px;
    background-color: ${colors.input};
    border: 1px solid ${colors.inputBorder};
    border-radius: 10px;
`

export const RoleOption = styled.button`
    padding: 10px;
    font-size: 15px;
    font-weight: 600;
    text-transform: capitalize;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    color: ${({ $active }) => ($active ? "#0b1a16" : colors.textMuted)};
    background-color: ${({ $active }) => ($active ? colors.primary : "transparent")};
    transition: background-color 150ms, color 150ms;

    &:hover {
        color: ${({ $active }) => ($active ? "#0b1a16" : colors.text)};
    }
`

export const Actions = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 4px;

    & > button {
        flex: 1;
    }
`

const BaseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 44px;
    padding: 0 18px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 150ms, border-color 150ms, transform 100ms;

    &:active:not(:disabled) {
        transform: scale(0.97);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`

export const GhostButton = styled(BaseButton)`
    color: ${colors.text};
    background-color: transparent;
    border: 1px solid ${colors.inputBorder};

    &:hover:not(:disabled) {
        border-color: ${colors.textMuted};
    }
`

export const PrimaryButton = styled(BaseButton)`
    color: #0b1a16;
    background-color: ${colors.primary};
    border: none;

    &:hover:not(:disabled) {
        background-color: ${colors.primaryHover};
    }
`

export const DangerButton = styled(BaseButton)`
    color: white;
    background-color: ${colors.danger};
    border: none;

    &:hover:not(:disabled) {
        background-color: ${colors.dangerHover};
    }
`

export const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
)
