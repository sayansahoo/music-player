import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Progress, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faPlay,
  faShare,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import ShareComponent from "./ShareComponent";

const StyledAudioPlayer = styled.div``;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

class Audio extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {
      playedSeconds: 0,
      progressPercent: 0,
      totalDuration: 0,
    };
  }

  progressChange = (e) => {
    let playedSeconds = e.playedSeconds;
    let initialPercentage;
    initialPercentage = Math.round(
      (playedSeconds / this.state.totalDuration) * 100
    );
    this.setState({ playedSeconds, progressPercent: initialPercentage }, () => {
      this.state.progressPercent === 100 && this.props.pauseSong();
      this.props.updateProgressPercentage(this.state.progressPercent);
    });
  };

  onClickProgress = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.round((x / 250) * 100);
    let seconds = (percentage / 100) * this.state.totalDuration;
    this.setState({ progressPercent: percentage }, () => {
      this.player.current.seekTo(seconds);
    });
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

  onDuration = (e) => this.setState({ totalDuration: e });

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      if (this.state.progressPercent === 100 && prevProps.isPlaying === true) {
        this.props.playSong();
        this.props.playNext(this.props.currentlyPlaying);
      }
    }
  }
  render() {
    const { progressPercent } = this.state;
    const {
      playSong,
      isPlaying,
      currentlyPlaying,
      likeSong,
      isLiked,
      showComponent,
      playNext,
      share,
    } = this.props;
    return (
      <StyledAudioPlayer onClick={showComponent}>
        <Progress
          onClick={this.onClickProgress}
          showInfo={false}
          percent={progressPercent}
          strokeColor="orange"
        />
        <marquee>
          <div style={{ display: "flex", justifyContent: "center", cursor: 'pointer'}}>
            {currentlyPlaying}
          </div>
        </marquee>
        <ReactPlayer
          ref={this.player}
          id="player"
          url={this.returnPath(currentlyPlaying)}
          playing={isPlaying ? true : false}
          controls
          height={"auto"}
          width={"auto"}
          onProgress={this.progressChange}
          onDuration={this.onDuration}
        />
        <StyledButtons>
          <span onClick={(e)=>likeSong(e,currentlyPlaying)}>
            <FontAwesomeIcon
              size={"lg"}
              icon={isLiked ? solidHeart : faHeart}
              color="red"
            />
          </span>
          <span onClick={playSong}>
            {isPlaying ? (
              <FontAwesomeIcon size={"lg"} icon={faPause} />
            ) : (
              <FontAwesomeIcon size={"lg"} icon={faPlay} />
            )}
          </span>
          <span>
            <Popover content={ShareComponent} placement="left" trigger="click">
              <FontAwesomeIcon
                size={"lg"}
                icon={faShare}
                color="blue"
                onClick={(e) => e.stopPropagation()}
              />
            </Popover>
          </span>
        </StyledButtons>
      </StyledAudioPlayer>
    );
  }
}

export default Audio;
