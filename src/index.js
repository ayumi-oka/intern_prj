//　取得したい年月設定（とりあえずPC時間の今日の年月）
var y = new Date().getFullYear();
var m = new Date().getMonth()+1;
var today_red = new Date().getDate();

// 初期設定
var feb_date = (y%4 == 0 && y%100 != 0)?29:28;//閏年
if(y%400 == 0){feb_date = 29};
var month_count = {1:31,2:feb_date,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31}
var day_en = {d0:"sun",d1:"mon",d2:"the",d3:"wed",d4:"thu",d5:"fri",d6:"sat"};
var m_display = (m<10)?"0"+String(m):m;//10以下の月は01月とかにする
var last_day = new Date(y,m-1,month_count[m]).getDay();//getDayは曜日取得。0 (日曜日) ～ 6 (土曜日) 。月の最後の日の曜日
var first_day = new Date(y,m-1,1).getDay();//月の始めの日の曜日
var w = 1;//w週目
var d = first_day;//月の始めの日の曜日


// マークアップ生成
var txt = "";
txt += '<h1>' + y + '年' + m_display + '月のカレンダー</h1>';
txt += '<table summary="' + y + '年' + m_display + '月のカレンダー" class="calendar month' + m + '">';//'<table summary=2018年02月のカレンダー class="calendar month 2>'
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
for(var j=0;j<first_day;j++){
  txt += '<td>&nbsp;</td>';//1日までの空白
  }
for(var i=1;i<=month_count[m];i++){
  if(d != 0 && (first_day + i)%7 == 1){　//月始めの曜日が日曜日ではない　かつ　(月初めの曜日+日付け)/7の余りが1の時 １週間めと２週目の変わりめの処理
      w++;//○週目を1増やす
      d = 0;//d=0は日曜日
      txt += '</tr>';

      txt += '<tr class="week' + w + '">';
  }
  var i_display = (i<10)?"0"+String(i):i;//日にちの0付き表現

  day_count = (i%7 == 0)? Math.floor(i/7) : Math.floor(i/7) + 1 ;//Math.floor(x) xの斬り捨てた値の表示

  // 日付けが今日だったら色を変える
  // if (i == today_red) {
  //   txt += '<td id="d' + y + m_display + i_display + '" class="' + day_en['d'+d] + day_count + ' date' + i + ' red">' + i + '</td>';
  // } else {
  //   txt += '<td id="d' + y + m_display + i_display + '" class="' + day_en['d'+d] + day_count + ' date' + i + '">' + i + '</td>';
  // }

  if (i == today_red) {
  //  txt += '<td class = "red">'+i+'</td>';
    txt += '<td id="d' + y + m_display + i_display + '" class="' + day_en['d'+d] + day_count + ' date' + i + ' red">' + i + '</td>';
  }

  if (i != today_red) {
    txt += '<td id="d' + y + m_display + i_display + '" class="' + day_en['d'+d] + day_count + ' date' + i + '">' + i + '</td>';//'<td id="d20180201 class="mon1 date1">1</td>
  }

  d++;
}

for(var j=0;j<(6-last_day);j++){
  txt += '<td>&nbsp;</td>\n';//月終わりに空白を入れる
  }
txt += '</tr>';
txt += '</table>';

var calendar =  document.getElementById('calendar');//htmlファイルのid=testを持ってくる
calendar.innerHTML = txt; //id=calendarにtxtを入れ込む


//
fetch("https://api.fixer.io/latest?base=USD").then(function(response) {
  return response.json();
}).then(function(json) {

  //debugger
  var jpy = json.rates.JPY;
  var aud = json.rates.AUD;
  var date = json.date;

  var todayElem =  document.getElementById('today');
  var jpyElem = document.getElementById('jpy');
  var audElem =  document.getElementById('aud');

  todayElem.innerHTML = date;
  jpyElem.innerHTML = jpy;
  audElem.innerHTML =  aud;
});
