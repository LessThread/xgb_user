//列表页面
import React, { Component } from "react";
import List from "../../components/list/List";
import { SrcUrl } from "../../components/BaseUrl";
import { getQueryVariable } from "../../components/NavCtrl";

/* 
列表/栏目 http://xxx.com/1/1/column?columnId=1
含义：http://xxx.com/{一级导航}/{二级导航}/列表?列表ID=1

文章详情 http://xxx.com/1/1/passage?columnId=1&passageId=1
含义：http://xxx.com/{一级导航}/{二级导航}/文章?列表ID=1&文章ID=1
*/

const setting = {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  mode: "cors",
  cache: "default",
};

class XgbList extends Component {
  constructor() {
    super();
    this.state = {
      naviData: null,
      columnId: 1,
      listData: null,
      navTitle: "",
      listTitle: "",
    };
  }

  getNavTitleById(targetId, data) {
    //根据导航栏数据，用id匹配相应的标题
    if (data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "2" || data[i].type === "1") {
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
    console.log(targetId)
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
          if (this.getLinkParam(data[i].link, "columnId") === targetId) {
            console.log(data[i]);
            return data[i];
          }
        } else {
          console.log("Error:A column is supposed to have a link");
        }
      }
    }
    return false;
  }

  componentDidMount() {
    fetch(`http://120.48.17.78:8080/api/Menu/getAll`, setting)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // console.log(data.data);
        let column = getQueryVariable("columnId");
        this.setState({
          columnId: column, //二级导航id
          listTitle: this.getTitleById(column, data.data).title, //二级导航名称
          parentId: this.getTitleById(column, data.data).parent_id, //父级id
          navTitle: this.getNavTitleById(column, data.data), //一级导航名称
        });
        this.setState({
          naviData: data.data, //导航数据
          
        });
      })
      .catch((e) => console.log("错误:", e));
  }

  // componentWillReceiveProps() {
  //   let column = getQueryVariable("columnId");
  //   let nData = this.state.naviData;
  //   this.setState({
  //     columnId: column, //二级导航id
  //     listTitle: this.getTitleById(column, nData).title, //二级导航名称
  //     parentId: this.getTitleById(column, nData).parent_id, //父级id
  //     navTitle: this.getNavTitleById(column, nData), //一级导航名称
  //   });
  // }

  render() {
    return (
      <div>
        {this.state.naviData ? (
          <List
            nav={this.state.naviData}
            navId={this.state.columnId}
            lists={this.state.listData}
            navTitle={this.state.navTitle}
            listTitle={this.state.listTitle}
            parentId={this.state.parentId}
          />
        ) : null}
      </div>
    );
  }
}
export default XgbList;
