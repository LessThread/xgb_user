import React, { Component } from "react";
import Page1 from "./部门简介";
import Page2 from "./领导分工";
import Page3 from "./办公电话";
import Page4 from "./学院导航";

class Page extends Component {
  getQueryVariable(variable) {
    //从地址栏URL获取指定参数“variable”
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  }
  renderBreadCrumb(id) {
    let breadCrumbList = [];
    breadCrumbList.push(
      <li>
        <a href="/" className="breadcrumb-item">
          首页
        </a>
      </li>
    );

    breadCrumbList.push(
      <li>
        <div className="breadcrumb-itemm active">{this.switchTitle(id)}</div>
      </li>
    );
    return breadCrumbList;
  }
  switchPage(id) {
    if (id === "1") {
      return <Page1 />;
    } else if (id === "2") {
      return <Page2 />;
    } else if (id === "3") {
      return <Page3 />;
    } else if (id === "4") {
      return <Page4 />;
    }
  }

  switchTitle(id) {
    if (id === "1") {
      return "部门简介";
    } else if (id === "2") {
      return "领导分工";
    } else if (id === "3") {
      return "办公电话";
    } else if (id === "4") {
      return "学院导航";
    }
  }

  render() {
    let id = this.getQueryVariable("id");
    return (
      <div className="page-overall">
        <div className="breadcrumb">
          <div className="breadcrumb-title">{this.switchTitle(id)}</div>
          <ul class="breadcrumb breadcrumb-content">
            {this.renderBreadCrumb(id)}
          </ul>
        </div>
        <div className="page-content">{this.switchPage(id)}</div>
      </div>
    );
  }
}

export default Page;
