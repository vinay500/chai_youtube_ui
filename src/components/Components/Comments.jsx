// import React,{ useEffect, useState } from "react";
// import styled from "styled-components";
// import Comment from "./Comment";
// import { BACKEND_API }  from '../utils/Constants';
// import { Cookies, withCookies, useCookies } from 'react-cookie';



// const Container = styled.div``;

// const NewComment = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// `;

// const Avatar = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
// `;

// const Input = styled.input`
//   border: none;
//   border-bottom: 1px solid ${({ theme }) => theme.soft};
//   color: ${({ theme }) => theme.text};
//   background-color: transparent;
//   outline: none;
//   padding: 5px;
//   width: 100%;
// `;

// const CommentDiv = styled.div`
//   display: flex;
//   justify-content: space-end;
// `;

// const CommentDivButtons = styled.button`
//   border: 1px solid grey;
//   padding: 5px 10px;
//   &:hover{
//     cursor: pointer;
//   }
//   `;

// // const div = styled.div`
// //   display: block;
// // `;


// const Comments = () => {

//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);

//   const cookies = new Cookies();

//   const accessToken = cookies.get("accessTokenCookie");

//   const headers = {
//     "Content-type": "Application/json",
//     "Authorization": `Bearer ${accessToken}`
//   }

//   useEffect(()=>{
//     async function getVideoComments(){
//           const accessTokenCookie = cookies.get('accessTokenCookie');
//           const refreshTokenCookie = cookies.get('refreshTokenCookie');
//           console.log("accessTokenCookie: ",accessTokenCookie)
    
//           const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessTokenCookie}`
//           }
//           console.log("headers: ",headers)
//           await fetch(`${BACKEND_API}/comments/66a90da5688251504a7dcab7?page=1`,{ headers })
//           .then((res)=>{
//             console.log("res: ",res)
//             // console.log("res.json(): ",res.json())
//             return res.json()
//           })
//           .then((data)=>{
//             console.log("docs: ",data.data.docs);
//             console.log("data.data: ",data.data);
//             setComments(data.data.docs);
//             console.log("comments state variable: ",comments);
//           })
//           .catch((error)=>{
//             console.log("can't fetch comments")
//             console.log("error: ",error)
//           })
//         }
//         getVideoComments();
//   },[])


//   const handleComment = async () => {

//     const body = {"content": comment}

//     const res = await fetch(`${BACKEND_API}/comments/664f72cb639a450c087e782a`,{
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(body)
//     });
//     console.log("res: ",res);
//     const data = await res.json();
//     console.log("data: ",data);
//     if(data.statusCode === 200){
//       console.log("comment added successfully");
//     }else{
//       console.log("comment addition failed");
//     }
//   }
  

//   return (
//     <Container>
//       <NewComment>
//         <div style={{"display":"flex", "justify-content":"start", "width": "100%", "gap": "15px"}}>
//           <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
//           <Input placeholder="Add a comment..." value={comment} 
//             onChange={(e)=>{
//               setComment(e.target.value);
//               console.log("comment: ",comment);
//             }}
//           />
//         </div>
//         <CommentDiv style={{"display":"flex", "justify-content":"end", "width": "100%", "gap": "15px"}}>
//           <CommentDivButtons value="Cancel">Cancel</CommentDivButtons>
//           <CommentDivButtons value="Comment" onClick={handleComment}>Comment</CommentDivButtons>
//         </CommentDiv>
//       </NewComment>
//       {/* {comments} */}
//       {console.log("comments: ",comments)}
//       {/* {comments.map((comment)=>{
//           <Comment person={{
//             _id: "66a90dd8688251504a7dcabb",
//             content: "comment on video: 66a90da5688251504a7dcab7",
//             video: "66a90da5688251504a7dcab7",
//             owner: "66a28d484ac26491e3533d2a",
//             createdAt: "2024-07-30T15:59:20.580Z",
//             updatedAt: "2024-07-30T15:59:20.580Z",
//             __v: 0
//         }}/>
//           console.log("comment in comments: ",comment)
//         })} */}
//       {/* {comments.length != 0 && 
//         comments.map((comment)=>{
//           <Comment commentData={comment}/>
//         })
//       } */}
//       <Comment person={{comments}}/>
//       <Comment/>
//       <Comment/>
//       <Comment/>
//       <Comment/>
//       <Comment/>
//       <Comment/>
//     </Container>
//   );
// };

// export default Comments;





import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "../Comment/Comment";
import { BACKEND_API } from '../../utils/Constants';
import { Cookies } from 'react-cookie';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: end;
  gap: 10px;
`;

const CommentDivButtons = styled.button`
  border: 1px solid grey;
  padding: 5px 10px;
  &:hover{
    cursor: pointer;
  }
`;

const Comments = ({video}) => {
  console.log("video id: ",video._id)
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const cookies = new Cookies();
  const accessToken = cookies.get("accessTokenCookie");

  const headers = {
    "Content-type": "Application/json",
    "Authorization": `Bearer ${accessToken}`
  };

  async function getVideoComments() {
    console.log("get video comments")
    const res = await fetch(`${BACKEND_API}/comments/${video._id}?page=1`, { headers });
    const data = await res.json();
    setComments(data.data.docs);
    console.log("comments: ",comments)
  }

  useEffect(() => {
    getVideoComments();
  }, []);

  const handleComment = async () => {
    console.log("adding a comment: ")
    const body = { "content": comment };
    const res = await fetch(`${BACKEND_API}/comments/${video._id}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.statusCode === 200) {
      setComment(""); // Clear the input field after successful addition
      // Optionally, you might want to refresh the comments list
      await getVideoComments();
    }
  };

  return (
    <Container>
      <NewComment>
        <div style={{ display: "flex", justifyContent: "start", width: "100%", gap: "15px" }}>
          <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
          <Input 
            placeholder="Add a comment..." 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <CommentDiv>
          <CommentDivButtons onClick={() => setComment("")}>Cancel</CommentDivButtons>
          <CommentDivButtons onClick={handleComment}>Comment</CommentDivButtons>
        </CommentDiv>
      </NewComment>
      {console.log("comments length: ",comments.length)}
      {comments.map((comment) => (
        <Comment key={comment._id} commentData={comment} video={video} getVideoComments={getVideoComments}/>
      ))}
    </Container>
  );
};

export default Comments;
