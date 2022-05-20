import React, { Component } from "react";
import { Card } from "react-bootstrap";
// import examples from '../../test/Examples';
import "../../styles/common/card.scss";
import backImg from "../../assets/Combined Shape@3x.png";
import defaultImg from "../../assets/default.png";

// import { fetchData } from '../utils';

// console.log("Example:success")
class Examples extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadImg(url) {
    if (url !== null) {
      return url;
    } else {
      return defaultImg;
    }
  }

  columnCtrl(item) {
    if (item) {
      let len = 0;
      if (document.body.clientWidth <= 1024) {
        len = Math.min(item.length, 3);
      } else {
        len = Math.min(item.length, 5);
      }

      let str = "";
      for (let i = 0; i < len; i++) {
        str += `${(1 / len) * 100}% `;
      }
      // console.log(str);
      return str;
    }
  }

  listItem(item) {
    let elements = [];
    let dataLength = item.length;
    if (dataLength > 0) {
      for (let index = 0; index < dataLength; index++) {
        if (item[index].text1 !== "") {
          console.log("example"+ item[0].mes_id);
          elements.push(
            <a
              href={`/artDisplay?id=${item[index].mes_id}`}
              className="no-dec-link"
            >
              <Card className="example-card">
                <img alt="bg" className="img-background" src={backImg}></img>
                <div
                  className="img-response"
                  style={{
                    backgroundImage: `url(${this.loadImg(
                      item[index].picture
                    )})`,
                  }}
                ></div>
                <Card.Title className="example-text1">
                  {item[index].content1}
                </Card.Title>
                <Card.Text className="example-text2">
                  {item[index].content2}
                </Card.Text>
              </Card>
            </a>
          );
        }
      }
    }
    return elements;
  }
  render() {
    // console.log(this.state.example);
    return (
      <Card id="example-body">
        <Card.Body className="example-card-body">
          <Card.Title className="text-center" id="example-title">
            {this.props.example[0] && this.props.example[0].nav_name
              ? this.props.example[0].nav_name
              : "交流园地"}
          </Card.Title>
          <Card.Subtitle className="text-center" id="example-subtitle">
            {this.props.example[0] && this.props.example[0].description
              ? this.props.example[0].description
              : null}
          </Card.Subtitle>
          <div
            id="example-list"
            style={{ gridTemplateColumns: this.columnCtrl(this.props.example) }}
          >
            {this.listItem(this.props.example)}
          </div>
        </Card.Body>
      </Card>
    );
  }
}
export default Examples;
