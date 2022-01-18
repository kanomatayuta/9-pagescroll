// イージング関数
const Ease = {
  // 途中で加速し、減速する
  easeInOut: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; }
}

// アニメーションのスピード設定
const duration = 1000;
// Webページが読み込まれらイベント実行
window.addEventListener('DOMContentLoaded', function () {
  // スムーススクロールのトリガーを取得
  const smoothScrollTriggers = document.querySelectorAll('a[data-scroll]');
  //繰り返し処理：配列のすべての要素に対してコールバック関数を実行
  smoothScrollTriggers.forEach(function (smoothScrollTrigger) {
    // トリガーをクリックした時にイベント実行
    smoothScrollTrigger.addEventListener('click', function (e) {
      // data属性の値を取得
      const dataVal = smoothScrollTrigger.getAttribute('data-scroll');
      // 現在のスクロール位置を取得（クロスブラウザに対応）
      // Firefoxはdocument.documentElementオブジェクト,Safari,Chromeはdocument.bodyオブジェクト
      const currentPostion = document.documentElement.scrollTop || document.body.scrollTop;
      // スクロール先の要素を取得
      const targetElement = document.getElementById(dataVal);
      // スクロール先の要素が存在する場合はスムーススクロールを実行
      if (targetElement) {
        // スクロール先の要素の位置を取得
        const targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top;
         // スタート時点の時間(ミリ秒単位)を取得
         const startTime = performance.now();

        // アニメーションのループを定義
        const loop = function (nowTime) {
          // スタートからの経過時間を取得
          const time = nowTime - startTime;
          // duration を1とした場合の経過時間を計算
          const normalizedTime = time / duration;
          // duration に経過時間が達していない場合はアニメーションを実行
          if (normalizedTime < 1) {
            // 経過時間とイージングに応じてスクロール位置を変更
            window.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * Ease.easeInOut(normalizedTime)));
            // アニメーションを継続
            requestAnimationFrame(loop);
            // duration に経過時間が達したら、アニメーションを終了
          } else {
            window.scrollTo(0, targetPosition);
          }
        }
        // アニメーションをスタート
        requestAnimationFrame(loop);
      }
    });
  });
});