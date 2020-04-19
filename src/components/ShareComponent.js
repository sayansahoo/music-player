import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

const ShareComponent = () => {
  const url = typeof window !== "undefined" && window.location.href;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FacebookShareButton
        onClick={(e) => e.stopPropagation()}
        url={url}
        alt="facebook"
      >
        <FontAwesomeIcon icon={faFacebook} />
      </FacebookShareButton>{" "}
      &nbsp; &nbsp;
      <TwitterShareButton
        onClick={(e) => e.stopPropagation()}
        url={url}
        alt="twitter"
        size={"lg"}
      >
        <FontAwesomeIcon icon={faTwitter} size={"lg"} />
      </TwitterShareButton>
    </div>
  );
};

export default ShareComponent;
