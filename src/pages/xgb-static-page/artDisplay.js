import React, { Component } from "react";
import { config } from "react-transition-group";
import Sidebar from "../../components/common/Sidebar";

const setting = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    mode: "cors",
    cache: "default",
    passageContent: "2",
  };

class artDisplay extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            art:'',
            tit:``,
            det: ``,
            type: "",
            data: ``,
        }
    }

    componentWillMount()
        {

            console.log(window.location.href)
            let iurl= window.location.href
            let index=iurl.indexOf("=",3)
            iurl=iurl.slice(index+1)
            console.log(iurl)
            
            fetch(`http://120.48.17.78:8080/api/Article/getById?id=`+iurl ,setting)
            .then(function (response) {
              return response.json();
            })
            .then((res) => {
                console.log("@")
                console.log(res)
                this.setState({
                    data: res.data,
                    art: res.data.details,
                    tit: res.data.title,
                    //det: res.data.details
                    type: res.data.article_type,
                })
                console.log(this.state.type)
                console.log("\n\n\n\n\n")
                console.log(res.data)
              })
        }

    

text()
{
  let html={__html: this.state.art}
  return (
    <div dangerouslySetInnerHTML={html}></div>
  )
}

atrType()
{
  console.log("running 2")
  console.log(this.state.type)
  if(this.state.type==2)
  {
    //alert("is 2")
    return(
      <div>
        <div>
           {this.state.data.person}
        </div>
       
        <div>
          {this.state.data.remark}
        </div>
      </div>
    )
  }

  else if(this.state.type===1)
  {
    return(
      <div>
      </div>
    )
  }
}

title()
{
  return this.state.tit
}





render()
  {return(
    <div className="overall">

      
      <div class="list-body">
        <div class="list-content col-md-8">

          <div className="detail-title"> 
          {this.title()}
          </div>

          <div  className="detail-publish">
            {this.atrType()}
          </div>
         
          <div className="detail-publish">
          {/* {} */}
          </div>

          <div class="list-content-divline"></div>

          <div className="display-content">
          {this.text()}
          </div>
          
        </div>

        <div class="sidebar">
        {/* <Sidebar></Sidebar> */}
       </div>

      </div>
    </div>)
  }

}




export default artDisplay