function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatDistance(num) {
  　if (num < 1000) {
    　　return num.toFixed(0) + 'm';
  　} else if (num > 1000) {
    　　return (num / 1000).toFixed(1) + 'km';
  　}
}

module.exports = {
  formatTime, formatNumber, formatDistance
}
