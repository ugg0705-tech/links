// タップ/クリックでボタンを凹ませ、凹んだのが見えてからリンク先へ移動する
(function () {
  var PRESS_MS = 140;

  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('pointerdown', function () {
      btn.classList.add('is-pressed');
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (type) {
      btn.addEventListener(type, function () {
        btn.classList.remove('is-pressed');
      });
    });

    btn.addEventListener('click', function (e) {
      // Ctrl/⌘クリックや中クリックはブラウザ標準の動作に任せる
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      btn.classList.add('is-pressed');
      setTimeout(function () {
        btn.classList.remove('is-pressed');
        // 同じタブで開く: スマホではX・Threadsアプリが入っていればアプリが開く
        window.location.href = btn.href;
      }, PRESS_MS);
    });
  });

  // 戻るボタンで戻ったとき、凹んだままにならないようにする
  window.addEventListener('pageshow', function () {
    document.querySelectorAll('.btn.is-pressed').forEach(function (b) {
      b.classList.remove('is-pressed');
    });
  });
})();
