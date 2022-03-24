// 存储item的一些信息，直接渲染
import system_logo from "../assets/system_logo.png";
import office from "../assets/office.png";
import employment from "../assets/employment.png";
import psychological from "../assets/psychological.png";
import study_abroad from "../assets/study_abroad.png";
import funding from "../assets/funding.png";
import library from "../assets/library.png";
import theory from "../assets/theory.png";
import social_practice from "../assets/social_practice.png";

export default {
  error_code: 0,
  data: [
    {
      title: "天外天新闻网",
      icon: office,
      link: "https://news.twt.edu.cn/",
    },
    {
      title: "党建系统",
      icon: system_logo,
      link: "https://party.twt.edu.cn/",
    },

    {
      title: "就业中心",
      icon: employment,
      link: "https://job.tju.edu.cn/",
    },
    // {
    //   title: "心理中心",
    //   icon: psychological,
    //   link: "http://psycenter.tju.edu.cn/",
    // },
    {
      title: "资助中心",
      icon: funding,
      link: "http://tjuzzzx.tju.edu.cn/",
    },
    // {
    //     "title": "出国留学",
    //     "icon": study_abroad,
    //     "link": "https://www.twt.edu.cn/abroad.html",
    // },
    // {
    //     "title": "图书馆",
    //     "icon": library,
    //     "link": "https://www.lib.tju.edu.cn/",
    // },
    {
      title: "理论答题",
      icon: theory,
      link: "https://theory.twt.edu.cn/",
    },
    {
      title: "社会实践",
      icon: social_practice,
      link: "http://www.tju.edu.cn/info/1116/1353.htm",
    },
    {
      title: "第二课堂",
      icon: library,
      link: "http://202.113.5.169/extraEdu",
    },
  ],
  message: "success",
};
