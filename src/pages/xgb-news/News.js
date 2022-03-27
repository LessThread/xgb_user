//新闻页面
import React, { Component } from "react";
import Navi from "../../test/Navi";
import Detail from "../../components/detail/detail";
import { SrcUrl } from "../../components/BaseUrl";
import { getQueryVariable } from "../../components/NavCtrl";

const setting = {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  mode: "cors",
  cache: "default",
};

class XgbNew extends Component {
  constructor() {
    super();
    this.state = {
      naviData: Navi.data,
      navid: 1,
      navTitle: "",
      listTitle: "",
      passageContent: null,
    };
  }
  getLinkParam(link, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = link.split("?")[1].substr(0).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
  getNavTitleById(targetId, data) {
    //根据导航栏数据，用id匹配相应的标题
    if (data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "2") {
          if (data[i].menuList) {
            for (let j = 0; j < data[i].menuList.length; j++) {
              if (
                data[i].menuList[j].link &&
                data[i].menuList[j].type === "1"
              ) {
                let query = data[i].menuList[j].link;
                let vars = query.split("?")[1].split("&");
                for (let i = 0; i < vars.length; i++) {
                  let pair = vars[i].split("=");
                  if (pair[0] === "columnId" && pair[1] === targetId) {
                    if (data[i].title) {
                      return data[i].title;
                    } else {
                      return "未命名导航";
                    }
                  }
                }
              } else {
                console.log("Error:A column is supposed to have a link");
              }
            }
          } else {
            console.log("Error:Exist father nav without son");
          }
        } else {
          console.log("Error:A column is supposed to have a link");
        }
      }
    return false;
  }

  getTitleById(targetId, data) {
    //根据导航栏数据，用id匹配相应的标题
    // console.log(targetId)
    if (data) {
      //   console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "2") {
          if (data[i].menuList) {
            for (let j = 0; j < data[i].menuList.length; j++) {
              if (
                data[i].menuList[j].link &&
                data[i].menuList[j].type === "1"
              ) {
                let query = data[i].menuList[j].link;
                let vars = query.split("?")[1].split("&");
                for (let index = 0; index < vars.length; index++) {
                  let pair = vars[index].split("=");
                  if (
                    pair[0] === "columnId" &&
                    pair[1] === targetId.toString()
                  ) {
                    // console.log(data[i].menuList[j]);
                    if (data[i].menuList[j] && data[i].menuList[j].title) {
                      return data[i].menuList[j];
                    } else {
                      return "未命名栏目";
                    }
                  }
                }
              } else {
                console.log("Error:A column is supposed to have a link");
              }
            }
          } else {
            console.log("Error:Exist father nav without son");
          }
        } else if (data[i].link && data[i].type === "1") {
          //   console.log(data[i].link);
          //   console.log(this.getLinkParam(data[i].link, "columnId"));
          //   console.log(targetId)
          if (this.getLinkParam(data[i].link, "columnId") === targetId) {
            console.log(data[i]);
            return data[i];
          }

          //   let query = data[i].link;
          //   let vars = query.split("?")[1].split("&");
          //   for (let j = 0; j < vars.length; j++) {
          //     let pair = vars[j].split("=");
          //     // console.log(pair);
          //     // console.log(targetId);
          //     console.log(data[i]);
          //     if (pair[0] === "columnId" && pair[1] === targetId.toString()) {
          //       if (data[i].title) {
          //         return data[i].title;
          //       } else {
          //         return "未命名栏目";
          //       }
          //     }
          //   }
        } else {
          console.log("Error:A column is supposed to have a link");
        }
      }
    }
    return false;
  }

  getNav() {
    let nav_id = getQueryVariable("columnId");
    return nav_id;
  }

  getPasId() {
    let id = getQueryVariable("articleId");
    return id;
  }

  componentDidMount() {
    // console.log(this.getNav());
    // console.log(this.getPasId());
    // fetch(
    //   SrcUrl + `api/index/message/` + this.getNav() + "/" + this.getPasId(),
    //   setting
    // )

    fetch(
      `http://120.48.17.78:8080/api/` + this.getNav() + "/" + this.getPasId(),
      setting
    )
    .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // console.log("文章内容获取：" + data.tips)
        // console.log(data.data)
        this.setState({
          passageContent: data.data,
        });
      })
      .catch((e) => console.log("错误码:", e));

    fetch(`http://120.48.17.78:8080/api/Menu/getAll`, setting)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // console.log("数据:" + data.data)
        let column = getQueryVariable("columnId");
        
        this.setState({
          columnId: column, //一级导航id
          listTitle: this.getTitleById(column, data.data).title, //二级导航名称
          navTitle: this.getNavTitleById(column, data.data), //一级导航名称
          parentId: this.getTitleById(column, data.data).parent_id, //父级id
        });
        this.setState({
          naviData: data.data, //导航数据
        });
      })
      .catch((e) => console.log("错误:", e));
  }

  render() {
    return (
      <div className="overall">
        {this.state.naviData ? (
          <Detail
            nav={this.state.naviData}
            navId={this.state.columnId}
            navTitle={this.state.navTitle}
            listTitle={this.state.listTitle}
            passagecontent={this.state.passageContent}
            parentId={this.state.parentId}
          />
        ) : null}
      </div>
    );
  }
}
export default XgbNew;
