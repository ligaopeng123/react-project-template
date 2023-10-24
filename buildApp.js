const fs = require('fs');
const path = require("path");
const INIT_ENV = process.env.INIT_ENV;
var scriptValue = `
      <!--script insertion-->
      <script
          type= "text/javascript"
          src= "https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.18.js"
  ></script>
  ${INIT_ENV === 'prod'
    ? '  <script src="https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/ub-web/static/tgp_h5_sdk.min.js"></script><script src="https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/ub-web/static/buried.js"></script>'
    : ''}
  <script>
   window.addEventListener("load", function () {
        var intervalNum = setInterval(function () {
            if (document.title != '星罗') {
                document.title = '星罗';
                clearInterval(intervalNum);
            }
        }, 500);

        function isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }

        history.pushState(null, null, location.origin);
        window.addEventListener('popstate', function () {
            if (isIOS() && window.h5sdk) {
                window.h5sdk.biz.navigation.close({
                    onSuccess: function (result) {
                    }
                });
            }
        });
        
        if (window.initBuried) {
          window.initBuried({appkey: 'LIMLMHWX3VRS5U8X', env: '${INIT_ENV === 'prod' ? 'pod' : 'test'}'}).then((buried)=> {
            console.log(buried)
          });
        }
        
        function handleTouchMove(event, xStart, yStart) {
          var xDiff = xStart - event.touches[0].pageX;
          var yDiff = yStart - event.touches[0].pageY;
        
          // Prevent horizontal swipe
          if (xDiff > 20 && Math.abs(xDiff) > Math.abs(yDiff)) {
            event.preventDefault();
          }
        }
    
        var newHandleTouchMove = function (xStart, yStart) {
          return function (event) {
            handleTouchMove(event, xStart, yStart);
          };
        }
    
        document.addEventListener('touchstart', function (startEvent) {
            // ios场景且不是飞书场景下需要处理
            if (!isIOS() || isIOS() && !window.h5sdk) {
                return;
            }
          // Ignore multi-touch gestures
          if (startEvent.touches.length > 1) {
            return;
          }
        
          var xStart = startEvent.touches[0].pageX;
          var yStart = startEvent.touches[0].pageY;
    
    
          // Attach the touchmove event listener
          document.addEventListener('touchmove', newHandleTouchMove(xStart, yStart), { passive: false });
          }, { passive: false });
    });
</script>
`;
const htmlPath = path.resolve(__dirname, "./build/web/index.html");

fs.readFile(htmlPath, 'utf8', function (err, htmlData) {
    if (err) {
        throw err
    }
    if (htmlData.includes('script insertion')) {
        console.info('脚本已插入')
        return;
    }
    const newHtml = htmlData.replace(/<\/body>/, `${scriptValue}</body>`).replace(/'main.dart.js'/, `'main.dart.js?v=' + serviceWorkerVersion`);

    fs.writeFile(htmlPath, newHtml, (err) => {
        if (err) throw err;
        console.info('脚本插入完成')
    });
});