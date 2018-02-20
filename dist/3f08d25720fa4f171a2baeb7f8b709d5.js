// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
// console.log("hello world");
//　取得したい年月設定（とりあえずPC時間の今日の年月）
var y = new Date().getFullYear();
var m = new Date().getMonth() + 1;

// 初期設定
var feb_date = y % 4 == 0 && y % 100 != 0 ? 29 : 28; //閏年
if (y % 400 == 0) {
  feb_date = 29;
};
var month_count = { 1: 31, 2: feb_date, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
var day_en = { d0: "sun", d1: "mon", d2: "the", d3: "wed", d4: "thu", d5: "fri", d6: "sat" };
var m_display = m < 10 ? "0" + String(m) : m; //10以下の月は01月とかにする
var last_day = new Date(y, m - 1, month_count[m]).getDay(); //getDayは曜日取得。0 (日曜日) ～ 6 (土曜日) 。月の最後の日の曜日
var first_day = new Date(y, m - 1, 1).getDay(); //月の始めの日の曜日
var w = 1; //w週目
var d = first_day; //月の始めの日の曜日

console.log("AAAAAAAAAAAAA -> " + y);

// マークアップ生成
var txt = "";
txt += '<h1>' + y + '年' + m_display + '月のカレンダー</h1>';
txt += '<table summary="' + y + '年' + m_display + '月のカレンダー" class="calendar month' + m + '">'; //'<table summary=2018年02月のカレンダー class="calendar month 2>'
txt += '<tr>';
txt += '<th>SUN</th>';
txt += '<th>MON</th>';
txt += '<th>TUE</th>';
txt += '<th>WED</th>';
txt += '<th>THU</th>';
txt += '<th>FRI</th>';
txt += '<th>SAT</th>';
txt += '</tr>';

txt += '<tr class="week1">';
for (var j = 0; j < first_day; j++) {
  txt += '<td>&nbsp;</td>'; //1日までの空白
}
for (var i = 1; i <= month_count[m]; i++) {
  if (d != 0 && (first_day + i) % 7 == 1) {
    //月始めの曜日が日曜日ではない　かつ　(月初めの曜日+日付け)/7の余りが1の時 １週間めと２週目の変わりめの処理
    w++; //○週目を1増やす
    d = 0; //d=0は日曜日
    txt += '</tr>';

    txt += '<tr class="week' + w + '">';
  }
  var i_display = i < 10 ? "0" + String(i) : i; //日にちの0付き表現

  day_count = i % 7 == 0 ? Math.floor(i / 7) : Math.floor(i / 7) + 1; //Math.floor(x) xの斬り捨てた値の表示
  txt += '<td id="d' + y + m_display + i_display + '" class="' + day_en['d' + d] + day_count + ' date' + i + '">' + i + '</td>'; //'<td id="d20180201 class="mon1 date1">1</td>
  d++;
}

for (var j = 0; j < 6 - last_day; j++) {
  txt += '<td>&nbsp;</td>\n'; //月終わりに空白を入れる
}
txt += '</tr>';

txt += '</table>';

var test = document.getElementById('test'); //htmlファイルのid=testを持ってくる
test.innerHTML = txt; //id=testにtxtを入れ込む


// fetch("https://api.fixer.io/latest?base=USD").then(function(response) {
//   debugger
//   return response.json();
// }).then(function(json) {
//   debugger
//   var jpy = json.rates.JPY;
//   var date = json.date;
//   debugger
//   var test =  document.getElementById('test');
//   test.innerHTML = jpy + '<div>' + date;

// var date =  document.getElementById('date');
// date.innerHTML = '<h1>' + date + '</h1>';
// });
},{}],13:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '65297' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[13,6])
//# sourceMappingURL=/dist/3f08d25720fa4f171a2baeb7f8b709d5.map