import React, { Component } from "react";
import { Card } from "react-bootstrap";
import listimg from "../../assets/listimg.png";
import defaultImg from "../../assets/default.png";
import { getQueryVariable } from "../NavCtrl";
import { SrcUrl } from "../BaseUrl";

//需要传入一个参数
// this.props.navData 导航数据

const setting = {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  mode: "cors",
  cache: "default",
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      noticeData: null,
      lowwerData: null,
      naviData: null,
    };
  }
  loadImg(url) {
    if (url !== null) {
      return url;
    } else {
      return defaultImg;
    }
  }

  getColumnLevel(data) {
    //根据导航栏数据，用id匹配
    // console.log(data)
    let title = "";
    // console.log(this.props.parentId)
    // console.log(data);
    // console.log(this.props.parentId);
    if (data)
      for (let i = 0; i < data.length; i++) {
        if (
          (data[i].type === "2" || data[i].type === 2) &&
          data[i].id.toString() === this.props.parentId
        ) {
          title = data[i].title;
        }
      }
    return title ? (
      <Card className="sidebar-card">
        <Card.Header className="sidebar-card-header">{title}</Card.Header>
        <div className="sidebar-nav">{this.listNav(data)}</div>
      </Card>
    ) : null;
  }

  getIndex(data) {
    if (data)
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].type === "2" &&
          data[i].id.toString() === this.props.parentId.toString()
        ) {
          return i;
        }
      }
  }

  listNav(data) {
    let navArray = [];
    let column = getQueryVariable("columnId");
    let index = this.getIndex(data, column);
    if (data[index]) {
      for (let i = 0; i < data[index].menuList.length; i++) {
        navArray.push(
          <Card.Text className="sidebar-card1-text">
            <img alt="nav-icon" className="listimg" src={listimg}></img>
            <a
              className="no-dec-link"
              href={`${this.props.navData[index].menuList[i].link}`}
            >
              {this.props.navData[index].menuList[i].title}
            </a>
          </Card.Text>
        );
      }
    }
    return navArray;
  }

  renderSidebarAct() {
    let upper = this.state.noticeData;
    // console.log(upper)
    if (upper && upper[2]) {
      let elements = [];
      for (
        let index = 0;
        index < Math.min(5, upper[2].articleList.length);
        index++
      ) {
        elements.push(
          <div>
            <Card.Text className="sidebar-notice-text">
              <a
                href={`/article?articleId=${upper[2].articleList[index].id}&columnId=${upper[2].articleList[0].nav_id}`}
                className="no-dec-link"
              >
                {upper[2].articleList[index].title}
              </a>
            </Card.Text>
            <div className="sidebar-notice-date">
              {upper[2].articleList[index].create_at}
            </div>
          </div>
        );
      }
      return elements;
    }
  }

  renderSidebarBrand() {
    if (this.state.lowwerData) {
      let lowwer = [];
      let data = this.state.lowwerData;
      for (let index = 0; index < data.length; index++) {
        lowwer.push(
          <div className="sidebar-brand-limit">
            <a
              href={`/article?articleId=${data[index].id}&columnId=${data[index].nav_id}`}
            >
              <div
                className="sidebar-brand-img"
                style={{
                  backgroundImage: `url(${this.loadImg(data[index].picture)})`,
                }}
              ></div>
            </a>
          </div>
        );
      }
      return lowwer;
    }
  }

  componentDidMount() {
    fetch(`http://120.48.17.78:8080/api/index/GetUpper`, setting)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // console.log(data.data[0])
        this.setState({
          noticeData: data.data,
        });
      });


    fetch(`http://120.48.17.78:8080/api/index/GetLowwer`, setting)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // console.log(data.data[0])
        this.setState({
          lowwerData: data.data,
        });
      });
  }

  render() {
    return (
      <div className="sidebar col-md-3">
        {this.props.navData ? this.getColumnLevel(this.props.navData) : null}
        {this.state.noticeData && this.state.noticeData[2] ? (
          <Card className="sidebar-card updistance">
            <Card.Header className="sidebar-card-header">
              {this.state.noticeData[2]
                ? this.state.noticeData[2].title
                : "加载中"}
            </Card.Header>
            <div className="sidebar-list">
              {this.renderSidebarAct()}
              <a
                href={`/column?columnId=${this.state.noticeData[2].nav_id}`}
                className="sidebar-more"
              >
                查看更多
              </a>
            </div>
          </Card>
        ) : null}
        {this.state.lowwerData && this.state.lowwerData[0] ? (
          <Card className="sidebar-card updistance">
            <Card.Header className="sidebar-card-header">
              {this.state.lowwerData[0]
                ? this.state.lowwerData[0].nav_name
                : "加载中"}
            </Card.Header>
            <div className="sidebar-brand">
              <div className="sidebar-brand-box">
                {this.renderSidebarBrand()}
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    );
  }
}

export default Sidebar;
