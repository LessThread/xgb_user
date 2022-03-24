//这里实现与路由，URL相关的功能

export function getQueryVariable(variable) {
    //从地址栏URL获取指定参数“variable”
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

export function getNavTarget(navData, targetId, type) {
    //通过导航数据"navData"和目标栏目Id"targetId"，搜索并返回指定参数
    //type可选：lv1Title(一级导航标题),lv2Title(二级导航标题),lv1Id(一级导航id),lv2Id(二级导航id)
    //实现方法是从navData中各项的link(形如"/column?columnId=10")中取出id并比对
    if (navData && targetId && type) {

    } else {
        console.log("NavCtrl error:Some critical params are missing,plz check again");
        return false;
    }
}