import React, { Component } from "react";
import "../../styles/common/list.scss";
import navi from "../../test/Navi";
import Sidebar from "../common/Sidebar";
//import passage from "../../test/Passage";
import "../../styles/common/newsdetail.scss";
import { BaseUrl, SrcUrl } from "../BaseUrl";
import { getQueryVariable } from "../NavCtrl";
import defaultImg from "../../assets/default.png";

//详情页没有columnId,该怎么解决？

const setting = {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  mode: "cors",
  cache: "default",
};

function getParams(str, variable) {
  let reg = new RegExp(`(?<=\\b${variable}=)[^&]*`);
  let url = str || "";
  let target = url.match(reg);
  if (target) return target[0];
  return;
}

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: navi,
    };
  }

  loadImg(url) {
    if (url !== "undefined") {
      return BaseUrl + url;
    } else {
      return defaultImg;
    }
  }

  //渲染html
  showHtml(htmlString) {
    var html = { __html: htmlString };
    return <div dangerouslySetInnerHTML={html}></div>;
  }

  listDetail() {
    // console.log( content)
    let elements = [];
    let files = [];
    let content = this.props.passagecontent;
    // console.log(content)
    let type = content.contentType;
    if (type === "1") {
      for (let index = 0; index < content.activity.files.length; index++) {
        files.push(
          <div className="fine-line">
            附件{index + 1}：
            <a
              download={content.activity.files[index].file_name}
              className="no-dec-link"
              href={
                SrcUrl + "downLoadFile?fileName=" + content.activity.files[index].url
              }
            >
              <i className="fa fa-file"></i>
              {content.activity.files[index].file_name}
            </a>
          </div>
        );
      }

      elements.push(
        <div>
          {/* {content &&
          content.activity &&
          content.activity.picture !== "null" ? (
            <img
              alt="img"
              className="detail-cover"
              src={this.loadImg(content.activity.picture)}
            ></img>
          ) : null} */}
          <div className="detail-title">{content.activity.title}</div>
          <div className="detail-publish">
            发布日期：{content.activity.createdAt.substring(0, 10)}
          </div>
          <div className="list-content-divline"></div>
          <div className="row info-bar">
            <div className="detail-large">
              活动日期：
              <span className="detail-small">
                {content.activity.start_time.substring(0, 10)}
              </span>
            </div>
            <div className="detail-large">
              主讲人：
              <span className="detail-small">{content.activity.speaker}</span>
            </div>
          </div>
          <div className="row info-bar">
            <div className="detail-large">
              活动时间：
              <span className="detail-small">
                {content.activity.start_time.substring(11, 16)}
              </span>
            </div>
            <div className="detail-large">
              地点：
              <span className="detail-small">{content.activity.location}</span>
            </div>
          </div>
          <div className="display-content">
            {this.showHtml(content.activity.details)}
            {/* {activity_details} */}
          </div>
          <div className="files-link">{files}</div>
          <div className="list-content-divline"></div>
          <p>{}</p>
        </div>
      );
    } else if (type === "2") {
      if (
        content.message.files.length > 0 &&
        content.message.files[0].file_name
      ) {
        for (let index = 0; index < content.message.files.length; index++) {
          files.push(
            <div className="fine-line">
              附件{index + 1}：
              <a
                download={content.message.files[index].file_name}
                className="no-dec-link"
                href={BaseUrl + content.message.files[index].url}
              >
                <i className="fa fa-file"></i>
                {content.message.files[index].file_name}
              </a>
            </div>
          );
        }
      }
      elements.push(
        <div>
          {/* {content.message.picture && content.message.picture !== "null" ? (
            <img
              alt="img"
              className="detail-cover"
              src={this.loadImg(content.message.picture)}
            ></img>
          ) : null} */}
          <div className="detail-title">{content.message.title}</div>
          <div className="detail-publish">
            发布日期：{content.message.createdAt.substring(0, 10)}
          </div>
          <div className="list-content-divline"></div>
          {/* <div className="row info-bar">
                        <div className="detail-large">活动日期：<span className="detail-small">{content.message.start_time.substring(0, 10)}</span></div>
                        <div className="detail-large">主讲人：<span className="detail-small">{content.message.speaker}</span></div>
                    </div>
                    <div className="row info-bar">
                        <div className="detail-large">活动时间：<span className="detail-small">{content.message.start_time.substring(11, 16)}</span></div>
                        <div className="detail-large">地点：<span className="detail-small">{content.message.location}</span></div>
                    </div> */}
          <div className="display-content">
            {this.showHtml(content.message.content)}
          </div>
          <div className="files-link">{files}</div>
          <div className="list-content-divline"></div>
          <p>
            {content.message.remark ? "编辑：" + content.message.remark : null}
          </p>
        </div>
      );
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
        <a href="/" className="breadcrumb-item">
          首页
        </a>
      </li>
    );
    if (this.getColumnLevel(this.props.navId, this.props.nav)) {
      breadCrumbList.push(
        <li>
          <a className="breadcrumb-item">
            {this.getColumnLevel(this.props.navId, this.props.nav)}
          </a>
        </li>
      );
    }
    breadCrumbList.push(
      <li>
        <a
          href={"/column?columnId=" + getQueryVariable("columnId")}
          className="breadcrumb-itemm active"
        >
          {this.props.listTitle}
        </a>
      </li>
    );
    return breadCrumbList;
  }

  render() {
    let column = getQueryVariable("columnId");
    return (
      <div>
        <div className="breadcrumb">
          <div className="breadcrumb-title">{this.props.listTitle}</div>
          <ul class="breadcrumb breadcrumb-content">
            {this.renderBreadCrumb()}
          </ul>
        </div>
        <div className="list-body">
          <div className="list-content col-md-8">
            {this.props.passagecontent ? this.listDetail() : null}
          </div>
          {this.props.nav ? (
            <Sidebar navData={this.props.nav} parentId={this.props.parentId} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Detail;
