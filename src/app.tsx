import React, { useState, useEffect } from "react";
import { obterTodos } from "./service/todoservice";
import { Dados } from "./model/model";
import styled from 'styled-components';
import './style.css';

const StyledContainer = styled.div`
  text-align: start;
`
const StyledH1 = styled.h1`
  color: #b83f45;
  font-size: 80px;
  font-weight: 200;
  text-align: center;
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
  top: -140px;
  width: 100%;
`;

const StyledSection = styled.section`
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2), 0 25px 50px 0 rgba(0,0,0,.1);
  margin: 130px 0 40px;
  position: relative;
`;



export default function App() {
  const [dados, setDados] = useState<Dados[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    obterTodos()
      .then((data) => {
        console.log(data)
        setDados(data);
        setCarregando(false);
      })
      .catch((error) => {
        setCarregando(false);
        // Lidar com erros
        console.error("Erro ao carregar dados:", error);
      });
  }, []);

  return (
    <StyledContainer>
      <StyledH1>Todos</StyledH1>
      <StyledSection>
      {carregando && <p>Carregando...</p>}

      {!carregando && (
        <ul>
          {dados.map((item) => (
            <li key={item.id}>ID : {item.id} <br /> title : {item.title}</li>
          ))}
        </ul>
      )}
      </StyledSection>
    </StyledContainer>
  );
}