import React, { Component } from "react";
class Tel extends Component {
  render() {
    return (
      <div className="overall">
        <figure style={{ margin:"0 auto" }}>
          <table style={{ margin:"0 auto",marginBottom:"2rem" }} className="pure-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  <strong>科室</strong>
                </th>
                <th style={{ textAlign: "center" }}>
                  <strong>办公电话</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>本科生工作科</td>
                <td style={{ textAlign: "center" }}>022-85356046</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>学生党建与研究生工作科</td>
                <td style={{ textAlign: "center" }}>022-85356046</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  本科生工作科和党建与研究生工作科
                </td>
                <td style={{ textAlign: "center" }}>022-85356046</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>综合事务科</td>
                <td style={{ textAlign: "center" }}>022-27406409</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>学生工作研究科</td>
                <td style={{ textAlign: "center" }}>022-85356229</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>少数民族学生教育管理科</td>
                <td style={{ textAlign: "center" }}>022-85356805</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>学生资助管理中心</td>
                <td style={{ textAlign: "center" }}>022-27403407</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>就业指导中心</td>
                <td style={{ textAlign: "center" }}>022-27401081</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>武装部</td>
                <td style={{ textAlign: "center" }}>022-27405514</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>心理健康教育中心</td>
                <td style={{ textAlign: "center" }}>022-85356619</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  学生生活园区管理服务中心
                </td>
                <td style={{ textAlign: "center" }}>022-27404948</td>
              </tr>
            </tbody>
          </table>
        </figure>
      </div>
    );
  }
}

export default Tel;
