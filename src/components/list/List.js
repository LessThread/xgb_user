import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import "../../styles/common/list.scss";
import Sidebar from "../common/Sidebar";
import { throwStatement } from "@babel/types";
import defaultimg from "../../assets/default.png";
import { getQueryVariable } from "../NavCtrl";
import { BaseUrl, SrcUrl } from "../BaseUrl";

const setting = {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  mode: "cors",
  cache: "default",
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpage: 1,
      navTitle: null,
      listData: null,
      isRefreshed: true,
      isLoaded: false,
      isNavLoaded: false,
    };
  }

  slicePassage(x) {
    if (x.length < 90) {
      return x;
    } else {
      return x.substring(0, 90);
    }
  }

  getSimpleText(html) {
    // var re1 = new RegExp(/<[^>]*>|/g,"");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    var msg = html.replace(/<[^>]*>|/g, ""); //执行替换成空字符
    var re = new RegExp("<(?!img|br|p|/p).*?>", "g"); // 创建正则表达式对象。
    msg = msg.replace(re, ""); //去掉所有的html标记
    return msg;
  }

  handlePageChange(x) {
    let temp = this.state.currentpage;
    if (x === 0 && temp + 1 <= parseInt(this.state.listData.count / 15) + 1) {
      //下一页
      temp += 1;
    }
    if (x === -1 && temp > 1) {
      //上一页
      temp -= 1;
    }
    if (x > 0) {
      temp = x;
    }
    if (temp !== this.state.currentpage) {
      this.setState({
        currentpage: temp,
        isRefreshed: false,
      });
    }
  }

  //切分页面，用作翻页
  divPage() {
    let buttons = [];
    let pages = parseInt(this.state.listData.count / 15) + 1;
    if (pages > 1 && pages < 8) {
      for (let index = 0; index < pages; index++) {
        if (index === this.state.currentpage - 1) {
          buttons.push(
            <Button className="active-page page-button">{index + 1}</Button>
          );
        } else {
          buttons.push(
            <Button
              onClick={this.handlePageChange.bind(this, index + 1)}
              className="page-button"
            >
              {index + 1}
            </Button>
          );
        }
      }
    } else if (pages > 7) {
      for (
        let index = this.state.currentpage - 1;
        index < this.state.currentpage + 6;
        index++
      ) {
        if (index === this.state.currentpage - 1) {
          buttons.push(
            <Button className="active-page page-button">{index + 1}</Button>
          );
        } else {
          buttons.push(
            <Button
              onClick={this.handlePageChange.bind(this, index + 1)}
              className="page-button"
            >
              {index + 1}
            </Button>
          );
        }
      }
      buttons.push(<Button className="page-button">…</Button>);
      if (pages - 1 === this.state.currentpage) {
        buttons.push(
          <Button className="active-page page-button">{pages}</Button>
        );
      } else {
        buttons.push(<Button className="page-button">{pages}</Button>);
      }
    }

    return (
      <ButtonGroup className="page-change mr-2" aria-label="First group">
        {pages > 1 ? (
          <Button
            onClick={this.handlePageChange.bind(this, -1)}
            className="page-button"
          >
            <i className="fa fa-angle-left"></i>
          </Button>
        ) : null}
        {/* <Button onClick={this.handlePageChange.bind(this, -1)} className="page-button"><i className="fa fa-angle-left"></i></Button> */}
        {buttons}
        {pages > 1 ? (
          <Button
            onClick={this.handlePageChange.bind(this, 0)}
            className="page-button"
          >
            <i className="fa fa-angle-right"></i>
          </Button>
        ) : null}
        {/* <Button onClick={this.handlePageChange.bind(this, 0)} className="page-button"><i className="fa fa-angle-right"></i></Button> */}
      </ButtonGroup>
    );
  }

  listItem() {
    let len = this.state.listData.articleList.length;
    let elements = [];
    if (
      this.state.listData.listType === "1" ||
      this.state.listData.listType === 1
    ) {
      for (let index = 0; index < len; index++) {
        elements.push(
          <div className="l1-content">
            <div className="l1-title col-md-10">
              <a
                className="no-dec-link"
                href={`/article?articleId=${this.state.listData.articleList[index].id}&columnId=${this.state.listData.articleList[index].nav_id}`}
              >
                {this.state.listData.articleList[index].title}
              </a>
            </div>
            <div className="l1-date col-md-2">
              {this.state.listData.articleList[index].createdAt.substring(0, 10)}
            </div>
          </div>
        );
      }
    } else if (
      this.state.listData.listType === "2" ||
      this.state.listData.listType === 2
    ) {
      for (let index = 0; index < len; index++) {
        elements.push(
          <div className="l3-content">
            <div className="l3-img-box">
              {this.state.listData.articleList[index].icon !== null ? (
                <div
                  style={{
                    backgroundImage: `url(${
                      BaseUrl + this.state.listData.articleList[index].icon
                    })`,
                  }}
                  className="l3-img"
                  src={BaseUrl + this.state.listData.articleList[index].icon}
                ></div>
              ) : (
                <div
                  className="l3-img"
                  style={{
                    backgroundImage: `url(${defaultimg})`,
                  }}
                ></div>
              )}
            </div>
            <div className="l3-right">
              <div className="l3-title">
                <a
                  className="no-dec-link"
                  href={`/article?articleId=${this.state.listData.articleList[index].id}&columnId=${this.state.listData.articleList[index].nav_id}`}
                >
                  {this.state.listData.articleList[index].title}
                </a>
              </div>
              <div className="l3-date">
                {this.state.listData.articleList[index].createdAt.substring(0, 10)}
              </div>
              <div className="l3-message">
                {this.slicePassage(
                  this.getSimpleText(this.state.listData.articleList[index].content)
                ) + "…"}
              </div>
            </div>
          </div>
        );
      }
    } else if (
      this.state.listData.listType === "3" ||
      this.state.listData.listType === 3
    ) {
      for (let index = 0; index < len; index++) {
        elements.push(
          <div className="l1-content">
            <div className="l1-title col-md-10">
              <a
                className="no-dec-link"
                href={`/article?articleId=${this.state.listData.articleList[index].id}&columnId=${this.state.listData.articleList[index].nav_id}`}
              >
                {this.state.listData.articleList[index].title}
              </a>
            </div>
            <div className="l1-date col-md-2">
              {this.state.listData.articleList[index].start_date.substring(0, 10)}
            </div>
          </div>
        );
      }
    }
    return elements;
  }

  getColumnLevel(data) {
    //根据导航栏数据，用id匹配
    if (data)
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].type === "2" &&
          data[i].id.toString() === this.props.parentId
        ) {
          return data[i].title;
        }
      }
    return false;
  }

  renderBreadCrumb() {
    let breadCrumbList = [];
    breadCrumbList.push(
      <li>
        <a href="/" className="breadcrumb-item" key="bc1">
          首页
        </a>
      </li>
    );
    if (this.getColumnLevel(this.props.navId, this.props.nav)) {
      breadCrumbList.push(
        <li>
          <a className="breadcrumb-item" key="bc2">
            {this.getColumnLevel(this.props.nav)}
          </a>
        </li>
      );
    }
    breadCrumbList.push(
      <li>
        <a
          href={"/column?columnId=" + getQueryVariable("columnId")}
          className="breadcrumb-itemm active"
          key="bc3"
        >
          {this.props.listTitle}
        </a>
      </li>
    );
    return breadCrumbList;
  }

  componentDidUpdate() {
    if (!this.state.isRefreshed) {
      let nav_id = getQueryVariable("columnId");
      // fetch(
      //   SrcUrl +
      //     `api/index/messageList/` +
      //     nav_id +
      //     "/" +
      //     this.state.currentpage,
      //   setting
      // )

      fetch(
        `http://120.48.17.78:8080/api/` +
          `queryMessageList` +
          nav_id +
          "/" +
          this.state.currentpage,
        setting
      )
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          // console.log("更新原因：触发页面切换")
          // console.log(data.data)
          this.setState({
            listData: data.data,
            isRefreshed: true,
          });
        })
        .catch((e) => console.log("错误码:", e));
    }
  }

  componentWillReceiveProps() {
    fetch(
      SrcUrl + `api/index/messageList/` + getQueryVariable("columnId") + "/1",
      setting
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        this.setState({
          listData: data.data,
          isLoaded: true,
        });
      })
      .catch((e) => console.log("错误码:", e));
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      fetch(
        SrcUrl + `api/index/messageList/` + getQueryVariable("columnId") + "/1",
        setting
      )
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          // console.log(data)
          this.setState({
            listData: data.data,
            isLoaded: true,
          });
        })
        .catch((e) => console.log("错误码:", e));
    }
  }

  render() {
    // console.log(this.props.listTitle);
    return (
      <div className="overall">
        <div className="breadcrumb">
          <div className="breadcrumb-title">{this.props.listTitle}</div>
          <ul class="breadcrumb breadcrumb-content">
            {this.renderBreadCrumb()}
          </ul>
        </div>

        <div className="list-body">
          <div className="list-content col-md-8">
            <div className="list-content-divline"></div>
            {this.state.isLoaded && this.state.listData
              ? this.listItem()
              : null}
            {this.state.isLoaded && this.state.listData ? this.divPage() : null}
          </div>
          <Sidebar navData={this.props.nav} parentId={this.props.parentId} />
        </div>
      </div>
    );
  }
}

export default List;
