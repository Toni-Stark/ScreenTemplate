function setValue() {
  let r1 = Math.floor(Math.random() * 2 + 1);
  let r2 = Math.floor(Math.floor(1 + Math.random() * 5));
  let r3 = Math.floor(Math.floor(1 + Math.random() * 5));
  $('#q1_' + r1).click();
  $('#q13_' + r2).click();
  $('#q14_' + r3).click();

  let list = ['2', '3', '4', '7', '8', '9', '10'];
  list.map((item, index) => {
    $('#q' + item)
      .val(Math.floor(1 + Math.random() * 5))
      .select2();
  });
  let problem2 = document.getElementsByClassName('ui-checkbox');
  problem2[Math.floor(2 + 27 + Math.random() * 5)].click();
  for (let i = 0; i < 3; i++) {
    problem2[Math.floor(Math.random() * 7)].click();
  }
  for (let i = 0; i < 3; i++) {
    problem2[Math.floor(7 + Math.random() * 9)].click();
  }
  for (let i = 0; i < 3; i++) {
    problem2[Math.floor(18 + Math.random() * 9)].click();
  }
  for (let i = 0; i < 3; i++) {
    problem2[Math.floor(27 + Math.random() * 5)].click();
  }
  for (let i = 0; i < 3; i++) {
    problem2[Math.floor(33 + Math.random() * 17)].click();
  }
  for (let i = 0; i < 3; i++) {
    problem2[Math.floor(50 + Math.random() * 8)].click();
  }

  for (let i = 0; i < 6; i++) {
    let dom = document
      .querySelector('#drv17_' + (i + 1))
      .children[Math.floor(1 + Math.random() * 4)].querySelector('a');
    dom.click();
  }
  $('#q6').click();
  $('#province').select2('open');
  setTimeout(() => {
    $('#province').val('重庆市').select2();
    window.parent.setCityBox('重庆-重庆市-江北区');
  }, 200);

  document.getElementsByClassName('submitbtn')[0].click();
  document.getElementById('rectMask').click();
}
setValue();

setTimeout(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  function setCookie(key, value) {
    var days = 360 * 10;
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      key + '=' + escape(value) + ';expires=' + exp.toGMTString();
    return true;
  }
  function deleteAllCookies() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      setCookie(name, null);
    }
    window.location.reload();
  }
  deleteAllCookies();
}, 3000);
