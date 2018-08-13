//location.js
//获取应用实例
var app = getApp()
// function formatDistance(num) {
//   　if (num < 1000) {
//     　　return num.toFixed(0) + 'm';
//   　} else if (num > 1000) {
//     　　return (num / 1000).toFixed(1) + 'km';
//   　}
// }

Page({
    data: {
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园',
      desc: '我现在的位置'
    }],
    covers: [{
      latitude: 23.099794,
      longitude: 113.324520,
      iconPath: '../../images/wechart.png',
      rotate: 10
    }, 
    {
      latitude: 23.099298,
      longitude: 113.324129,
      iconPath: '../../images/wechart.png',
      rotate: 90
    }]
  },
  onLoad: function () {
    console.log('地图定位！')
    var that = this
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          console.log(res.data)
            var latitude = res.latitude; 
            var longitude = res.longitude; 
            wx.openLocation({
              latitude:latitude,
              longitude:longitude,
              scale:1
            })
        }
    });
  },
})

