import styled from 'styled-components';

const Card = styled.article`
    padding: 16px;
    background: var(--entry);
    transition: transform .1s;
    border-bottom: 1px solid var(--border);
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    color: var(--theme);
`;

export default Card;