//首页主页
import React, { Component } from 'react';
import Carousel from '../../components/carousel/Carousel';
import Toast from '../../components/toasts/Toast';
import Style1 from '../../components/notice(s1)/Style1';
import Style2 from '../../components/News(s2)/Style2';
import Style4 from '../../components/trends(s4)/Style4';
import Style3 from '../../components/preview(s3)/Style3';
import Examples from '../../components/excellent/Example';
import Officehall from '../../components/officehall/Officehall';
import Outcome from '../../components/outcome/Outcome';
import Brand from '../../components/brand/Brand';
import DATA from '../../test/Notice';
import "../../styles/common/header.scss";
import Skeleton from './Skeleton';
import { setTimeout } from 'timers';
import Load from '../../components/common/Load';
import { SrcUrl } from '../../components/BaseUrl';
// import { fetchData } from '../../components/utils';
// import DATA from '../../test/Notice';


const setting = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    mode: 'cors',
    cache: 'default'
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isFetched: false,
            noticeData: DATA.data[0],
            newsData: DATA.data[1],
            previewData: DATA.data[2],
            trendData: DATA.data[3],
            lowwer1Data: null,
            bannerData: null,
        })
    }

    componentDidMount = () => {
        fetch( `http://120.48.17.78:8080/api/index/GetUpper`, setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    noticeData: data.data[0],
                    newsData: data.data[1],
                    previewData: data.data[2],
                    trendData: data.data[3],
                    isFetched: true,
                })
            })
            .catch(e => console.log('错误码:', e))

        fetch(`http://120.48.17.78:8080/api/index/GetLowwer`, setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    lowwer1Data: data.data,
                })
            })
            .catch(e => console.log('错误码:', e))
        
            
        fetch(`http://120.48.17.78:8080/api/banner/getAll`, setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    bannerData: data.data,
                })
            })
            .catch(e => console.log('错误码:', e))
    }
    render() {
        return (
            <div className="overall">
                {this.state.bannerData ? <Carousel banner={this.state.bannerData} /> : null}
                <Toast />
                {
                    this.state.isFetched ?
                        <div>
                            <div id="component-block1">
                                <Style1 s1data={this.state.noticeData} isLoaded={this.state.isFetched} />
                                <Style2 s2data={this.state.newsData} isLoaded={this.state.isFetched} />
                            </div>
                            <div id="component-block2">
                                <Style3 s3data={this.state.previewData} isLoaded={this.state.isFetched} />
                                <Style4 s4data={this.state.trendData} isLoaded={this.state.isFetched} />
                            </div>
                        </div>
                        : <Skeleton />
                }
                {this.state.lowwer1Data ? <Examples example={this.state.lowwer1Data} /> : null}
                <Officehall />
            </div>
        )
    }
}

export default Home;