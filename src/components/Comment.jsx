import React,{ useState } from "react";
import styled from "styled-components";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Cookies } from 'react-cookie';
import { BACKEND_API } from "../utils/Constants";


const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;



const Comment = () => {

  const [ comment, setComment ] = useState("comment content added from Comment Component");
  const [displayCommentEditBtn ,setDisplayCommentEditBtn] = useState(false);

  const displayEditButton = () => {
    console.log("in displayEditButton")
    console.log("displayCommentEditBtn :",displayCommentEditBtn)
    setDisplayCommentEditBtn((prevValue)=>!prevValue)
  }

  const cookie = new Cookies();

  const accessToken = cookie.get("accessTokenCookie");

  const headers = {
    "content": "Application/json",
    "authorization": `Bearer ${accessToken}` 
  }

  const updateComment = async ()=>{

    const body = { "content": comment}

    const res = await fetch(`${BACKEND_API}/comments/c/6641fd8fe133ec83bd010185`,{
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body)
    })
    console.log("res: ",res);
    const data = await res.json();

    console.log("data: ",data);

  }

  const deleteComment = async ()=>{

    const body = { "content": comment}

    const res = await fetch(`${BACKEND_API}/comments/c/66913e04de4dd2d71801c4fd`,{
      method: "DELETE",
      headers: headers,
    })
    console.log("res: ",res);
    const data = await res.json();

    console.log("data: ",data);

  }


  return (
    <Container>
      <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
      <Details>
        <Name>
          John Doe <Date>1 day ago</Date>
        </Name>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, ex
          laboriosam ipsam aliquam voluptatem perferendis provident modi, sequi
          tempore reiciendis quod, optio ullam cumque? Quidem numquam sint
          mollitia totam reiciendis?
        </Text>
      </Details>
      <div style={{display: "flex", justifyContent: "start", flexDirection: "column", alignItems: "center", width:"25px", height:"110px"}}>
        <MoreVertIcon style={{ color: 'white' }} onClick={displayEditButton}/>
        { displayCommentEditBtn ? 
          <div style={{width:"50px", height:"20px"}}>
            <button style={{width:"100%"}} onClick={updateComment}>Edit</button>
            <button style={{width:"100%"}} onClick={deleteComment}>Delete</button>
          </div> : ""
        }
      </div>
      
      {/* <div>

      </div> */}
    </Container>
  );
};

export default Comment;
