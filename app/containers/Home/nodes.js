import styled, { css } from 'styled-components';

const container = css`
  text-align: center;
  margin: 50px;
`;

const title = css`
  font-size: 3rem;
  letter-spacing: 5px;
`;

/* eslint-disable prettier/prettier */
const Container = styled.div`${container}`;
const Title = styled.div`${title}`;

export default { Container, Title };
