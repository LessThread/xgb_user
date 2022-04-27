import React, { Component } from 'react'
	class Counselors extends Component {

        constructor(props) {
            super(props);
            this.state = {
              dat:['a','b'],
              str:'这是react数据',
  		      num:1,
  		      inputValue:"这是val",
  		      arr:['a','b','c'],
              cityName:[ 
              {NAME:"辅导员1",manObj:"2021级本科生",work:"新媒体",phone:"110",workPhone:"120",position:"团委书记",address:"新55-B201",url:"https://s1.328888.xyz/2022/04/26/8YAsM.jpg"},
              {NAME:"辅导员2",manObj:"2021级本科生",work:"新媒体",phone:"110",workPhone:"120",position:"团委书记",address:"新55-B201",url:"https://s1.328888.xyz/2022/04/26/8YAsM.jpg"},
              {NAME:"辅导员3",manObj:"2021级本科生",work:"新媒体",phone:"110",workPhone:"120",position:"团委书记",address:"新55-B201",url:"https://s1.328888.xyz/2022/04/26/8YAsM.jpg"},
              {NAME:"辅导员4",manObj:"2021级本科生",work:"新媒体",phone:"110",workPhone:"120",position:"团委书记",address:"新55-B201",url:"https://s1.328888.xyz/2022/04/26/8YAsM.jpg"},
              {NAME:"辅导员5",manObj:"2021级本科生",work:"新媒体",phone:"110",workPhone:"120",position:"团委书记",address:"新55-B201",url:"https://s1.328888.xyz/2022/04/26/8YAsM.jpg"}
            ]
            };
          }


        askCounselors()
        {
            
        }

        render () {
            return (
                <div className="overall">
                   <div style={{display: 'flex',flexDirection: "row",flexWrap: "wrap" ,}}>
                       {this.renderLi()}
                   </div>
                </div>
            )
        }


        setComponent(){
            return this.state.arr.join("");
        }

        renderLi(){
          return this.state.cityName.map((item,index)=>{
            return (
            <div key={index} style={{padding: '30px',width: '30%',display: 'flex',justifyContent:'center',padding:'25px',borderRadius: "15px",border:'1px solid rgba(0,0,0,0.2)',boxShadow: "0px 0px 5px #888888",
                                      marginLeft:'13%',marginTop:'.5%',marginBottom: '.5%',justifySelf: "stretch",height: '15%'}}>

                <div style={{width: '50%'}}>
                    <img src={item.url} style={{width: '80%',borderRadius: "15px"}}/>
                </div> 

                <div style={{display: 'flex',flexDirection: 'column',paddingLeft:'10px',height: '100%',justifyContent: 'space-between'}}>
                    <div class='text'>
                        姓名： {item.NAME}
                    </div>
                    <br></br>
                    <div>
                        分管年级：{item.manObj}
                    </div>
                    <br></br>
                    <div>
                        手机电话：{item.phone}
                    </div>
                    <br></br>
                    <div>
                       办公电话：{item.workPhone}
                    </div>
                    <br></br>
                    <div>
                        现任职务/类型：{item.position}
                    </div>
                    <br></br>
                    <div>
                        办公地址：{item.address}
                    </div>
                </div>
                    
                
            </div>
            )
          })
        }
      
      }


	// 	render() {
	// 		return (
    //             for(let i=0; i < 10;i++){
	// 			<div>
    //                 <div id='Counselors_render'>
                        
    //                 </div>
	// 			</div>}
	// 		)
	// 	}
	// }
	export default Counselors