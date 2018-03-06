import Vue from 'vue'
Vue.filter('date', function (thisDate) {
  var dateTime = new Date(thisDate)
  function addLeadingChars (string, nrOfChars, leadingChar) {
    string = string + ''
    return Array(Math.max(0, (nrOfChars || 2) - string.length + 1)).join(leadingChar || '') + string
  };
  Number.prototype.pad = function (len) {
    return (new Array(len + 1).join('0') + this).slice(-len)
  }

  return (dateTime.getMonth() + 1).pad(2) + '/' + dateTime.getDate() + '/' + dateTime.getFullYear() + ' ' + dateTime.toLocaleTimeString().replace(/:\d+ /, ' ')
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
