//通知公告，暂时是样式1
import React, { Component } from 'react';
import '../../styles/common/card.scss';
import { Card, Button } from 'react-bootstrap';
import newIcon from '../../assets/new.png'
import { maxHeaderSize } from 'http';
// import Notice from '../../test/Notice';
//import Notice from '../../test/fake_response.json';
//虚假的通知公告
// let noticeData = Notice.data[0];
// let headline = noticeData[0];

// console.log("S1:success")
class Style1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: {},
            arr: []
        }
    }

    styleCtrl() {
        let wid = document.body.clientWidth;
        const tabletStyle = {
            "s1smtext": "no-dec-link col-md-9",
            "s1smdate": "s1-sm-date col-md-3",
        }
        const pcStyle = {
            "s1smtext": "no-dec-link col-md-10",
            "s1smdate": "s1-sm-date col-md-2",
        }
        if (wid <= 768) {
            return tabletStyle;
        } else {
            return pcStyle;
        }
    }

    render() {
        const renderList = [];
        if (this.props.s1data.upArticle) {
            renderList.push(this.props.s1data.upper);
            for (let i = 0; i < Math.min(8, this.props.s1data.articleList.length); i++) {
                renderList.push(this.props.s1data.articleList[i]);
            }
        }
        const elements = [];
        let dataLength = 0, foldLine = 0
        if (this.props.s1data && renderList) {
            dataLength = renderList.length;
            foldLine = renderList.length;
            if (renderList.length > 8) {
                dataLength = 8;
            }
            if (renderList.length > 5) {
                foldLine = 5;
            }
        }
        for (let index = 1; index < foldLine; index++) {
            elements.push(
                <div className="s1-sm-text">
                    <a href={`/artDisplay?id=${renderList[index].id}` } className={this.styleCtrl().s1smtext}>
                        {renderList[index].title}
                    </a>
                    <div className={this.styleCtrl().s1smdate}>
                        {renderList[index].createdAt ? renderList[index].createdAt.substring(5, 10) : null}
                    </div>
                </div>
            )
        }

        if (foldLine > 5) {
            for (let index = foldLine; index < dataLength; index++) {
                elements.push(
                    <div className="s1-sm-text">
                        <a href={`/artDisplay?id=${renderList[index].id}`} className={this.styleCtrl().s1smtext}>
                            {renderList[index].title}
                        </a>
                        <div className={this.styleCtrl().s1smdate}>
                            {renderList[index].createdAt ? renderList[index].createdAt.substring(5, 10) : null}
                        </div>
                    </div>
                )
            }
        }
        return (
            <Card id="s1-card" className="col-md-4">
                {this.props.isLoaded && this.props.s1data ?
                    <div>
                        <div className="s1-title">{this.props.s1data.upper.navTitle}</div>
                        <div className="s1-headline">
                            {1?
                                <Card.Text id="s1-lg-text">
                                    <a href={`/artDisplay?id=${this.props.s1data.upper.mes_id}`} className="no-dec-link">
                                        {this.props.s1data.upper.articleTitle}
                                        <img alt="new" className="newIcon" src={newIcon}></img>
                                    </a>
                                    <div className="s1-lg-date">
                                        {this.props.s1data.articleList[0].createdAt ? this.props.s1data.articleList[0].createdAt.substring(5, 10) : null}
                                    </div>
                                </Card.Text>
                                : null}
                        </div>
                        <div className="s1-content-group">
                            {elements}
                        </div>
                        <Button href={"/list/nav_id?=86"} 
                        className="s1-view-more">查看更多</Button>
                    </div> : <p>获取失败</p>}
            </Card>
        )
    }
}
export default Style1;