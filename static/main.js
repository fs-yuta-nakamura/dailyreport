firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function copyText(text) {
  var ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.parentElement.removeChild(ta);
  M.toast({
    html: "クリップボードにコピーしました",
    displayLength: 2000,
    inDuration: 500,
    outDuration: 375
  });
}

var setDefaultDate = function() {
  // set today's date as default date'
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day;
  var hours = date.getHours();
  console.log(hours);

  if (hours >= 0 && hours < 2) {
    day = date.getDate() - 1;
  } else {
    day = date.getDate();
  }

  var toTwoDigits = function(num, digit) {
    num += "";
    if (num.length < digit) {
      num = "0" + num;
    }
    return num;
  };
  var yyyy = toTwoDigits(year, 4);
  var mm = toTwoDigits(month, 2);
  var dd = toTwoDigits(day, 2);
  var ymd = yyyy + "-" + mm + "-" + dd;
  return ymd;
};

var downloadURL = function() {
  var content = "あいうえお";
  var blob = new Blob([content], { type: "text/plain" });
  var downloadLink = window.URL.createObjectURL(blob);
  document.getElementById("download").href = downloadLink;
};

function iftttWebhook(eventName, payload) {
  var postUrl = "/ifttt";
  console.log(payload),
    axios
      .post(postUrl, payload)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
}

// initialize materialize
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
});

//materialize modal
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, options);
});

var app = new Vue({
  el: "#app-main",
  data: {
    nippo: {
      date: setDefaultDate(),
      commitNum: "",
      commitReview: "",
      todayIdenshi: "",
      idenshiReview: "",
      tomorrowIdenshi: "",
      calendar: "",
      commitmemnts: [
        "自分に負荷をかける",
        "集中力を高める",
        "成長機会に貪欲になる",
        "自分から機会を取りに行く",
        "積極的な発信を行う"
      ],
      content: ""
    },
    result: false
  },
  created: function() {
    this.loadFromFirebase();
  },
  computed: {
    formatedNippo: function() {
      nippo_text = `お疲れ様です。
中村です。
${this.month}月${this.day}日(${this.week})の日報です。

岩本さん、楢木さん
お手すきの際にご確認よろしくお願い致します。
@岩本 俊亮 @楢木 稜二

岩本HDの皆様よろしくお願いします。
@襲田 絢香 @瀧口 賢治\`\`\`
中村優太＠fsに1番貢献している人間になる


■月次目標
「Andを取り続ける」

・コミットメント
1. ${this.nippo.commitmemnts[0]}
2. ${this.nippo.commitmemnts[1]}
3. ${this.nippo.commitmemnts[2]}
4. ${this.nippo.commitmemnts[3]}
5. ${this.nippo.commitmemnts[4]}

・振り返り (${this.nippo.commitNum})
${this.nippo.commitReview.trim()}


■本日意識した遺伝志
「${this.nippo.todayIdenshi}」

・振り返り
${this.nippo.idenshiReview.trim()}


■明日意識する遺伝志
「${this.nippo.tomorrowIdenshi}」


■本日の流れ
${this.nippo.calendar.trim()}


■【シラバス】学習進捗確認表
https://docs.google.com/spreadsheets/d/1kgZgrhEhfshn5jZQ2rXrJ1C59IvfoRnznHBZ0WJ1qdY/edit#gid=1451509297\`\`\` `;

      return nippo_text.replace("XXX", this.lengthNippo(nippo_text));
    },
    commitLength: function() {
      return this.nippo.commitReview.replace(/[\s\n]+/g, "").length;
    },
    idenshiLength: function() {
      return this.nippo.idenshiReview.replace(/[\s\n]+/g, "").length;
    },
    calendarLength: function() {
      return this.nippo.calendar.replace(/[\s\n]+/g, "").length;
    },
    jsDate: function() {
      return new Date(this.nippo.date);
    },
    month: function() {
      return this.jsDate.getMonth() + 1;
    },
    day: function() {
      return this.jsDate.getDate();
    },
    week: function() {
      return "日月火水木金土"[this.jsDate.getDay()];
    },
    file_name: function() {
      return (
        "" +
        this.nippo.date.slice(5, 7) +
        this.nippo.date.slice(8, 10) +
        "_日報"
      );
    }
  },
  methods: {
    lengthNippo: function(nippo) {
      var startIndex = nippo.indexOf("```") + 3;
      var lastIndex = nippo.lastIndexOf("```") - 1;
      var mainContent = nippo.substring(startIndex, lastIndex);
      mainContent = mainContent.replace(/[\s\n]+/g, "");
      return mainContent.length;
    },
    makeNippo: function() {
      copyText(this.formatedNippo);
      this.result = true;
      this.$nextTick(function() {
        document
          .getElementById("result")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      });
      // send to ifttt
      iftttWebhook("nippo_submit", {
        value1: this.nippo.date,
        value2: this.formatedNippo
      });
      this.saveToFirebase();
    },
    saveData: function() {
      localStorage.setItem("datalist", JSON.stringify(this.nippo));
    },
    loadData: function() {
      savedData = JSON.parse(localStorage.getItem("datalist") || "[]");
      console.log(savedData);
      app.nippo = savedData;
    },
    download: function() {
      var blob = new Blob([this.formatedNippo], { type: "text/plain" });
      var downloadLink = window.URL.createObjectURL(blob);
      this.$nextTick(function() {
        document.getElementById("download").href = downloadLink;
      });
    },
    saveToFirebase: function() {
      db.collection("nippos")
        .doc(this.nippo.date)
        .set({
          timestamp: new Date(),
          nippo: this.nippo,
          formated: this.formatedNippo
        })
        .then(function() {
          console.log("saved to Firebase");
        })
        .then(function() {
          M.toast({
            html: "保存しました",
            displayLength: 2000,
            inDuration: 500,
            outDuration: 375
          });
        });
    },
    loadFromFirebase: function() {
      db.collection("nippos")
        .doc(this.nippo.date)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            this.nippo = doc.data().nippo;
          }
        })
        .then(function() {
          M.toast({
            html: "ロードしました",
            displayLength: 2000,
            inDuration: 500,
            outDuration: 375
          });
        });
    }
  }
});
// add shortcut for saving data
shortcut.add("Ctrl+S", app.saveToFirebase);
