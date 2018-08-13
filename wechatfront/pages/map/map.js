// map.js
let markerData = require('../../resources/gis-school')
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js')
var qqmapsdk;
function formatDistance(num) {
  if (num < 1000) {
    return num.toFixed(0) + 'm';
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + 'km';
  }
}
Page({
  data: {
    scale:8,
    resData: [],
    position: '',
    centerX:118.08243,
    centerY:24.44579,
    markers: [],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   },
    //     {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color:"#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
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
    console.info("onready")
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function findThePosition() {
  console.info("onload")
    qqmapsdk = new QQMapWX({
      key: 'TZHBZ-E7734-NADUC-XRD5T-PJQSS-5ZF5I'
    });
  
    console.log('地图定位！')
    let that = this
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success:(res)=>{
          console.log(res)
            let latitude = res.latitude; 
            let longitude = res.longitude; 
            let marker=this.createMarker(res);
            this.setData({
              centerX: longitude,
              centerY: latitude,
                
            })
            this.getUserPosition
            



        }
    });

    
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    let marker = this.getMarker(e.markerId);
    wx.openLocation({
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude),
      name: marker.name,
    })
  },

 
  controltap(e) {
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
  getMarkers() {
    let markers = [];
    for (let item of markerData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
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
  getMarkersFromRes(positions) {
    let markers = [];

    for (let item of positions) {
      let distance = item._distance
      let marker = {
        iconPath: "/image/location.png",
        id: item.id || 0,
        name: item.name + "  距离是" + util.formatDistance(item.distance),
        latitude: item.latitude,
        longitude: item.longitude,
        width: 25,
        height: 48
      };
      markers.push(marker)

    }
     console.log(markers)

    return markers;
  },

  searchClick: function () {
    var that = this

    // 调用接口
    qqmapsdk.search({
      keyword: this.data.position,
      page_size: 20,
      success: function (res) {
        console.log(res);
        var resData = res.data;

        for (var i = 0; i < resData.length; i++) {
          resData[i]._distance = formatDistance(resData[i]._distance);//转换一下距离的格式
        }
        that.setData({ resData: res.data });
        console.log(res.data);
        // wx.setStorage({
        //   key: "positions",
        //   data: res.data
        // })
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

  requestTestBtnClick:

    function () {
      let that = this
      wx.request({
        url: 'https://shaqianqian.xyz:8443/findClosestPositions', //仅为示例，并非真实的接口地址
        data: {
          lat: that.data.centerY,
          lon: that.data.centerX,
          quantitypositions:6

        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
         
          that.setData({ resData: res.data 
            , markers: that.getMarkers()
          });
          let positions = that.getMarkersFromRes(res.data)
          // console.log(that.getMarkers())
          console.log(res.data)
          that.setData({
            markers: positions
          });
          console.log(positions)
          

        }
      })

    },
onReady:function(){

    let that = this
    wx.request({
      url: 'https://shaqianqian.xyz:8443/auto', //仅为示例，并非真实的接口地址
      data: {
          name:'3',
          lat:that.data.centerY,
          lon: that.data.centerX,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

   
        console.log(res.data)


      }
    })


}

})