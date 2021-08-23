import styled from 'styled-components';

export const Button = styled.button`
    background-color: var(--tertiary);
    color: var(--primary);
    padding: 4px 10px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    -o-border-radius: 8px;
`;

export const LinkButton = styled.a`
    background-color: var(--tertiary);
    color: var(--primary);
    padding: 4px 10px;
    font-weight: 700;
    margin: 5px;
    cursor: pointer;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    -o-border-radius: 8px;
`;