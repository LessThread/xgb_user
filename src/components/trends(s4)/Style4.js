//学工动态，暂时是样式4
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { BaseUrl } from "../BaseUrl";
import defaultImg from "../../assets/default.png";

// import trend from '../../test/Trends';

// console.log("S4:success")
class Style4 extends Component {
  constructor(props) {
    super(props);
  }

  loadImg(url) {
    if (url !== "null") {
      console.log("..."+ url);
      return `http://120.48.17.78:8080/` + url;
    } else {
      return defaultImg;
    }
  }

  render() {
    let elements = [];
    let elementss = [];
    let limit = 6;
    if (this.props.isLoaded) {
      // 如果有置顶文章，则先渲染置顶文章；若无，依次渲染列表内前六篇文章
      if (this.props.s4data && this.props.s4data.upArticle) {
        limit = 5;
        elements.push(
          <Card className="s4-content-card">
            <a
              className="no-dec-link"
              href={`/artDisplay?id=${this.props.s4data.upArticle.id}`}
            >
              {/* 以下注释在测试后恢复 */}
              <div
                className="s4-img"
                style={{
                  backgroundImage:`url(${this.loadImg(this.props.s4data.upArticle.icon)})`
                }}
              ></div>
              <Card.Title className="s4-text1">
                {this.props.s4data.upArticle.title}
              </Card.Title>
              <Card.Text className="s4-text2">
                {this.props.s4data.upArticle.createdAt}
              </Card.Text>
            </a>
          </Card>
        );
      }
      // 记录文章列表的文章数
      let maxn =
        this.props.s4data && this.props.s4data.articleList
          ? this.props.s4data.articleList.length
          : 0;
      // 渲染第一行第一部分
      for (let index = 0; index < Math.min(limit - 4, maxn); index++) {
        elements.push(
          <Card className="s4-content-card">
            <a
              className="no-dec-link"
              href={`/artDisplay?id=${this.props.s4data.articleList[index].id}&columnId=${this.props.s4data.articleList[index].nav_id}`}
            >
              {/* 以下注释在测试后恢复 */}
              <div
                className="s4-img"
                style={{
                  backgroundImage: `url(${this.loadImg(
                    this.props.s4data.articleList[index].icon
                  )})`,
                }}
              ></div>
              {/* <img alt="pic" className="s4-img" src={this.loadImg(this.props.s4data.articleList[index].icon)}></img> */}
              <Card.Title className="s4-text1">
                {this.props.s4data.articleList[index].title}
              </Card.Title>
              <Card.Text className="s4-text2">
                {/* {this.props.s4data.articleList[index].createdAt.substring(0, 10)} */}
              </Card.Text>
            </a>
          </Card>
        );
      }
      // 渲染第一行第二部分
      for (let index = limit - 4; index < Math.min(limit - 3, maxn); index++) {
        elements.push(
          <Card className="s4-content-card wrap-content">
            <a
              className="no-dec-link"
              href={`/artDisplay?id=${this.props.s4data.articleList[index].id}&columnId=${this.props.s4data.articleList[index].nav_id}`}
            >
              {/* 以下注释在测试后恢复 */}
              <div
                className="s4-img"
                style={{
                  backgroundImage: `url(${this.loadImg(
                    this.props.s4data.articleList[index].icon
                  )})`,
                }}
              ></div>
              <Card.Title className="s4-text1">
                {this.props.s4data.articleList[index].title}
              </Card.Title>
              <Card.Text className="s4-text2">
                {/* {this.props.s4data.articleList[index].createdAt.substring(0, 10)} */}
              </Card.Text>
            </a>
          </Card>
        );
      }

      //以下注释在测试后恢复
      for (let index = limit - 3; index < Math.min(limit, maxn); index++) {
        elementss.push(
          <Card className="s4-content-card wrap-content">
            <a
              className="no-dec-link"
              href={`/artDisplay?id=${this.props.s4data.articleList[index].id}&columnId=${this.props.s4data.articleList[index].nav_id}`}
            >
              <div
                className="s4-img"
                style={{
                  backgroundImage: `url(${this.loadImg(
                    this.props.s4data.articleList[index].icon
                  )})`,
                }}
              ></div>
              <Card.Title className="s4-text1">
                {this.props.s4data.articleList[index].title}
              </Card.Title>
              <Card.Text className="s4-text2">
                {/* {this.props.s4data.articleList[index].createdAt.substring(0, 10)} */}
              </Card.Text>
            </a>
          </Card>
        );
      }
    }
    // console.log(this.props.s4data)
    return (
      <Card id="s4-card" className="row col-md-6">
        {this.props.isLoaded ? (
          <div>
            <Card.Title className="s4-title">
              {this.props.s4data ? this.props.s4data.title : "？"}
              <a className="more" href={`/list/nav_id?==${this.props.s4data.nav_id}`}>
                查看更多
              </a>
            </Card.Title>
            <Card.Body id="s4-body">
              <div className="s4-row">{elements}</div>
              <div className="s4-row">{elementss}</div>
            </Card.Body>
          </div>
        ) : null}
      </Card>
    );
  }
}
export default Style4;
