
var makeNippo = function(){
var date = new Date(document.getElementById("date").value);
var month = date.getMonth() + 1;
var day = date.getDate();
var week = '日月火水木金土'[date.getDay()];
var commitNum = document.getElementById("commitment").value;
var commitReview = document.getElementById("commit-review").value
var todayIdenshi = document.getElementById("idenshi").value;
var idenshiReview = document.getElementById("idenshi-review").value;
var tomorrowIdenshi = document.getElementById("tmr-idenshi").value;
var calendar = document.getElementById("calendar").value;

var nippo = `お疲れ様です。
中村です。
${month}月${day}日(${week})の日報です。

岩本さん、楢木さん
お手すきの際にご確認よろしくお願い致します。
@岩本 俊亮 @楢木 稜二

岩本HDの皆様よろしくお願いします。
@襲田 絢香 @瀧口 賢治

\`\`\`
中村優太＠fsに1番貢献している人間になる


■月次目標
「時間の使い方を改善する」

・コミットメント
1. すべてのタスクの期日を明確に切る
2. タスクの期日は必ず守る
3. 時間の使い方を計画する
4. 時間あたりの生産性を意識する
5. 時間のポートフォリオを意識する

・振り返り (${commitNum})
${commitReview}


■本日意識した遺伝志
「${todayIdenshi}」

・振り返り
${idenshiReview}


■明日意識する遺伝志
「${tomorrowIdenshi}」


■本日の流れ
${calendar}


■文字数
XXX字
    

■【シラバス】学習進捗確認表
https://docs.google.com/spreadsheets/d/1kgZgrhEhfshn5jZQ2rXrJ1C59IvfoRnznHBZ0WJ1qdY/edit#gid=1451509297
\`\`\` `

nippo = nippo.replace("XXX", lengthNippo(nippo));
copyText(nippo);

document.getElementById("result").style.display="block";
document.getElementById("result-info").style.display="block";


var result = document.getElementById("result");
var resultText = document.getElementById("result-text");
resultText.innerText = nippo;
result.scrollIntoView({behavior: "smooth", block: "start"});
}



var lengthNippo = function(nippo) {
  var startIndex = nippo.indexOf("```") + 3;
  var lastIndex = nippo.lastIndexOf("```") - 1;
  var mainContent = nippo.substring(startIndex, lastIndex);
  mainContent = mainContent.replace(/[\s\n]+/g, "");
  console.log(mainContent);
  return mainContent.length;
}

function copyText(text){
	var ta = document.createElement("textarea")
	ta.value = text
	document.body.appendChild(ta)
	ta.select()
	document.execCommand("copy")
	ta.parentElement.removeChild(ta)
}

document.getElementById("make").onclick = function() {makeNippo()};
