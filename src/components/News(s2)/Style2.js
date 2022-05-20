//天大新闻，暂时是样式2
import React, { Component } from "react";
import "../../styles/common/card.scss";
import { Card } from "react-bootstrap";
import { BaseUrl } from "../BaseUrl";
import defaultImg from "../../assets/default.png";
// import news from '../../test/News';

// console.log("S2:success")
const getText = (text) => {
  let reg = /<\/?.+?\/?>/g;
  return text.replace(reg, "");
};

class Style2 extends Component {
  loadImg(url) {
    if (url !== "null") {
      console.log("..."+ url)
      return `http://120.48.17.78:8080/` + url;
    } else {
      return defaultImg;
    }
  }

  imgCtrl(url, title, link) {
    let wid = document.body.clientWidth;
    if (wid <= 768) {
      return (
        <a href={link} className="s2-img-with-title">
          <div
            style={{
              backgroundImage: `url(${this.loadImg(url)})`,
            }}
            className="s2-img"
          ></div>
          <Card.Text className="s2-text1">{title}</Card.Text>
        </a>
      );
    } else {
      return (
        <div className="s2-img-with-title">
          <div
            style={{
              backgroundImage: `url(${this.loadImg(url)})`,
            }}
            className="s2-img"
          ></div>
          <Card.Text className="s2-text1">{title}</Card.Text>
        </div>
      );
    }
  }

  render() {
    return this.props.isLoaded && this.props.s2data ? (
      this.props.s2data.upper ? (
        <Card id="s2-card" className="col-md-6">
          <div id="s2-component">
            <Card.Body id="s2-img-container" className="col-md-8">
              {this.imgCtrl(
                this.props.s2data.upArticle.picture,
                this.props.s2data.upper.navTitle,
                `/artDisplay?id=${this.props.s2data.upper.id}`
              )}
            </Card.Body>
            <Card.Body id="s2-content" className="col-md-4">
              <Card.Title id="s2-title">{this.props.s2data.title}</Card.Title>
              <Card.Text className="s2-date">
                {this.props.s2data.upper.createdAt}
              </Card.Text>
              <Card.Text className="s2-text2">
                {this.props.s2data.upArticle.details
                  ? getText(this.props.s2data.upArticle.details).substring(0, 70) + "…"
                  : null}
              </Card.Text>
            </Card.Body>
          </div>
          <a
            href={`/column?columnId=${this.props.s2data.upper.nav_id}`}
            className="s2-more"
          >
            查看更多
          </a>
        </Card>
      ) : (
        <Card id="s2-card" className="col-md-6">
          <div id="s2-component">
            <Card.Body id="s2-img-container" className="col-md-8">
              {this.imgCtrl(
                this.props.s2data.upArticle.icon,
                this.props.s2data.upArticle.title,
                `/article?articleId=${this.props.s2data.upArticle.id}&columnId=${this.props.s2data.upArticle.nav_id}`
              )}

            </Card.Body>
            <Card.Body id="s2-content" className="col-md-4">
              <Card.Title id="s2-title">{this.props.s2data.upper.nav_id}</Card.Title>
              <Card.Text className="s2-date">
                {this.props.s2data.upArticle.createdAt}
              </Card.Text>
              <Card.Text className="s2-text2">
                {this.props.s2data.upArticle.details
                  ? getText(this.props.s2data.upArticle.details).substring(
                      0,
                      70
                    ) + "…"
                  : null}
              </Card.Text>
            </Card.Body>
          </div>
          <a
            href={`/column?columnId=${this.props.s2data.upArticle.nav_id}`}
            className="s2-more"
          >
            查看更多
          </a>
        </Card>
      )
    ) : (
      <p>获取失败</p>
    );
  }
}
export default Style2;
