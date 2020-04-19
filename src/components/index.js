import React, { Component } from "react";
import Audio from "./Audio";
import Menu from "./Menu";
import { Card, List, Avatar, Progress, Modal, Popover } from "antd";
import Details from "./Details";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const StyledTopContainer = styled.div``;

class Music extends Component {
  state = {
    currentlyPlaying: "Burn It Down",
    isPlaying: false,
    showMenu: false,
    isLiked: false,
    minimize: true,
    listeners: 12345,
    likes: 110,
    currentIdx: 0,
    percent: 0,
    shouldShareUrl: false,
    uploadedOn: "10 / 2 / 2016",
  };

  audio = React.createRef();
  music = [
    {
      title: "Burn It Down",
      count: 12345,
      likes: 110,
      id: 0,
      likedByMe: false,
      uploadedOn: "10 / 2 / 2016",
    },
    {
      title: "Castle of Glass",
      count: 12111,
      likes: 102,
      id: 1,
      likedByMe: false,
      uploadedOn: "10 / 3 / 2016",
    },
    {
      title: "New Divide (A Capella)",
      count: 32451,
      likes: 122,
      id: 2,
      likedByMe: false,
      uploadedOn: "10 / 23 / 2016",
    },
    {
      title: "Numb/ Encore",
      count: 36783,
      likes: 201,
      id: 3,
      likedByMe: false,
      uploadedOn: "10 / 12 / 2016",
    },
  ];

  pauseSong = (e) => {
    e && e.stopPropagation();
    this.setState({ isPlaying: false });
  };

  playSong = (e) => {
    e && e.stopPropagation();
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  setCurrentTrack = (e, item) => {
    this.setState({
      currentlyPlaying: item.title,
      currentIdx: item.id,
      isPlaying: true,
      listeners: item.count,
      likes: item.likes,
      isLiked: item.likedByMe,
      uploadedOn: item.uploadedOn,
    });
  };

  showMore = (e) => {
    e && e.stopPropagation();
    this.setState({ showMenu: !this.state.showMenu });
  };

  likeSong = (e, currentSong) => {
    e.stopPropagation();
    let idx = this.music.findIndex((a) => a.title === currentSong);
    this.music[idx].likedByMe = !this.state.isLiked;
    this.setState({ isLiked: this.music[idx].likedByMe });
  };

  showComponent = (e) => {
    e.stopPropagation();
    this.setState({ minimize: !this.state.minimize });
  };

  playNext = (currentSong) => {
    const idx = this.music.findIndex((a) => a.title === currentSong);
    let nextSong = this.music[idx + 1];
    if (idx === this.music.length - 1) {
      nextSong = this.music[0];
    }

    this.setState({
      currentlyPlaying: nextSong.title,
      currentIdx: nextSong.id,
      listeners: nextSong.listeners,
      likes: nextSong.likes,
      uploadedOn: nextSong.uploadedOn,
    });
  };

  updateProgressPercentage = (value) => {
    this.setState({ percent: value });
  };

  shareUrl = (e) => {
    e.stopPropagation();
    this.setState({ shouldShareUrl: true });
  };

  hideModal = () => {
    this.setState({ shouldShareUrl: false });
  };

  render() {
    let {
      music,
      currentlyPlaying,
      isPlaying,
      showMenu,
      isLiked,
      minimize,
      listeners,
      likes,
      uploadedOn,
    } = this.state;
   
    return (
      <Router>
        <Card title="Music Player" style={{ width: 300 }}>
          {minimize && (
            <StyledTopContainer>
              <List
                itemLayout="horizontal"
                dataSource={this.music}
                style={{ cursor: "pointer" }}
                renderItem={(item, idx) => (
                  <List.Item
                    onClick={(e) => {
                      idx !== this.state.currentIdx &&
                        this.setState({ percent: 0 });
                      this.setCurrentTrack(e, item);
                    }}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={require("../assets/img1.jpg")} />}
                      title={<p>{item.title}</p>}
                    />
                    <span style={{ marginRight: "10px" }}>
                      {idx === this.state.currentIdx &&
                        this.state.percent !== 100 &&
                        this.state.percent > 0 && (
                          <Progress
                            type="circle"
                            percent={this.state.percent}
                            width={30}
                            status="active"
                          />
                        )}
                    </span>
                    {idx === this.state.currentIdx && (
                      <span>
                        <Menu
                          isLiked={isLiked}
                          likeSong={this.likeSong}
                          currentlyPlaying={currentlyPlaying}
                          showComponent={this.showComponent}
                        />
                      </span>
                    )}
                  </List.Item>
                )}
              >
                {" "}
                {showMenu && <Menu />}
              </List>
              <div style={{ display: "flex", justifyContent: "right" }}></div>
            </StyledTopContainer>
          )}
          <Audio
            music={music}
            playSong={this.playSong}
            isPlaying={isPlaying}
            currentlyPlaying={currentlyPlaying}
            likeSong={this.likeSong}
            isLiked={isLiked}
            showComponent={this.showComponent}
            ref={this.audio}
            pauseSong={this.pauseSong}
            playNext={this.playNext}
            updateProgressPercentage={this.updateProgressPercentage}
            share={this.shareUrl}
          />
          {!minimize && (
            <Details
              uploadedOn={uploadedOn}
              minimize={minimize}
              listeners={listeners}
              likes={likes}
            />
          )}
        </Card>
      </Router>
    );
  }
}
export default Music;
