// pages/test/test.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js')
var qqmapsdk;
// function formatDistance(num) {
//   　if (num < 1000) {
//     　　return num.toFixed(0) + 'm';
//   　} else if (num > 1000) {
//     　　return (num / 1000).toFixed(1) + 'km';
//   　}
// }
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
  
    resData: [],
    position:'',
    itemGuide:'',
    scale: 16,
    resData: [],
    position: '',
    centerX: 113.3245211,
    centerY: 23.10229,
 

    
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')

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
          resData[i]._distance = util.formatDistance(resData[i]._distance);//转换一下距离的格式
        }
        that.setData({ resData: res.data });
        // console.log(res.data)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'HHEBZ-FHS6W-AHWRK-RGF5M-P67JK-RTFNS'
    });


    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        // console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        this.setData({
          centerX: longitude,
          centerY: latitude,
        })

      }
    });
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
     
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  openGuide: function (e) {
    let location=this.findAddressFromList(e.currentTarget.dataset.address)
    wx.openLocation({
      latitude: Number(location.location.lat),
      longitude: Number(location.location.lng),
      name: location.title,
    })
   },
   findAddressFromList(id) {
     let positions = this.data.resData
     for (var i = 0; i < positions.length; i++) {
       if (positions[i].id==id)
       {
         var location = positions[i]
         return location;
          break;
      }
     }

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})