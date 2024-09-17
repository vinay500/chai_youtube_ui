import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;


function timeSinceUpload(updatedAt) {
  const uploadDate = new Date(updatedAt);
  const now = new Date();
  const diffInMs = now - uploadDate;
  
  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  const msInWeek = 7 * msInDay;
  const msInMonth = 30 * msInDay; // Approximate month duration
  const msInYear = 365 * msInDay; // Approximate year duration

  if (diffInMs < msInMinute) {
      const seconds = Math.floor(diffInMs / 1000);
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (diffInMs < msInHour) {
      const minutes = Math.floor(diffInMs / msInMinute);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInMs < msInDay) {
      const hours = Math.floor(diffInMs / msInHour);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (diffInMs < msInWeek) {
      const days = Math.floor(diffInMs / msInDay);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (diffInMs < msInMonth) {
      const weeks = Math.floor(diffInMs / msInWeek);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (diffInMs < msInYear) {
      const months = Math.floor(diffInMs / msInMonth);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
      const years = Math.floor(diffInMs / msInYear);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}


const Card = ({type, videoDetails}) => {
  console.log("videoDetails in card: ",videoDetails)
  return (
    // <Link to="/video/test" style={{ textDecoration: "none" }}>
    //   <Container type={type}>
    //     <Image
    //       type={type}
    //       src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"
    //     />
    //     <Details type={type}>
    //       <ChannelImage
    //         type={type}
    //         src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"
    //       />
    //       <Texts>
    //         <Title>Test Video</Title>
    //         <ChannelName>Lama Dev</ChannelName>
    //         <Info>660,908 views • 1 day ago</Info>
    //       </Texts>
    //     </Details>
    //   </Container>
    // </Link>

    
    <Link to="/video" style={{ textDecoration: "none" }}>
      {/* { console.log("videoDetails: ",videoDetails) } */}
      <Container type={type}>
        <Image
          type={type}
          // src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"
          src={videoDetails.thumbnail}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"
          />
          <Texts>
            <Title>{videoDetails.title}</Title>
            <ChannelName>Lama Dev</ChannelName>
            <Info>{videoDetails.views} views • {timeSinceUpload(videoDetails.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
