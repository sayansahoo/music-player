import React, { Component } from "react";
import Audio from "./Audio";
import Menu from "./Menu";
import { Card, List, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faEllipsisV,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

class Music extends Component {
  state = {
    currentlyPlaying: "",
    isPlaying: false,
    showMenu: false,
  };

  music = [
    {
      title: "Burn It Down",
      count: 12345,
    },
    {
      title: "Castle of Glass",
      count: 12111,
    },
    {
      title: "New Divide (A Capella)",
      count: 32451,
    },
    {
      title: "Numb/ Encore",
      count: 36783,
    },
  ];

  playSong = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  setCurrentTrack = (e, item) => {
    this.setState({ currentlyPlaying: item, isPlaying: true });
  };

  showMore = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    let { music, currentlyPlaying, isPlaying, showMenu } = this.state;
    console.log(isPlaying);
    return (
      <div>
        <Card title="Music Player" style={{ width: 300 }}>
          <List
            itemLayout="horizontal"
            dataSource={this.music}
            style={{ cursor: "pointer" }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      onClick={(e) => this.setCurrentTrack(e, item.title)}
                      src={require("../assets/img1.jpg")}
                    />
                  }
                  title={
                    <p onClick={(e) => this.setCurrentTrack(e, item.title)}>
                      {item.title}
                    </p>
                  }
                />
                <span onClick={this.showMore}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </span>
              </List.Item>
            )}
          >
            {" "}
            {showMenu && <Menu />}
          </List>
          <div style={{ display: "flex", justifyContent: "right" }}></div>
          <Audio
            music={music}
            playSong={this.playSong}
            isPlaying={isPlaying}
            currentlyPlaying={currentlyPlaying}
          />
        </Card>
      </div>
    );
  }
}
export default Music;
