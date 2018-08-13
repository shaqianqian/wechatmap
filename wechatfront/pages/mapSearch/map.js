// map.js
let markerData = require('../../resources/gis-school')
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js')
var qqmapsdk;
// function formatDistance(num) {
//   if (num < 1000) {
//     return num.toFixed(0) + 'm';
//   } else if (num > 1000) {
//     return (num / 1000).toFixed(1) + 'km';
//   }
// }
Page({
  data: {
    scale:16,
    resData: [],
    position: '',
    centerX:113.3245211,
    centerY:23.10229,
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/image/location-control.png',
      position: {
        left: 0,
        top:10,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')

  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'HHEBZ-FHS6W-AHWRK-RGF5M-P67JK-RTFNS'
    });
    let that = this
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success:(res)=>{
          // console.log(res)
            let latitude = res.latitude; 
            let longitude = res.longitude; 
            let marker=this.createMarker(res);
            this.setData({
                centerX:longitude,
                centerY:latitude,
            })
       
        }
    });
  },

  markertap(e) {
    let marker = this.getMarker(e.markerId);
    wx.openLocation({
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude),
      name: marker.name,
     
    })
  },


  bindcontroltap(e) {
    this.setData({
      centerX: this.data.centerX,
      centerY: this.data.centerY,
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  createMarker(point){
    let latitude = point.latitude; 
    let longitude = point.longitude; 
    let marker= {
      iconPath: "/image/location.png",
      id:point.id || 0,
      name:point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 25,
      height: 48
    };
    return marker;
  },
  getMarker(id) {
    let markers = this.data.markers
    for (let item of markers) {
    
      if(item.id==id){
        return item
        break
        }
    }
 
  },
  // getMarkers() {
  //   let markers = [];
  //   for (let item of markerData) {
  //     let marker = this.createMarker(item);
  //     markers.push(marker)
  //   }
  //   return markers;
  // },
  searchClick: function () {
    var that = this

    // 调用接口
    qqmapsdk.search({
    
      keyword: this.data.position,
      page_size: 20,
      success: function (res) {
        // console.log(res);
        var resData = res.data;

        for (var i = 0; i < resData.length; i++) {
          resData[i]._distance = util.formatDistance(resData[i]._distance);//转换一下距离的格式
        }
        that.setData({ resData: res.data });
        that.setData({ markers: that.getMarkersFromRes()});
        console.log(that.data.markers)
        // console.log(res.data);
        
      },
      fail: function (res) {
        console.log(res);
      },


    })
  },
  search: function (e) {
    this.setData({
      position: e.detail.value
    })

  },
  createMarkerfromRes(point) {
    let marker = {
      iconPath: "/image/location.png",
      id: point.id || 0,
      name: point.title || '花花',
      latitude: point.location.lat,
      longitude: point.location.lng,
      width: 25,
      height: 48
    };
    return marker;
  },
  getMarkersFromRes() {
    let markers = [];
    
    for (let item of this.data.resData) {
      let distance = item._distance
      let marker = {
        iconPath: "/image/location.png",
        id: item.id || 0,
        name: item.title +" "+item._distance+"地址"+item.address,
        latitude: item.location.lat,
        longitude: item.location.lng,
        width: 25,
        height: 48
      };
      markers.push(marker)
     
    }
   
  
    return markers;
  },

})