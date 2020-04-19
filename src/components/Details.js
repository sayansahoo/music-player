import React from "react";
import styled from "styled-components";

const StyledMainContainer = styled.div`
  display: flex;
  min-height: 243px;
  flex-direction: column;
`;

const Details = (props) => {
  const { listeners, likes, uploadedOn } = props;
  return (
    <StyledMainContainer>
      <div style={{ marginBottom: "70px", marginTop: "10px" }}>
        {likes} likes
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>{listeners} listeners</div> <br />
        <div>uploaded on {uploadedOn} </div>
      </div>
    </StyledMainContainer>
  );
};

export default Details;
