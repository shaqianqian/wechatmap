//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    data: {
      scale: 16,
      resData: [],
      position: '',
      centerX: 113.3245211,
      centerY: 23.10229,
      markers: [],
      controls: [{
        id: 1,
        iconPath: '/image/location-control.png',
        position: {
          left: 0,
          top: 10,
          width: 40,
          height: 40
        },
        clickable: true
      }]
    },
    flag:false,
    scale: 16,
    resData: [],
    position: '',
    centerX: 113.3245211,
    centerY: 23.10229,
    markers: [],
    motto: '易挥发的黑灰化肥会挥发',
    userInfo: {},
    appInfo:{
      logoUrl:'../../image/logo.png',
      title:'使用微信内置地图查看API定位'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../location/location'
    })
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.setData({
        appInfo:this.data.appInfo
    })

  
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })

    wx.getLocation({

      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
       
        let latitude = res.latitude;
        let longitude = res.longitude;
        that.setData({
          centerX: longitude,
          centerY: latitude,
        })
       

      }
    });
    
  },

})
