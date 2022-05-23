import React from "react";
import {
  Route,
  Switch,
  Redirect,
  Router,
  Link,
  useParams,
} from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import News from "../pages/xgb-news/News";
import List from "../pages/xgb-lists/Lists";
import Home from "./xgb-index/Home";
import Page from "./xgb-static-page/Page";
import Download from './xgb-static-page/download'
import Counselors from "./xgb-static-page/Counselors";
import ArtDisplay from "./xgb-static-page/artDisplay";
import Collge from "./xgb-static-page/学院导航";
import Sidebar from "../components/common/Sidebar";
// 以下为废弃代码，这里原本用于测试接口的连通性
// import Navi from '../test/Navi';
import "../styles/common/header.scss";
import Load from "../components/common/Load";
import naviDataTemp from "../test/Navi";
import { SrcUrl, BaseUrl } from "../components/BaseUrl";

import Leader from "./xgb-static-page/领导分工";
import Tel from "./xgb-static-page/办公电话";
import Brief from "./xgb-static-page/部门简介";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '../styles/fix.scss'


//根据导航到的数据
/* 
列表/栏目 http://xxx.com/1/1/column?columnId=1
含义：http://xxx.com/{一级导航}/{二级导航}/列表?列表ID=1

文章详情 http://xxx.com/1/1/passage?columnId=1&passageId=1
含义：http://xxx.com/{一级导航}/{二级导航}/文章?列表ID=1&文章ID=1
*/

const setting = {
  method: "GET",
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8'
  },
  mode: "cors",
  cache: "default",
};



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: "1",
      naviData: null,
      errorMessage: "",
      childValue: false,
      isInitial: false,
      index: 1,
    };
  }

  

  foot()
  {  
    console.log("\n\n\n\n\n\n\n222222222222222")
    
    return <Footer />
  }


  Side(){
    console.log(window.location.href)
    let iurl= window.location.href
    let index=iurl.indexOf("=",3)
    iurl=iurl.slice(index+1)
    //alert(index)
    if(index===35)return
    if(index!==-1)
    return <Sidebar></Sidebar>
  }

  getChildInfo = (value) => {
    this.setState({ childValue: value });
  };

  getRoute = () => {
    const { naviData } = this.state;
    let routeLists = [];
    naviData.forEach((x) => {
      let type = parseInt(x.type);
      if (type === 1) {
        routeLists.push(
          <Route path={`/column`}>
            <List />
          </Route>
        );
    
      } else if (type === 2) {
        x.menuList.forEach((v) => {
          routeLists.push(
            <Route path={`/list`}>
              <List />
            </Route>
          );
        });
      }
    });
    // console.log(routeLists)
    return routeLists;
  };

  componentDidMount() {
    // -------------------先用假数据----------------------
    if (!this.state.isInitial) {
      // this.setState({
      //     naviData: naviDataTemp.data,
      //     isInitial: true,
      // });
      fetch(`http://120.48.17.78:8080/api/Menu/getAll`, setting)
        .then((res) => res.json())
        .then((data) => {
          data.data[1].link=`/download`
          //data.data[0].link=`/communication`
          data.data[0].link=`/list/nav_id?=87`
          data.data[2].link=`/list/nav_id?=86`
          data.data[3].link=`/list/nav_id?=89`
          //data.data[4].link=`/introduction`
          data.data[4].menuList[0].link=`/introduction`
          data.data[4].menuList[1].link=`/division`
          data.data[4].menuList[2].link=`/phone`
          data.data[5].menuList[0].link=`/list/nav_id?=83`
          data.data[5].menuList[1].link=`/list/nav_id?=84`
          data.data[5].menuList[2].link=`/Fdepartment`
          data.data[6].link=`/list/nav_id?=85`
          console.log(data.data[1].link)
          this.setState({
            naviData: data.data,
          });
        })
        .catch((e) => console.log("错误码:", e));
      this.setState({
        isInitial: true,
      });
    }
  }

  fix(){
    
  }

  render() {

    setTimeout(() => {
      
    }, 1000,);
    this.fix();


    return (
      <div className="slide-away">
       
        <div className="fix hidetip"  style={{animationName:`mymove`,animationDuration: `3s`,
        position:`absolute`,zIndex: 999,
        backgroundColor:`white`,
      }}></div>
        
        {this.state.naviData ? (
          <div>
            
            <div>

            <Header
              data={this.state.naviData}
              toParent={this.getChildInfo.bind(this)}
              isReady={this.state.isInitial}
            />

            </div>
            
            <div id="main" style={{zIndex:`-1`}}>

              <div style={{zIndex: `0`,height: `10px`}}>
                <div style={{height: `150pt`}}></div>

              {this.Side()}

              </div>

              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                


                {this.state.isInitial && this.state.naviData
                  ? this.getRoute()
                  : null}
                  
                  
                <Route exact path="/Fdepartment">
                  <Collge/>
                </Route>
                <Route exact path="/counselors">
                  <Counselors/>
                </Route>
                <Route exact path="/download">
                  <Download />
                </Route>
                 <Route exact path="/artDisplay">
                  <ArtDisplay />
                </Route>
                <Route exact path="/phone">
                  <Tel />
                </Route>
                <Route exact path="/division">
                  <Leader/>
                </Route>
                <Route exact path="/introduction">
                  <Brief/>
                </Route>
                <Router exact path="/list">
                  <List/>
                </Router>
              </Switch>

              
            </div>
            {this.foot() }
            
          </div>
        ) : (
          <Load />
        )}
      </div>
    );
  }
}

export default App;
