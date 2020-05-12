(function () {
    var setting = {"height":238,"width":1203,"zoom":17,"queryString":"Международный университет информационных технологий, Manas Street, Almaty, Kazakhstan","place_id":"ChIJrYF1Ai9pgzgRY35DVg90JiQ","satellite":false,"centerCoord":[43.23512866493094,76.90948315000001],"cid":"0x2426740f56437e63","lang":"en","cityUrl":"/kazakhstan/almaty-10297","cityAnchorText":"Map of Almaty, Almaty Region, Kazakhstan","id":"map-9cd199b9cc5410cd3b1ad21cab2e54d3","embed_id":"207766"};
    var d = document;
    var s = d.createElement('script');
    s.src = 'https://1map.com/js/script-for-user.js?embed_id=207766';
    s.async = true;
    s.onload = function (e) {
      window.OneMap.initMap(setting)
  };
  var to = d.getElementsByTagName('script')[0];
  to.parentNode.insertBefore(s, to);
})();