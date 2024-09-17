import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { BACKEND_API }  from '../utils/Constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateLogInInfo } from "../redux/slices/logInInfo.js"




const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [ loginDetails, setLoginDetails ] = useState({"email":"","password":""})
  const [accessTokenCookie, setAccessTokenCookie] = useCookies(['accessTokenCookie']);
  const [refreshTokenCookie, setRefreshTokenCookie] = useCookies(['refreshTokenCookie']);

  const navigate = useNavigate();
  const username = useSelector((state) => state.logInInfo.logInInfo)
  console.log("username: ",username)
  const dispatch = useDispatch()

  const handleLogin = (e) => {

    e.preventDefault();
    console.log("login details: ",loginDetails);
    const params = {
      "email": loginDetails.email,
      "password": loginDetails.password
    }
    console.log("params: ",params)
    axios.post(`${BACKEND_API}/users/login`, params)
    .then((response)=>{
      console.log("response: ",response);
      console.log("response.data.data: ", response.data.data);
      console.log("response.data.data.accessToken: ",response.data.data.accessToken);
      
      let intHours = 1;
      let expiryTime = new Date((intHours * 60) * 60 * 1000 + new Date());
      
      setAccessTokenCookie('accessTokenCookie', response.data.data.accessToken, [{"expires": expiryTime}]);
      setRefreshTokenCookie('refreshTokenCookie', response.data.data.accessToken, [{"expires": expiryTime}]);
      

      dispatch(updateLogInInfo({ "isUserLoggedIn": true, "username": response.data.data.user}))
      navigate("/", { replace: true });
    })
    .catch((error)=>{
      console.log("error: ",error);
    })
  }

  const updateEmail = (updatedEmail)=>{
    console.log("in updatedEmail");
    setLoginDetails((prevLoginDetails)=>({
      ...prevLoginDetails,
      "email": updatedEmail,
    }))
  }

  const updatePassword = (updatedPassword)=>{
    console.log("in updatedPassword");
    setLoginDetails((prevLoginDetails)=>({
      ...prevLoginDetails,
      "password": updatedPassword
    }))
  }

  // {console.log("email: ",loginDetails.email)}

  return(
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <form>
          <Input placeholder="email" value={loginDetails.email} onChange={(e)=>{updateEmail(e.target.value)}}/>
          <Input type="password" placeholder="password" value={loginDetails.password} onChange={(e)=>{updatePassword(e.target.value)}}/>
          {/* dont invoke the function using onClick */}
          <Button onClick={handleLogin} type="submit">Sign in</Button>
        </form>
        
        <Title>or</Title>
        <Input placeholder="username" />
        <Input placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button type="submit">Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
