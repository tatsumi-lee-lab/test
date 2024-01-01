const numOfSong = 8
var save_page1 = [];
var save_page2 = "";
var save_page3 = [];
var save_video = new Array(2);
for (let x = 0; x < 2; x++){
  save_video[x] = new Array(numOfSong);
  for(let y = 0; y < numOfSong; y++){
    save_video[x][y] = "";
  }
}
var save_page4 = new Array(2);
for (let x = 0; x < 2; x++){
  save_page4[x] = new Array(numOfSong);
  for(let y = 0; y < numOfSong; y++){
    save_page4[x][y] = "";
  }
}

const consentPage = document.getElementById("consentPage");
const enterIDPage = document.getElementById("prolificIDPage");
const preSurveyPage = document.getElementById("preSurveyForm")
const surveyPage = document.getElementById("surveyPage");
const notConsentPage = document.getElementById("doesNotConsentPage");
const endPage = document.getElementById("endOfSurvey")

// ------------ PAGE1の処理 ------------ //
    // -- NEXTボタン処理 -- //
  window.onload = function(){
    // ラジオボタンのDOMを取得
    const consent = document.querySelectorAll("input[id=consent]");
    //console.log(consent[1].value)
    // disabledを切り替えるボタンのDOMを取得
    const button = document.getElementById("nextToProlificID");
    for (let element of consent){
      element.addEventListener('change', function(){
        if(this.checked){
          console.log(this.value)
          button.disabled = false
        }
      })
    }
  } 
    //  -- NEXT PAGE 処理 -- //
  function nextPage1() {
    const currentPage = document.querySelector(':checked').value;
    if (currentPage === 'agree') {
      consentPage.style.display = "none";
      enterIDPage.style.display = 'block';
    } else {
      consentPage.style.display = "none";
      notConsentPage.style.display = 'block';
    }
    save_page1.push(currentPage);
    console.log("save_page1: "+save_page1);
  }
// ------------ PAGE2の処理 ------------ //
  function isEntered(){
    const prolificID = document.getElementById("prolificID");
    const button = document.getElementById("nextToPreQuestions");
    let text = prolificID.value;
    console.log(text);
    if(text){
      button.disabled = false;
    }else{
      button.disabled = true;
    }
  }
  function nextPage2() {
    save_page2 = prolificID.value;
    console.log("save_page2: "+save_page2);
    enterIDPage.style.display = "none";
    preSurveyPage.style.display = "block";
  }

// ------------ PAGE3の処理 ------------ //
  // -- musicExperience のボタンが選択されているか -- //
    let flag_musicExperience = false; // 選択されているか否かを判定するフラグ
    let flag_musicalScore = false; // 選択されているか否かを判定するフラグ
    function isCheckedPage3ex(){
      // name=musicExperienceのラジオボタンのDOM取得
      const musicExperience = document.querySelectorAll("input[name = musicExperience]");
      //console.log(musicExperience)
      for(var i=0; i<musicExperience.length; i++){
        if(musicExperience[i].checked){
          flag_musicExperience = true;
          console.log("Question1: "+musicExperience[i].value);
        }
      }
      //console.log(flag_musicExperience, flag_musicalScore)
      if ((flag_musicExperience == true) && (flag_musicalScore == true)){
        document.getElementById("nextToSurveyQuestions").disabled = false;
      }
    }
  // -- musicalScore のボタンが選択されているか -- //
    function isCheckedPage3sc(){
      // name=musicalScoreのラジオボタンのDOM取得
      const musicalScore = document.querySelectorAll("input[name = musicalScore]");
      //console.log(musicalScore)

      for(var i=0; i<musicalScore.length; i++){
        if(musicalScore[i].checked){
          flag_musicalScore = true;
          console.log("Question2: "+musicalScore[i].value);
        }
      }
      //console.log(flag_musicExperience, flag_musicalScore)
      if ((flag_musicExperience == true) && (flag_musicalScore == true)){
        document.getElementById("nextToSurveyQuestions").disabled = false;
      }
    }
  // -- 次のページへの遷移 -- //
    function nextPage3(){
      save_page3.push(document.querySelector('input[name=musicExperience]:checked').value)
      save_page3.push(document.querySelector('input[name=musicalScore]:checked').value)
      console.log("save_page3: "+save_page3)
      preSurveyPage.style.display = "none";
      surveyPage.style.display = "block";
      showSurveyQuestions();
    }

// ------------ PAGE4の処理 ------------ //
  // -- テキスト・動画・ラジオボタンの表示 -- //
    function showSurveyQuestions() {
      //let videoContainer = document.getElementById("videoContainer");
      
      //動画の名前 video + [i] + [j] の[i]に入る値をrandomIdx2とし，ランダムにする
        var randomIdx1 = []
        for (let i = 1; i <= numOfSong; i++){
          var j = Math.floor(Math.random() * 2);
          randomIdx1.push(j)
        }
        console.log(randomIdx1)
      //動画の名前 video + [i] + [j] の[j]に入る値をrandomIdx1とし，ランダムにする
        var randomIdx2 = []
        for (var i = 1; i <= numOfSong; i++){
          randomIdx2.push(i)
        }
        //console.log(randomIdx)
        for (var i = randomIdx2.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = randomIdx2[i];
          randomIdx2[i] = randomIdx2[j];
          randomIdx2[j] = temp;
        }
        console.log(randomIdx2)

      // 8つの動画をランダムに表示
      // 動画を表示するコンテナ要素を取得
      const videoContainer = document.getElementById("videoContainer");
      // 動画のPATH
      const VIDEOPATH = "../videos/"

      const radioOptions = ['A', 'Rather A', 'Rather B', 'B'];
      const flag = new Array(numOfSong).fill("");
      console.log(flag[0])
      console.log(flag.indexOf(""))
      for (let i = 0; i < randomIdx1.length; i++) {
        // --- TEXT追加 --- //
          //動画の番号を表示する要素を作成
          const textElement = document.createElement("h3");
          textElement.textContent = "video" + randomIdx1[i] + randomIdx2[i]
          console.log(textElement)

        // --- 動画追加 --- //
          // 動画を表示する要素を作成
          const videoElement = document.createElement("video");
          // 各動画のsrc
          videoname = "video" + randomIdx1[i] + randomIdx2[i] + '.mp4';
          videoElement.src = "/static/videos/"+videoname
          videoElement.id = "video"+ randomIdx1[i] + randomIdx2[i];
          videoElement.controls = true;
          videoElement.addEventListener('playing', function(){
            console.log("playing")
            save_video[randomIdx1[i]][randomIdx2[i]-1] = "playing"
          })
          videoElement.addEventListener('ended', function(){
            console.log("ended")
            save_video[randomIdx1[i]][randomIdx2[i]-1] = "ended"
          })

        // --- ラジオボタン生成 --- //
          //ラジオボタンを表示する要素を作成
          const radioContainer = document.createElement("div");
          //selectionFlags[videoElement.id]= [];
          //console.log(selectionFlags)

          radioOptions.forEach(option => {
            const radio = document.createElement("input")
            radio.type = "radio"
            radio.name = "radio-video"+ randomIdx1[i] + randomIdx2[i];
            radio.value = option;
            radio.id = "radio-video"+ randomIdx1[i] + randomIdx2[i]+"-"+option;

            const label = document.createElement("label");
            label.textContent = option;
            label.htmlFor = radio.id

            // ラジオボタンのイベントリスナーを設定
            radio.addEventListener('change', function(){
              if(radio.checked){
                flag[i] = radio.id+":checked"
                save_page4[randomIdx1[i]][randomIdx2[i]-1] = radio.value
                console.log(flag)
                console.log("save_page4: "+ save_page4)
              }
              if (flag.indexOf("") == -1){  // すべてのQが選択された
                button = document.getElementById("nextToEndOfPage")
                button.disabled = false
              }
            })

            radioContainer.appendChild(radio);
            radioContainer.appendChild(label);
          });


        // text要素と動画要素をコンテナに追加
          videoContainer.appendChild(textElement);
          videoContainer.appendChild(videoElement);
          videoContainer.appendChild(radioContainer);

        // 点線の境界
          let line = document.createElement("hr");
          line.style="border:none;border-top:dashed 1px;height:1px;width:100%;"
          document.getElementById("videoContainer").appendChild(line);
      }
    }

  // -- 次のページへの遷移  + すべての情報の保存-- //
    function nextPage4(){
      surveyPage.style.display = "none";
      endPage.style.display = "block";

      var jsonData=[
        {'Consent'  : save_page1,
        'ProlificID'  : save_page2,
        'preQuestions'  : save_page3,
        'videoPlaing' : save_video,
        'surveyQuestions'  : save_page4}
      ]
      try {
        JSON.stringify(jsonData);
      } catch (error) {
        console.error("JSONデータが正しくありません", error);
        return;
      }
      console.log(jsonData)
      
      
      fetch('/receive_json',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(jsonData),
      })
      .then(response => {
        if (response.ok) {
            console.log("JSONデータが正常に送信されました");
        } else {
            console.error("エラーが発生しました");
        }
    })
    .catch(error => {
        console.error("ネットワークエラー:", error);
    });
    }


// ------------ PAGE5の処理 ------------ //

