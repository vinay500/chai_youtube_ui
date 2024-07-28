import React, { useEffect, useState } from "react";
import styled from "styled-components";
// unfilled icon
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// filled icon
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import axios from 'axios';
import { BACKEND_API }  from '../utils/Constants';
import { Cookies, withCookies, useCookies } from 'react-cookie';
// import cookies from 'react-cookie';



const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;


// Sample Video Object
// {
//   "_id": "663b46320646e041febb075f",
//   "videoFile": "http://res.cloudinary.com/ddenr3vgm/video/upload/v1715160622/dxpwg1hyb9ssouintugz.mp4",
//   "thumbnail": "http://res.cloudinary.com/ddenr3vgm/image/upload/v1715160626/pmnl4e6vh3myseuk1wxh.png",
//   "title": "video title ",
//   "description": " video desc",
//   "duration": 14.143333,
//   "views": 127,
//   "isPublished": false,
//   "owner": "6629ed9368b6a746e03b84e6",
//   "createdAt": "2024-05-08T09:30:26.808Z",
//   "updatedAt": "2024-07-10T16:17:39.266Z",
//   "__v": 0
// }

// Sample 


const Video = () => {
  const videoID = "663b46320646e041febb075f"
  console.log("in video.jsx")
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState({});
  const [videoLike, setVideoLike] = useState(false);


  const [ setCookie, removeCookie] = useCookies(["accessTokenCookie"]);
  const cookies = new Cookies();

  // useEffect( ()=>{
  //   async function getVideo(){
  //     const accessTokenCookie = cookies.get('accessTokenCookie');
  //     const refreshTokenCookie = cookies.get('refreshTokenCookie');
  //     console.log("accessTokenCookie: ",accessTokenCookie)

  //     const headers = {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${accessTokenCookie}`
  //     }
  //     console.log("headers: ",headers)
  //     await fetch(`${BACKEND_API}/videos/663b46320646e041febb075f`,{ headers })
  //     .then((res)=>{
  //       console.log("res: ",res)
  //       // console.log("res.json(): ",res.json())
  //       return res.json()
  //     })
  //     .then((data)=>{
  //       console.log("videoFile: ",data.data.videoFile);
  //       console.log("data.data: ",data.data);
  //       setVideoData(data.data);
  //       // setVideoUrl(data.data.videoFile);
  //       // setVideoUrl(videoData.videoFile);
  //       console.log("videoUrl: ",videoUrl);
  //       console.log("videoData: ",videoData);
  //     })
  //     .catch((error)=>{
  //       console.log("can't get video, got an error")
  //       console.log("error: ",error)
  //     })
  //   }
  //   getVideo()
  // },[])


  const likeTheVideo = async () => {
    console.log("in likeTheVideo");
    const accessTokenCookie = cookies.get('accessTokenCookie');
    const refreshTokenCookie = cookies.get('refreshTokenCookie');
    console.log("accessTokenCookie: ",accessTokenCookie)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessTokenCookie}`
    }
    console.log("headers: ",headers)
    const res = await fetch(`${BACKEND_API}/likes/toggle/v/663b46320646e041febb075f`, { 
       method: "POST",
      headers: headers 
    })
    const data = await res.json();
    console.log("data: ",data);
    console.log("data.message: ",data.message);
    if(data.message === "Video Licked Successfully"){
      console.log("video liked");
      setVideoLike(true);
    }else if(data.message === "Video Unlicked Successfully"){
      console.log("video unliked");
      setVideoLike(false);
    }
  }

  function formatDate(dateString) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src={videoData?.videoFile ? videoData?.videoFile : "https://www.youtube.com/embed/k3Vfj-e1Ma4"}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>{videoData ? videoData.title : "Test Video changed"}</Title>
        <Details>
          <Info>{videoData ? videoData.views + " views" : " "} • {videoData ? formatDate(videoData.createdAt) : ""}</Info>
          <Buttons>
            <Button>
              {videoLike ? <ThumbUpIcon onClick={likeTheVideo}/> : <ThumbUpOutlinedIcon onClick={likeTheVideo}/>} 123
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
            <ChannelDetail>
              <ChannelName>Lama Dev</ChannelName>
              <ChannelCounter>200K subscribers</ChannelCounter>
              <Description>
                {videoData ? videoData.description : ""}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        <Comments/>
      </Content>
      <Recommendation>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendation>
    </Container>
  );
};

export default Video;
