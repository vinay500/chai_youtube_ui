import React, { useState } from "react";
import styled from "styled-components";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Cookies } from 'react-cookie';
import { BACKEND_API } from "../../utils/Constants";

// filled icon
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// unfilled icon
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// filled icon
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// unfilled icon
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import './Comment.css';


const Comment = ({ commentData, video, getVideoComments }) => {
  // console.log("content: ",commentData);
  // console.log("comment id: ",commentData._id);
  const [comment, setComment] = useState(commentData.content);
  const [displayCommentEditBtn, setDisplayCommentEditBtn] = useState(false);
  const [commentLike, setCommentLike] = useState(false);
  const [updateComment, setUpdateComment] = useState(commentData.content ? commentData.content : "");
  const [editingComment, setEditingComment] = useState(false);
  const [dislikeComment, setDislikeComment] = useState(false);

  const displayEditButton = () => {
    setDisplayCommentEditBtn((prevValue) => !prevValue);
  };

  const cookie = new Cookies();
  const accessToken = cookie.get("accessTokenCookie");

  const headers = {
    "Content-Type": "Application/json",
    "Authorization": `Bearer ${accessToken}`
  };

  const editComment = async () => {
    const body = { "content": comment };
    const res = await fetch(`${BACKEND_API}/comments/c/${commentData._id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log("Update response:", data);
  };

  const deleteComment = async () => {
    console.log("deleting the comment")
    const res = await fetch(`${BACKEND_API}/comments/c/${commentData._id}`, {
      method: "DELETE",
      headers: headers,
    });
    const data = await res.json();
    console.log("Delete response:", data);
  };

  const likeTheComment = async ()=>{
    console.log("liking the comment")
    const res = await fetch(`${BACKEND_API}/likes/toggle/c/${commentData._id}`, {
      method: "POST",
      headers: headers
    }).then((res)=>{
      // // const res_json = res.json()
      // console.log("res.json(): ",res.json())
      return res.json()
    }).then((res_data)=>{
      console.log("res_data: ",res_data)
      console.log("res_data: ",res_data.message, " res_data.data: ",res_data.data)
      if(res_data.message == "Comment Licked Succesfully"){

        setCommentLike(true);
        console.log("comment liked: ",commentLike);
      }else if(res_data.message == "Comment Unlicked Succesfully"){
        setCommentLike(false);
        console.log("comment unliked: ",commentLike);
      }
    }).catch((error)=>{
      console.log("error while liking the comment: ",error)
    })
  }


  const dislikingComment = async () => {
    console.log("disliking comment")
    console.log("comment id: ",commentData._id)
    const res = await fetch(`${BACKEND_API}/dislike/c/${commentData._id}`, {
      method: "POST",
      headers: headers
    }).then((res)=>{
      // // const res_json = res.json()
      // console.log("res.json(): ",res.json())
      return res.json()
    }).then((res_data)=>{
      console.log("res_data: ",res_data)
      console.log("res_data: ",res_data.message, " res_data.data: ",res_data.data)
      if(res_data.message == "Comment Disliked Successfully"){
        setDislikeComment(true);
        console.log("comment dislike: ",dislikeComment);
      }else if(res_data.message == "Comment Disliked Removed Successfully"){
        setDislikeComment(false);
        console.log("comment dislike removed: ",dislikeComment);
      }
    }).catch((error)=>{
      console.log("error while disliking the comment: ",error)
    })
  }

  const handleComment = async () => {
    console.log("adding a comment: ")
    const body = { "content": updateComment };
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

  const makeCommentEditable = () => {
    setEditingComment(true);
    setDisplayCommentEditBtn((prevValue) => !prevValue);
  }
  console.log("comment: ",comment)
  console.log("comment id: ",commentData._id)
  return (
    <div className="container">
      {editingComment ? 
        <div className="edit_container">
          <div style={{ display: "flex", justifyContent: "start", width: "100%", gap: "15px" }}>
          <img  src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" alt="Avatar" className="avatar" />
            <input placeholder="Add a comment..." value={comment} 
              onChange={(e) => setComment(e.target.value)} className="comment_input"/>
          </div>
          <div className="comment_div">
            <button className="comment_div_buttons" onClick={() => setEditingComment(false)}>Cancel</button>
            <button className="comment_div_buttons" onClick={editComment}>Comment</button>
          </div>
        </div> 
      : 
        <div className="view_container">
          <img  src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" alt="Avatar" className="avatar" />
          <div className="details">
            <span className="name">
              {commentData.owner ? commentData.owner : 'Unknown'}
            </span>
            <span className="text">
              {commentData.content}
            </span>
            <div className="like_div">
              <div className="like_btn">
                {commentLike ? <ThumbUpIcon onClick={likeTheComment}/> : <ThumbUpOutlinedIcon onClick={likeTheComment}/>} 123
              </div>
              <div className="unlike_btn">
                {dislikeComment ? <ThumbDownAltIcon  onClick={dislikingComment}/> : <ThumbDownOffAltOutlinedIcon onClick={dislikingComment}/> }
              </div>
            </div>
          </div>
          <div className="edit-buttons">
            <button className="comment_option_button" onClick={displayEditButton}>
              <MoreVertIcon/>
            </button>
            {displayCommentEditBtn &&
              <>
                <button onClick={makeCommentEditable}>Edit</button>
                <button onClick={deleteComment}>Delete</button>
              </>
            }
          </div>
        </div>
      }
    </div>
  );
};

export default Comment;

