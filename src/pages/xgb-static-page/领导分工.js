import React, { Component } from "react";

class Leader extends Component {
  render() {
    return (
      <div className="overall">
        <figure style={{ margin: "0 auto" }}>
          <table
            style={{
              margin: "0 auto",
              marginBottom: "2rem",
            }}
            className="pure-table"
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center", width: "100px" }}>
                  <strong>姓 名</strong>
                </th>
                <th style={{ textAlign: "center" }}>
                  <strong>职 务</strong>
                </th>
                <th style={{ textAlign: "center" }}>
                  <strong>主要分管工作</strong>
                </th>
                <th style={{ textAlign: "center" }}>
                  <strong>分管内设机构</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>赵 欣</td>
                <td style={{ textAlign: "center" }}>部（处）长</td>
                <td style={{ textAlign: "center" }}>全面工作</td>
                <td style={{ textAlign: "center" }}>心理健康教育中心</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>李京霖</td>
                <td style={{ textAlign: "center" }}>
                  副部（处）长、 学生资助管理中心主任
                </td>
                <td style={{ textAlign: "center" }}>
                  学生奖助、学生日常事务管理服务、 少数民族学生工作
                </td>
                <td style={{ textAlign: "center" }}>
                  学生资助管理中心 少数民族学生工作科
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>柳丰林</td>
                <td style={{ textAlign: "center" }}>
                  副部（处）长、武装部部长、 就业指导中心主任（兼）
                </td>
                <td style={{ textAlign: "center" }}>
                  学生职业生涯教育、学生就业指导服务、 学生国防教育
                </td>
                <td style={{ textAlign: "center" }}>就业指导中心 武装部</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>王 开</td>
                <td style={{ textAlign: "center" }}>副部（处）长</td>
                <td style={{ textAlign: "center" }}>
                  学生日常思想政治教育、学生党建、学生心理健康教育、学生安全稳定工作
                </td>
                <td style={{ textAlign: "center" }}>
                  本科生工作科 学生党建与研究生工作科 心理健康教育中心（协管）
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>史 慧</td>
                <td style={{ textAlign: "center" }}>副部（处）长</td>
                <td style={{ textAlign: "center" }}>
                  部门内部事务、信息化建设、网络思政教育、学生违纪处理、辅导员队伍建设、学生工作研究、课外课程建设、教学工作
                </td>
                <td style={{ textAlign: "center" }}>
                  综合事务科 学生工作研究科
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>李 明</td>
                <td style={{ textAlign: "center" }}>
                  副部（处）长、学生生活园区管理服务中心主任（兼）
                </td>
                <td style={{ textAlign: "center" }}>
                  学生生活园区工作、“一站式”学生社区综合管理平台建设、书院制建设
                </td>
                <td style={{ textAlign: "center" }}>
                  学生生活园区管理服务中心
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </div>
    );
  }
}

export default Leader;
