import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Progress, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlay,
  faShare,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

class Audio extends Component {
  state = {
    playedSeconds: 0,
    progressPercent: 0,
    totalDuration: 0
  };
  progressChange = (e) => {
    let playedSeconds = e.playedSeconds;
    let progressPercent = Math.round((e.playedSeconds / this.state.totalDuration) * 100);
    this.setState({ playedSeconds, progressPercent });
  };

  returnPath = (val) => {
    let result = require("../assets/L1.mp3");
    if (val === "Burn It Down") {
      result = require("../assets/L1.mp3");
    }
    if (val === "Castle of Glass") {
      result = require("../assets/L2.mp3");
    }
    if (val === "New Divide (A Capella)") {
      result = require("../assets/L3.mp3");
    }
    if (val === "Numb/ Encore") {
      result = require("../assets/L4.mp3");
    }
    return result;
  };

  onClickProgress = () => console.log(this.state.playedSeconds);
  onDuration = e => this.setState({totalDuration: e})

  render() {
    const { playedSeconds, progressPercent } = this.state;
    const { playSong, isPlaying, currentlyPlaying } = this.props;
    console.log(this.state.progressPercent)
    return (
      <div>
        <Progress
          onClick={this.onClickProgress}
          showInfo={false}
          percent={progressPercent}
          strokeColor="orange"
        />
        <ReactPlayer
          url={this.returnPath(currentlyPlaying)}
          playing = {isPlaying ? true: false}
          controls
          height={"auto"}
          width={"auto"}
          onProgress={this.progressChange}
          onDuration={this.onDuration}
        />
        <StyledButtons>
          <span>
            <FontAwesomeIcon size={"lg"} icon={faHeart} color="red" />
          </span>
          <span onClick={playSong}>
            {isPlaying ? (
              <FontAwesomeIcon size={"lg"} icon={faPause} />
            ) : (
              <FontAwesomeIcon size={"lg"} icon={faPlay} />
            )}
          </span>
          <span>
            <FontAwesomeIcon size={"lg"} icon={faShare} color="blue" />
          </span>
        </StyledButtons>
      </div>
    );
  }
}

export default Audio;
