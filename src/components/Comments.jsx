import React,{ useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { BACKEND_API }  from '../utils/Constants';
import { Cookies, withCookies, useCookies } from 'react-cookie';



const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const CommentDiv = styled.div`
  display: flex;
  justify-content: space-end;
`;

const CommentDivButtons = styled.button`
  border: 1px solid grey;
  padding: 5px 10px;
  &:hover{
    cursor: pointer;
  }
  `;

// const div = styled.div`
//   display: block;
// `;


const Comments = () => {

  const [comment, setComment] = useState("");

  const cookies = new Cookies();

  const accessToken = cookies.get("accessTokenCookie");

  const headers = {
    "Content-type": "Application/json",
    "Authorization": `Bearer ${accessToken}`
  }


  const handleComment = async () => {

    const body = {"content": comment}

    const res = await fetch(`${BACKEND_API}/comments/664f72cb639a450c087e782a`,{
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    console.log("res: ",res);
    const data = await res.json();
    console.log("data: ",data);
    if(data.statusCode === 200){
      console.log("comment added successfully");
    }else{
      console.log("comment addition failed");
    }
  }
  

  return (
    <Container>
      <NewComment>
        <div style={{"display":"flex", "justify-content":"start", "width": "100%", "gap": "15px"}}>
          <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
          <Input placeholder="Add a comment..." value={comment} 
            onChange={(e)=>{
              setComment(e.target.value);
              console.log("comment: ",comment);
            }}
          />
        </div>
        <CommentDiv style={{"display":"flex", "justify-content":"end", "width": "100%", "gap": "15px"}}>
          <CommentDivButtons value="Cancel">Cancel</CommentDivButtons>
          <CommentDivButtons value="Comment" onClick={handleComment}>Comment</CommentDivButtons>
        </CommentDiv>
      </NewComment>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
    </Container>
  );
};

export default Comments;
