import React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import {
  Route,
  Switch,
  Redirect,
  Router,
  Link,
  useParams,
} from "react-router-dom";
import "../../styles/common/header.scss";
import logo from "../../assets/logo.png";
import HiddenNav from "./HiddenNav";


// import '../../locals/nav';
// import searchimg from '../../assets/search.png';
//把数据渲染出来。并且可以跳转到相应路由的界面，哭唧唧
//这里也要写路由啊

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
  }


  handleNavButton() {
    let now = this.state.isNavOpen;
    this.props.toParent(this.state.isNavOpen);
    this.setState({
      isNavOpen: !now,
    });
  }


  getNavigation(data) {
    // console.log("Header:success")
    let navArray = [];
    data.forEach((x, i) => {
      let navType = x.type;
      console.log(x.title)
      console.log(x.id)

      if (navType === "0" || navType === 0) 
      {
        //一级栏目是外链
        navArray.push(
          <Nav.Link
            className="navlink link-on-top"
            target="_blank"
            eventKey={"typeA" + x.id}
            href={"http://" + x.link}
          >
            {x.title}
          </Nav.Link>
        );
  
      } 

      else if (navType === "1" || navType === 1) 
      {
        //一级栏目是列表
        navArray.push(
          <Nav.Link>
            <Link
              className="nav-dropdown navlink nodec link-on-top"
              key="dropdownItem"
              eventKey={"typeB" + x.id}
              to={x.link}
              //href={x.link}
            >
              {x.title}
            </Link>
          </Nav.Link>
        );
      } 
      
      else if (navType === "2" || navType === 2) {
        //有二级栏目
        let children = x.menuList;
        navArray.push(
          <NavDropdown
            title={x.title}
            className="nav-dropdown navlink link-on-top"
          >
            {children.map((x, i) => {
              let subType = x.type;
              if (subType === "0" || subType === 0) {
                // console.log(x);
                if (x.link.substr(0, 1) === "/") {
                  return (
                    <Link
                      className="nodecb dropdown-item"
                      key={"typeC" + x.id}
                      to={x.link}
                    >
                      {x.title}
                    </Link>
                  );
                } else {
                  return (
                    // <NavDropdown.Item>
                    <a
                      className="nodecb dropdown-item"
                      key={"typeA" + x.id}
                      href={"http://" + x.link}
                    >
                      {x.title}
                    </a>
                    // </NavDropdown.Item>
                  );
                }
              } else if (subType === "1" || subType === 1) {
                return (
                  // <NavDropdown.Item>
                  <Link
                    className="nodecb dropdown-item"
                    key="dropdownItem"
                    eventKey={"typeB" + x.id}
                    to={x.link}
                  >
                    {x.title}
                  </Link>
                  // </NavDropdown.Item>
                );
              }
            })}
          </NavDropdown>
        );
      }
    });
    // console.log(data);
    return navArray;
  }

  componentWillReceiveProps(nextProps) {
    let url=window.location.href
    console.log(url)
    let key=url.indexOf("=",3)
    console.log(key)
    if(key>80)
    {
      let iurl= window.location.href
    let index=iurl.indexOf("=",3)
    iurl=iurl.slice(index+1)
    iurl=`nav_id?=`+iurl
    console.log(iurl)
    window.location.href=iurl
    }

    

   }

  render() {
    return (
      <Nav
        className="tju-navbar"
        variant="pills"
        activeKey="1"
        onSelect={(k) => this.handleSelect(k)}
      >
        <Navbar className="navbar-content">
          <Navbar.Brand href={`/`} className="brand">
            <img
              src={logo}
              className="d-inline-block align-top nav-img"
              alt="logo"
            ></img>
          </Navbar.Brand>
          <div className="widthControl">
            <Nav.Item className="nav-location link-on-top">
              <Nav.Link className="navlink" href={`/`}>
                首页
              </Nav.Link>
            </Nav.Item>

            {this.props.isReady && this.props.data
              ? this.getNavigation(this.props.data)
              : null}

            {document.body.clientWidth <= 1024 ? (
              <HiddenNav
                isOpen={this.state.isNavOpen}
                navData={this.props.data}
                logoimg={logo}
                isReady={this.props.isReady}
              />
            ) : null}
    
          </div>
        </Navbar>

        <div className="menu-btn" onClick={this.handleNavButton.bind(this)}>
          {this.state.isNavOpen ? (
            <div>
              <div className="navline-cross-1">...</div>
              <div className="navline-cross-2">...</div>
              <div className="navline-cross-3">...</div>
            </div>
          ) : (
            <div>
              <div className="navline">...</div>
              <div className="navline">...</div>
              <div className="navline">...</div>
            </div>
          )}
        </div>

      </Nav>
    );
  }
}
export default Header;
