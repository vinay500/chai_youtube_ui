import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from 'axios';
import { BACKEND_API }  from '../utils/Constants';



const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {

  const [videos, setVideos] = useState([]);

  useEffect(()=>{
    const api_params = { "sortBy":"createdAt","sortType":"asc","query":"video",}
    axios.post(`${BACKEND_API}/videos`,api_params)
    .then((data)=>{
      console.log("data: ",data);
      
    })
    .catch((error)=>{
      console.log("error: ",error);
    })
  },[])

  return (
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  );
};

export default Home;
