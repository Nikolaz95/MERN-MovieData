import React from 'react'
import styled, { keyframes } from "styled-components"

// shared light UI for the dashboard / user pages (same colors as header, details page...)

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(16px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

/* ---------- page header ---------- */

const HeaderWrapper = styled.header`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 24px;
    animation: ${fadeUp} 400ms ease-out both;
`;

const HeaderTitle = styled.h1`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    color: #1f2937;

    &::before {
        content: "";
        flex-shrink: 0;
        width: 6px;
        height: 1.1em;
        border-radius: 3px;
        background: linear-gradient(180deg, #29aff8 0%, #1ed5a9 100%);
    }
`;

const HeaderCount = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 10px;
    font-size: 16px;
    color: white;
    background: linear-gradient(120deg, #29aff8 0%, #1ed5a9 100%);
    border-radius: 999px;
`;

const HeaderSubtitle = styled.p`
    margin-top: 6px;
    padding-left: 18px;
    font-size: 15px;
    color: #64748b;
`;

export const PageHeader = ({ title, subtitle, count, children }) => (
    <HeaderWrapper>
        <div>
            <HeaderTitle>
                {title}
                {count !== undefined && <HeaderCount>{count}</HeaderCount>}
            </HeaderTitle>
            {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
        </div>
        {children}
    </HeaderWrapper>
);

/* ---------- card ---------- */

export const Card = styled.section`
    width: 100%;
    max-width: ${({ $wide }) => ($wide ? "none" : "560px")};
    padding: 28px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07);
    animation: ${fadeUp} 450ms ease-out 80ms both;

    @media (max-width: 425px) {
        padding: 20px 16px;
    }
`;

export const CardTitle = styled.h2`
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: 800;
    color: #1f2937;
`;

export const CardText = styled.p`
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.5;
    color: #64748b;
`;

/* ---------- form ---------- */

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const Label = styled.label`
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: #475569;
`;

export const Input = styled.input`
    width: 100%;
    height: 48px;
    padding: 0 16px;
    font-family: inherit;
    font-size: 15px;
    color: #1f2937;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    outline: none;
    transition: border-color 200ms ease, box-shadow 200ms ease, background-color 200ms ease;

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        background-color: white;
        border-color: #29aff8;
        box-shadow: 0 0 0 4px rgba(41, 175, 248, 0.15);
    }
`;

export const Hint = styled.p`
    font-size: 12px;
    color: #94a3b8;
`;

export const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 6px;
`;

/* ---------- buttons (also usable as links: <PrimaryButton as={NavLink} to="..."> ) ---------- */

const BaseButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 46px;
    padding: 0 22px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease, opacity 200ms ease;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
    }

    &:active:not(:disabled) {
        transform: scale(0.97);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    img {
        width: 20px;
        height: 20px;
    }
`;

export const PrimaryButton = styled(BaseButton)`
    color: white;
    background: linear-gradient(120deg, #29aff8 0%, #1ed5a9 100%);
    box-shadow: 0 8px 20px rgba(41, 175, 248, 0.35);

    &:hover:not(:disabled) {
        box-shadow: 0 12px 26px rgba(41, 175, 248, 0.45);
    }
`;

export const GhostButton = styled(BaseButton)`
    color: #0b84c6;
    background-color: white;
    box-shadow: inset 0 0 0 2px #29aff8;

    &:hover:not(:disabled) {
        background-color: #e0f2fe;
    }
`;

export const DangerButton = styled(BaseButton)`
    color: white;
    background: linear-gradient(120deg, #fb7185 0%, #e11d48 100%);
    box-shadow: 0 8px 20px rgba(225, 29, 72, 0.3);
`;

/* ---------- empty list ---------- */

const EmptyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 48px 20px;
    text-align: center;
    background-color: white;
    border: 2px dashed #e2e8f0;
    border-radius: 20px;
    animation: ${fadeUp} 450ms ease-out both;
`;

const EmptyIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 76px;
    height: 76px;
    margin-bottom: 8px;
    color: #29aff8;
    background-color: #f0f9ff;
    border-radius: 50%;
`;

const EmptyTitle = styled.p`
    font-size: 18px;
    font-weight: 800;
    color: #1f2937;
`;

const EmptyText = styled.p`
    margin-bottom: 10px;
    font-size: 15px;
    color: #64748b;
`;

export const EmptyState = ({ icon, title, text, children }) => (
    <EmptyWrapper>
        {icon && <EmptyIcon>{icon}</EmptyIcon>}
        <EmptyTitle>{title}</EmptyTitle>
        {text && <EmptyText>{text}</EmptyText>}
        {children}
    </EmptyWrapper>
);
