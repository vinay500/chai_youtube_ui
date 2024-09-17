import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import axios from 'axios';
import { BACKEND_API }  from '../utils/Constants';
import { Cookies, useCookies } from 'react-cookie';
import headers from "../utils/getAccessToken.js";
// console.log("Headers: ",Headers);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {

  const [videos, setVideos] = useState([]);

  useEffect(async ()=>{

    console.log("Headers: ",headers)
    
    // Query parameters to be included in the URL
    const queryParams = new URLSearchParams({
      page: 1,      
      limit: 10,     
      query: '',    
      sortBy: 'title',  
      sortType: 'asc',  
    }).toString();
    await fetch(`${BACKEND_API}/videos?${queryParams}`,{ headers })
    .then((res)=>{
      console.log("res: ",res);
      return res.json()
    })
    .then((data)=>{
      console.log("data: ",data)
      console.log("data.data.docs: ",data.data.docs)
      setVideos(data.data.docs)
    })
    .catch((error)=>{
      console.log("error: ",error);
    })
  },[])

  return (
    <Container>
      { console.log("videos: ",videos) }
      {
        videos.map((video)=>(
          <Card videoDetails = {video} />
        ))
      }
      {/* <Card />
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
      <Card /> */}
    </Container>
  );
};

export default Home;
