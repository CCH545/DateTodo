
const hidePage = `body > :not(.beastify-image) {
  display: none;
}`;

// import* as "../content-scripts/node_modules/fs"

var today=new Date();//获取当前时间
var year=today.getFullYear();//获取当前的年份
var month=today.getMonth()+1;//获取当前月
var day=today.getDate();//获取当前月
var allday=0;
function showmonth(){
  var year_month=year+"年"+month+"月";
  document.getElementById("month").innerHTML=year_month;//显示当前的年月日
}

function count(){
  if(month!=2)
  {
  if(month==4||month==6||month==9||month==11)//判断是否是相同天数的几个月，二月除外
      allday=30;
    else
    allday=31;
  }
  else
  {
    if((year%4==0&&year%100!=0)||(year%400==0))//判断是否是闰年，进行相应的改变
    allday=29;
    else 
    allday=28;}
}

function day_date(xinqi){
  var dayList = []
  var res = []
  for (let i = 1; i <= xinqi; i++) {
    dayList.push(0)
  }
  for (let d = 1; d <= allday; d++) {
    dayList.push(d);
  }
  for (let emp = 1; emp <= 42-allday-xinqi; emp++) {
    dayList.push(0);
  }
  
  var row = 0
  for (let r = 0; r < dayList.length; r++) {
    if (r%7==0) {
      if (r!=0) {
        row++
      }
      var rowList = [];
      res.push(rowList)
      res[row].push(dayList[r])
    }else{
      res[row].push(dayList[r])
    }
  }
  return res;
}

function input_day_dete(data){
  
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      if (i==5) {
        continue
      }else{
        var r = parseInt(i)+1
        var c = parseInt(j)+1
      }
      var day = document.getElementsByClassName("row:" + r + "_" + "clo:" + c)
      if (data[i][j] == 0) {
        var textNode = document.createTextNode("")
      }else{
        var textNode = document.createTextNode(data[i][j])
      }
      day[0].appendChild(textNode)
    }
    
  }
}

//显示相应月份的天数
function showday(){	  
  showmonth();
  count();
  var fistdate=new Date(year,month-1,1);
  var xinqi=fistdate.getDay();
  var daterow=document.getElementById("day");
  var row = 1;
// 创建行列空格
  for(var k=1;k<=42;k++){
    if(k%7 == 0){
      rowElement = document.createElement("div");
      rowElement.className = "rowElement"+row;
      rowElement.style.display="flex"
      rowElement.style.flex = 1;
      rowElement.style.height = "42px";
      rowElement.style.lineHeight = "42px";
      rowElement.style.marginTop = "0px";
      rowElement.style.marginBottom = "0px";
      daterow.appendChild(rowElement)
      
      for(var clo=1; clo<=7; clo++){
        var item = document.createElement("div");
        item.className = "row:" + row +"_"+ "clo:" + clo;
        item.style.flex = 1;
        item.style.height = "42px";
        item.style.lineHeight = "42px"
        item.style.backgroundColor="#f1f1f1";
        item.style.border = "solid 1px #e5e5e5";
        item.style.marginTop = "0px";
        item.style.marginBottom = "0px";
        var divId = document.getElementsByClassName("rowElement"+row)
        divId[0].appendChild(item)
      }
      row++
    }
  }
  var dayDate = day_date(xinqi)
  input_day_dete(dayDate)
  setCurrentDay(xinqi)
}

function setCurrentDay(xinqi){
  var today = xinqi+day
  var rowNum = Math.floor(today/7)+1
  var cloNum = today%7
  var currentDay = document.getElementsByClassName("row:"+ rowNum + "_"+ "clo:"+cloNum)
  currentDay[0].style.color = "red"
  // console.log("currentDay.innerHTML", currentDay.innerHTML)
  // console.log("day:", day)
  // console.log("rowNum:", rowNum)
  // console.log("cloNum:", cloNum)
}

function days2List(){
  var dayList = []
  for (var i = 1; i <= allday; i++) {
    var element = i;
    dayList.push(element)
  }
  return dayList
}

function isInDaysList(compare1, compare2){
  var isTrue = false
  if(compare1 == "object"){
    for (var i = 0; i < compare1.length; i++) {
      var element = compare1[i];
      if(compare2.toString() == element.toString()){
        isTrue = true
      }
    }
  }else{
    if(compare1.toString() == compare2.toString()){
      isTrue = true
    }
  }
  return isTrue
}

function createLi(){
  var inputVal = document.getElementById("inputBox").value
  var ulElement = document.getElementById("ULE")
  
  // 创建list
  var liElement = document.createElement("li")
  liElement.className = "to-do-item"
  var liElementCheckBox = document.createElement("input")
  liElementCheckBox.type = "checkBox"
  liElementCheckBox.checked = "false"
  liElementCheckBox.className = "liElementCheckBox"
  var spanElement = document.createElement("span")
  var liText = document.createTextNode(inputVal)
  spanElement.appendChild(liText)
  spanElement.className = "spanElement"
  



  liElement.appendChild(liElementCheckBox)
  liElement.appendChild(spanElement)
  ulElement.append(liElement)

  // 清楚input内容
  document.getElementById("inputBox").value = ""
}

function listen_for_click(){
  document.addEventListener("click", function(e){
    var targets = e.target.id
    var contentText = e.target.innerHTML
    if(targets == "pervM"){
      console.log("上一个月")
    }else if (targets == "nextM") {
      console.log("下一个月")
    }else if(targets == "submit"){
      createLi()
    } else {
      var daysList = days2List()
      var isTrue = isInDaysList(daysList, contentText)
      if(isTrue){
        console.log("选择日期:", contentText)
      }
    }
    //     //点击下个月
    // function next(){
    //   console.log("点击下个月")
    //     // document.getElementById('day').innerHTML ="";
    //     // if(month<12){  
    //     //   month=month+1;
    //     // }
    //     // else{  
    //     //   month=1;
    //     //   year=year+1; 
    //     // }
    //     // document.getElementById('div').innerHTML =showday();    
    // }
    //     //点击上个月
    // function shang(){
    //   console.log("点击上个月")
    //       // document.getElementById('day').innerHTML ="";
    //       // if(month>1){
    //       //   month=month-1;
    //       // }
    //       // else{
    //       //   month=12;
    //       //   year=year-1; 
    //       // }
    //       // document.getElementById('div').innerHTML =showday();    
    // }


  })
}



var jsonURL = "logData.json"



function readJson(url){
  var res = ""
  var rJson = new XMLHttpRequest();
  rJson.open("get", url);
  rJson.send(null)
  rJson.onload = function(){
    if (rJson.status == 200) {
      res = JSON.parse(rJson.responseText);
      var rescontent = JSON.stringify(res);
      var path = window.location.href
      path = path.toString()
      path = path.slice(-17,-10)
      console.log(path)
      return rescontent
    }else{
      return "读取失败"
    }
  }
}

function aa(){
  var aa = bb()
  console.log(aa);
}


res = readJson(jsonURL);
showday();
aa()
listen_for_click();