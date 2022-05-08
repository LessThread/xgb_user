import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import "../../styles/common/list.scss";
import Sidebar from "../common/Sidebar";
import { throwStatement } from "@babel/types";
import defaultimg from "../../assets/default.png";
import { getQueryVariable } from "../NavCtrl";
import { BaseUrl, SrcUrl } from "../BaseUrl";

const setting = {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  mode: "cors",
  cache: "default",
};



class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpage: 1,
      navTitle: null,
      listData: null,
      isRefreshed: true,
      isLoaded: false,
      isNavLoaded: false,

      nav_id:`1`,
      pageNum: 1,
      pageSize: 10,
      accdat:[],
    };
  }



  componentWillMount()
  {
    fetch(`http://120.48.17.78:8080/api/Article/getByPage?nav_id=`+this.state.nav_id+`&pageNum=`+this.state.pageNum+`&pageSize=`+this.state.pageSize, setting)
            .then(function (response) {
              return response.json();
            })
            .then((rest) => {
                console.log("@")
                console.log(rest)
                this.setState({
                    accdat: rest.data.res
                },
                ()=>
                 {
                     console.log(this.state.accdat)
                 })
              })
  }

  NewList()
  {
    return this.state.accdat.map((item,index)=>{
      let ID=`/artDisplay?id=`+ item.id;
      return (
        <div  key={index}>
          <div style={{display: `flex`}}>
             {/* <div style={{width: `20%`}}>
               {item.id}
             </div> */}
             <div style={{width: `60%`,padding: `10px`,}}>
             <a href={ID} class='no-dec-link'>{item.title} </a>
             </div>
          </div>
        </div>
      )})
  }

  button()
  {
    
  }

  render() {
    // console.log(this.props.listTitle);
    return (
      <div className="overall">
        <div className="list-body">
          <div className="list-content col-md-8">
            <div className="list-content-divline"></div>
               <div>
                 {this.NewList()}
               </div>

               <div>
                 {this.button()}
               </div>
          </div>
          <Sidebar navData={this.props.nav} parentId={this.props.parentId} />
        </div>
      </div>
    );
  }
}

export default List;
