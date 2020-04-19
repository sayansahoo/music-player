import React from "react";
import styled from "styled-components";
import { Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ShareComponent from "./ShareComponent";


const content = (props) => {
  const { likeSong, currentlyPlaying, isLiked, showComponent } = props;
  return (
    <div style={{ cursor: "pointer" }}>
      <Popover content={ShareComponent}>
        <p>Share</p>
      </Popover>
      <p onClick={(e) => likeSong(e, currentlyPlaying)}>
        {!isLiked ? "Like" : "Unlike"}
      </p>
      <p onClick={showComponent}>Details</p>
    </div>
  );
};

const Menu = (props) => {
  const onClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div>
      <Popover content={content(props)} placement="left" trigger="click">
        <FontAwesomeIcon icon={faEllipsisV} onClick={(e) => onClick(e)} />
      </Popover>
    </div>
  );
};

export default Menu;
