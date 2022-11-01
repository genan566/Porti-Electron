import React from 'react'
import {AiOutlineHome} from "react-icons/ai";
import {AiOutlineUser} from "react-icons/ai";
import {BiBook, BiMessageSquareDetail} from "react-icons/bi";
import {RiServiceLine} from "react-icons/ri";
import "./nav.css";

import { useState } from 'react';

const Nav = () => {
  const [isActive,setIsActive] = useState("#");
  return (
    <nav>
      <a href="#"  onClick={() => setIsActive("#")}  className={isActive == "#" ? "active" : ""}><AiOutlineHome/></a>
      <a href="#about" onClick={() => setIsActive("#about")} className={isActive == "#about" ? "active" : ""}><AiOutlineUser/></a>
      <a href="#experience"  onClick={() => setIsActive("#experience")}  className={isActive == "#experience" ? "active" : ""}><BiBook/></a>
      <a href="#services"  onClick={() => setIsActive("#services")}   className={isActive == "#services" ? "active" : ""}><RiServiceLine/></a>
      <a href="#contact"  onClick={() => setIsActive("#contact")}    className={isActive == "#contact" ? "active" : ""}><BiMessageSquareDetail/></a>
    </nav>
  )
}

export default Nav;