import styled from 'styled-components';

export const SectionDivider = styled.div`
    border-top: 2px solid darkgrey;
    margin: 20px 0;
    grid-column: 1 / 1; /* this code makes the row stretch to entire width of the grid */
`;

export const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
    cursor: pointer;
    transition: 0.5s all ease-out;
    &:hover {
        background-color: palevioletred;
        color: white;
    }
`

export const Input = styled.input`
    border: 2px solid palevioletred;
    border-radius: 3px;
    color: palevioletred;
    width: ${props => props.width || "30px"};

`