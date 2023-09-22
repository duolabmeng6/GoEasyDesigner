function init(store){
    var obj={}
    obj.store = []
    obj.store = store
    obj.新建 = function () {
        obj.store.list = [创建窗口()]
        obj.store.indexMap = {}
      }
    return obj
}

  
function 创建窗口() {
    return {
      "id": "1",
      "名称": "窗口",
      "组件名称": "窗口",
      "标题": "窗口",
      "top": "0",
      "left": "0",
      "width": "500",
      "height": "400",
      "background": "rgba(0, 0, 0, 0.05)",
      "禁止放置": false,
      "禁止拖动": true,
      "禁止": false,
      "可视": true,
      "层级": 0,
      "子组件": []
    }
  }
function paoge(){
    console.log('泡哥真帅啊')
}
export default{
    init
}