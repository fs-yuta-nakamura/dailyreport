function copyText(text){
  var ta = document.createElement("textarea")
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  document.execCommand("copy")
  ta.parentElement.removeChild(ta)
}

var setDefaultDate = function(){
  // set today's date as default date'
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var toTwoDigits = function(num, digit){
    num  += '';
    if (num.length < digit){
      num = '0' + num ;
    }
    return num;
  }
  var yyyy = toTwoDigits(year, 4);
  var mm = toTwoDigits(month, 2);
  var dd = toTwoDigits(day, 2);
  var ymd = yyyy + "-" + mm + "-" + dd;
  return ymd
      }

var app = new Vue({
  el: "#app-main",
  data: {
    date: setDefaultDate(),
    commitNum: "",
    commitReview: "",
    todayIdenshi: "",
    idenshiReview: "",
    tomorrowIdenshi: "",
    calendar: "",
    result: false
  },
  computed: {
    nippo: function (){
     nippo_text = `お疲れ様です。
中村です。
${this.month}月${this.day}日(${this.week})の日報です。

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

・振り返り (${this.commitNum})
${this.commitReview}


■本日意識した遺伝志
「${this.todayIdenshi}」

・振り返り
${this.idenshiReview}


■明日意識する遺伝志
「${this.tomorrowIdenshi}」


■本日の流れ
${this.calendar}


■文字数
XXX字


■【シラバス】学習進捗確認表
https://docs.google.com/spreadsheets/d/1kgZgrhEhfshn5jZQ2rXrJ1C59IvfoRnznHBZ0WJ1qdY/edit#gid=1451509297
  \`\`\` `

     return  nippo_text.replace("XXX", this.lengthNippo(nippo_text));
    },
    commitLength: function() {
      return this.commitReview.replace(/[\s\n]+/g, "").length
    },
    idenshiLength: function() {
      return this.idenshiReview.replace(/[\s\n]+/g, "").length
    },
    calendarLength: function() {
      return this.calendar.replace(/[\s\n]+/g, "").length
    },
    jsDate: function(){
      return new Date(this.date);
    },
    month: function(){ 
      return this.jsDate.getMonth() + 1 },
    day: function(){
      return this.jsDate.getDate() },
    week: function(){
      return '日月火水木金土'[this.day] }
  },
  methods: {
    lengthNippo: function(nippo) {
      var startIndex = nippo.indexOf("```") + 3;
      var lastIndex = nippo.lastIndexOf("```") - 1;
      var mainContent = nippo.substring(startIndex, lastIndex);
      mainContent = mainContent.replace(/[\s\n]+/g, "");
      return mainContent.length;
    },
    makeNippo: function(){
      copyText(this.nippo);
      this.result = true;
      this.$nextTick(function(){
        document.getElementById("result").scrollIntoView({behavior: "smooth", block: "start"});
      })
    },
    saveData: function(){
      localStorage.setItem("datalist", JSON.stringify(this.$data)) 
    },
    loadData: function(){
      savedData = JSON.parse( localStorage.getItem("datalist") ) || [];
      app.commitReview = savedData.commitReview;
    }
  } 
})
/*
// vue 
Vue.component('text-review', {
  props: ['title'],
  data: function() {
    return {
      message: ""
    }
  },
  computed: {
    length: function(){
      return this.message.replace(/[\s\n]+/g, "").length
    }
  },
  template: `
  <div class="text-review">
  <label v-bind:for="title"><slot></slot></label>
  <span class="mojisu">{{length}}文字</span>
  <textarea v-bind:id="title" v-model="message" rows="10"></textarea>
  </div>
  `
}
)
*/
