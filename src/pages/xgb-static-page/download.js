import React, { Component } from "react";
import { BaseUrl } from "../../components/BaseUrl";
import { ButtonGroup, Button } from "react-bootstrap";
import "../../styles/common/download.scss";
const setting = {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  mode: "cors",
  cache: "default",
};

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downData: null,
      from: 0,
      to: 14,
      currentPage: 1,
    };
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

    breadCrumbList.push(
      <li>
        <div className="breadcrumb-itemm active">下载专区</div>
      </li>
    );
    return breadCrumbList;
  }
  
  componentDidMount() {
    fetch( `http://120.48.17.78:8080/api/getAllFile`, setting)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({
          downData: data.data,
        });
      });
  }

  renderFileList(from, to) {
    if (this.state.downData) {
      let list = [];
      const data = this.state.downData;
      for (
        let i = from;
        i <= Math.min(this.state.downData.length - 1, to);
        i++
      ) {
        list.push(
          <li className="down-item">
            <a
              href={`http://120.48.17.78:8080/api/downLoadFile/inZone?fileName=${data[i]["id"]}`}
              className="down-filename"
            >
              {data[i]["realName"]}
            </a>
            {/* <span className="down-date">{val.updated_at.substr(0, 10)}</span> */}
          </li>
        );
      }
      return (
        <div className="down-list">
          {list}
          <li className="down-count">
            共有{this.state.downData ? this.state.downData.length : "0"}条记录
          </li>
        </div>
      );
    }
  }

  handlePageChange(x) {
    let temp = this.state.currentpage;
    let from = this.state.from;
    let to = this.state.to;
    if (x === 0 && temp <= parseInt(this.state.downData.length / 15)) {
      //下一页
      temp += 1;
      from += 15;
      to += 15;
    }
    if (x === -1 && temp > 1) {
      //上一页
      temp -= 1;
      from -= 15;
      to -= 15;
    }
    if (x > 0) {
      temp = x;
      from = 15 * (x - 1);
      to = 14 + 15 * (x - 1);
    }
    
    console.log(
      "page:" +
        this.state.currentPage +
        ";from:" +
        this.state.from +
        ";to:" +
        this.state.to
    );
    if (temp !== this.state.currentpage) {
      this.setState({
        currentpage: temp,
        isRefreshed: false,
        from: from,
        to: to,
      });
    }
  }

  divPage() {
    let buttons = [];
    if (this.state.downData) {
      let pages = parseInt(this.state.downData.length / 15) + 1;
      if (pages > 1 && pages < 8) {
        for (let index = 0; index < pages; index++) {
          if (index === this.state.currentpage - 1) {
            buttons.push(
              <Button
                className="active-page page-button"
                onClick={this.handlePageChange.bind(this, index + 1)}
              >
                {index + 1}
              </Button>
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
              <Button
                className="active-page page-button"
                onClick={this.handlePageChange.bind(this, index + 1)}
              >
                {index + 1}
              </Button>
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
          {/* {pages > 1 ? (
            <Button
              onClick={this.handlePageChange.bind(this, -1)}
              className="page-button"
            >
              <i className="fa fa-angle-left"></i>
            </Button>
          ) : null} */}
          {/* <Button onClick={this.handlePageChange.bind(this, -1)} className="page-button"><i className="fa fa-angle-left"></i></Button> */}
          {buttons}
          {/* {pages > 1 ? (
            <Button
              onClick={this.handlePageChange.bind(this, 0)}
              className="page-button"
            >
              <i className="fa fa-angle-right"></i>
            </Button>
          ) : null} */}
          {/* <Button onClick={this.handlePageChange.bind(this, 0)} className="page-button"><i className="fa fa-angle-right"></i></Button> */}
        </ButtonGroup>
      );
    }
  }

  render() {
    return (
      <div className="page-overall">
        <div className="breadcrumb">
          <div className="breadcrumb-title">下载专区</div>
          <ul class="breadcrumb breadcrumb-content">
            {this.renderBreadCrumb()}
          </ul>
        </div>
        <div className="page-content">
          {this.renderFileList(this.state.from, this.state.to)}
        </div>
        {this.state.downData ? this.divPage() : null}
      </div>
    );
  }
}

export default Page;
