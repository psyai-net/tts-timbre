<template>
  <!--  @click.capture="closeIsDrop"-->
  <div class="popUp-sound"   @click.stop.prevent="closeIsDrop">
    <div class="sound-title">{{titleTTS}}</div>
    <div class="sound-box">
      <div class="sound-collection animationDown" v-show="listCollect.length>0">
        <div class="sound-collection-title">我的收藏</div>
        <div class="sound-list animationTop">
          <ul>
            <li v-for="(item,index) in listCollect" :key="item.id" :class="listIndex==index+1000?'cur':''" @click="clickList(index+1000,item)">
              <div class="sound-state">
                <div class="sound-state-icon">
                  <img :src="speciality">
                </div>
                <div class="sound-collect">
                  <img :src="collect1" @click="collectFun(1,item)">
                  <div class="sound-collect-tips" @click="collectFun(1,item)">
                    取消收藏
                  </div>
                </div>
              </div>
              <div class="sound-content">
                <img :src="options.value.filter((selectD)=>selectD.value==item.dialect)[0].img">
                <span>{{item.name}}</span>
              </div>
              <div class="sound-type" :style="listIndex==index+1000 ? 'display: flex' : 'display: none'">
                <div class="sound-type-btn">
                  <span v-for="option in item.labelsText" :key="option.id">{{option}}</span>
                </div>
                <!--                <img :src="item.isShow?play:pause" @click="playAudio(item)">-->
                <img :class="[item.isShow?'':'cur']" :src="play" @click="playAudio(item)">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="sound-list-option  optionBox animationOpacity">
        <div class="sound-list-title ">音色列表</div>
        <div class="sound-right ">
          <div class="selected" @click="toggleDropdown(1)">
            <span>{{ selectedOption.desc }}</span>
            <img :src="arrows" :class="['arrows', {'cur': isDropdownOpen}]">
            <ul v-show="isDropdownOpen" class="options animationTop">
              <li v-for="option in options.value" :key="option.id" @click="selectOption(option,1)">
                <div class="check_box">
                  <img class="check" v-if="option.desc === selectedOption.desc" :src="check" />
                </div>
                <!--                :style="{ opacity: option.img ? '1' : '0' }"-->
                <img class="icon" :src="option.img" v-if="option.img"/>
                <span>{{ option.desc }}</span>
              </li>
            </ul>
          </div>
          <div class="selected apply" @click="toggleDropdown(2)">
            <span>{{ selectedOptionApply.desc }}</span>
            <img :src="arrows" :class="['arrows', {'cur': isDropdownOpen}]">
            <ul v-show="isDropdownApplyOpen" class="options animationTop">
              <li v-for="option in optionsApply.value" :key="option.id" @click="selectOption(option,2)">
                <div class="check_box">
                  <img class="check" v-if="option.desc === selectedOptionApply.desc" :src="check" />
                </div>
                <span>{{ option.desc }}</span>
              </li>
            </ul>
          </div>
          <p class="reset">
            <img :src="refresh" @click="resetFun" >
          </p>
        </div>
      </div>
      <div class="sound-list-height"></div>
      <div class="sound-list-box">
        <div class="sound-collection">
          <div v-if="isAnimation" class="sound-list animationDown">
            <ul>
              <template  v-for="(item,index) in listData" :key="item.id">
                <li :class="listIndex==index?'cur':''" @click="clickList(index,item)">
                  <div class="sound-state">
                    <div class="sound-state-icon">
                      <img :src="speciality">
                    </div>
                    <div class="sound-collect"  v-if="!item.has_collected">
                      <img :src="collect2" @click="collectFun(2,item)">
                      <div class="sound-collect-tips" @click="collectFun(2,item)">
                        收藏
                      </div>
                    </div>
                    <div class="sound-collect" v-else>
                      <img :src="collect1" @click="collectFun(1,item)">
                      <div class="sound-collect-tips" @click="collectFun(1,item)">
                        取消收藏
                      </div>
                    </div>
                  </div>
                  <div class="sound-content">
                    <img v-if="options.value.filter((selectD)=>selectD.value==item.dialect).length > 0" :src="options.value.filter((selectD)=>selectD.value==item.dialect)[0].img">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="sound-type" :style="listIndex==index ? 'display: flex' : 'display: none'">
                    <div class="sound-type-btn">
                      <span v-for="option in item.labelsText" :key="option.id">{{option}}</span>
                    </div>
                    <!--                <img :src="item.isShow?play:pause" @click="playAudio(item)">-->
                    <img :class="[item.isShow?'':'cur']" :src="play" @click="playAudio(item)">
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <div class="sound-bottom-box">

      <div class="selected" @click="toggleDropdown(3)" style="display: none;">
        <span>语速  {{ selectedOptionSpeed.desc }} x</span>
        <img :src="arrows" :class="['arrows', {'cur': isDropdownOpen}]">
        <ul v-show="isDropdownSpeedOpen" class="options">
          <li v-for="option in optionsSpeed" :key="option.id" @click="selectOption(option,3)">
            <div class="check_box">
              <img class="check" v-if="option.desc === selectedOptionSpeed.desc" :src="check" />
            </div>
            <span>{{ option.desc }}</span>
          </li>
        </ul>
      </div>


      <div class="sound-bottom-bnt">
        <button class="cancel-button" @click="cancel">取消</button>
        <button class="confirm-button" @click="confirm">确定</button>
      </div>
    </div>

    <div class="tipMsg"  v-if="tipMsg">{{tipMsg}}</div>
    <audio  v-if="isShowAudio" ref="audioPlayer" :src="audioSrc" @ended="onAudioEnded"></audio>

  </div>
</template>

<script setup>
const ak ="SaYqAFVP1QpMKp99cLEajJHwBa1dTfls";   //ak
const sk ="LgzSv0gOgLlJSIzOH95BtZZmyVdSXDksxPyL8VKT4UvvGVLcoMBaiP6Ls7Xj7RXT";  //sk
var uid=psyaiEditorUid;    //uid
var timeStamp = parseInt(new Date().getTime() / 1000);
let sig = getSig(uid,timeStamp);
var jsonString={
  "LangID" : "",        //SSML所需的 xml:lang的值 如 "zh-CN"
  "VoiceID" : "",        //SSML所需的 voice name的值 如 "zh-CN-XiaoxiaoNeural"
  "DisplayName" : "",    //用于展示的声音名称
  "VirtualmanKey" : ""    //人物音色id
}
function getSigFun(){
  timeStamp = parseInt(new Date().getTime() / 1000);
  sig = getSig(uid,timeStamp);
}
ue.interface.initData = () => {

  getTimbreEnumFun();
  selectedOptionSpeed.desc=psyaiSpeakSpeed
  language.value=psyaiLangValue;
}


function getTimbreEnumFun(){
  uid=psyaiEditorUid;
  timeStamp = parseInt(new Date().getTime() / 1000);
  sig = getSig(uid,timeStamp);
  getTimbreEnum(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)
}

import CryptoJS from 'crypto-js/crypto-js'

import {onMounted, reactive} from "vue"
import { ref } from "@vue/runtime-core"
import check from '@/assets/ttsTimbre/check.png'; //对号
import customized from '@/assets/ttsTimbre/customized.png';
import collect2 from '@/assets/ttsTimbre/collect2.png';
import icon1 from '@/assets/ttsTimbre/icon1.png';
import play from '@/assets/ttsTimbre/play.png';
import arrows from '@/assets/ttsTimbre/arrows.png';
import refresh from '@/assets/ttsTimbre/refresh.png';
import collect1 from '@/assets/ttsTimbre/collect1.png';
import speciality from '@/assets/ttsTimbre/speciality.png';
import pause from '@/assets/ttsTimbre/pause.png';


const psyaiLangValueItem = ref('');
const psyaiVoiceIDItem = ref('');
const psyaiSpeakSpeedItem = ref('');
window.psyaiLangValue=psyaiLangValueItem
window.psyaiVoiceID=psyaiVoiceIDItem
window.psyaiSpeakSpeed=psyaiSpeakSpeedItem



const objText={desc:'全部',img :arrows,value:""}
const audioSrc = ref('');
const playIcon=ref(play)
import "./ttsTimbre.less"
import {timbreEnum, getList, setCollection, delCollection, aditionCreate, getListCollect} from "../../api/ttsTimbre";

const titleTTS = ref('');

window.psyaiTextEditorTitles=titleTTS;
const isDropdownOpen = ref(false);
const isDropdownApplyOpen = ref(false);
const isDropdownSpeedOpen = ref(false);
const isShowAudio = ref(true);
const isAnimation = ref(true);
const isDownClick = ref(false);
const audioPlayer = ref(null);
const loaderShow=ref(false);
const callShow=ref(true);

const selectedOption = reactive({desc:'语言'});
const options = reactive([
]);
const tipMsg = ref('');
const isMsg = ref(true);
const isTime= ref(null);
//const virtualman_key = ref('d656376640bae2d2616e904289d781c7');
const scene = ref('');
const language = ref('');

const selectedOptionApply = reactive({desc:'应用场景'});
const optionsApply = reactive([
]);
const listCollect = reactive([]);
const listIndex = ref(-1);


const saveDataObj = reactive({
  "LangID" : "",        //SSML所需的 xml:lang的值 如 "zh-CN"
  "VoiceID" : "",        //SSML所需的 voice name的值 如 "zh-CN-XiaoxiaoNeural"
  "LangDesc" : "",        //对应上图下拉框选择的 desc 如：【中国】普通话
  "DisplayName" : "",    //声音名称 对应上图选中的声音卡片的 name 如：普通话男音-阳光温暖
  "SpeakerID" : "",    //人物音色 对应上图选中的声音卡片的 id 如：640242b67c000a32e1ff0359
  "SpeakSpeed": ''   //语速 float类型
});
const listData = reactive([]);
listData.forEach(item => {
  item.isShow = true;
});
listCollect.forEach(item => {
  item.isShow = true;
});
const showOptions = ref(false);
const selectedOptionSpeed = reactive({desc:'1.0'});
const optionsSpeed =  [
  { id: 1,desc: '0.5' },
  { id: 2,desc: '0.75' },
  { id: 3,desc: '1.0' },
  { id: 4,desc: '1.25' },
  { id: 5,desc: '1.5' },
  { id: 6,desc: '2.0' },
]


const playing = ref(false);

function confirm(){
  psyaiSaveFun(Object.assign({},saveDataObj));
}
function cancel(){
  console.log('关闭弹窗')
  ue5("SelectVoiceCancel", "")
}

function getSig(uid,timeStamp){
  let content = "ak="+ak+"&uid="+uid+"&timestamp="+timeStamp;
  let sig  = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(content, sk));
  // console.log(sig);
  return sig;
}
function clickList(num,item){
  console.log("clickList");
  console.log(item);
  saveDataObj.LangID=item.dialect;
  saveDataObj.VoiceID=item.speaker_name;
  saveDataObj.LangDesc=document.querySelector('.selected span').innerHTML;
  saveDataObj.DisplayName=item.name;
  saveDataObj.SpeakerID=item.id;
  listIndex.value=num;
}

// async function collectFun(type,item){
//   // console.log(item.id)
//   // console.log(item.sex);
//   getSigFun()
//   if(type===1){
//     var data=await delCollection(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
//       "speaker_id":item.id,
//       "sex": item.sex
//     })
//     if(data.msg){
//       tipsFun(data.msg,1500)
//       return
//     }
//   }else{
//     if(listCollect.length>=4){
//       tipsFun('收藏不能超过4个');
//       return
//     }
//     var data=await setCollection(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
//       "speaker_id":item.id,
//       "sex": item.sex
//     })
//     if(data.msg){
//       tipsFun(data.msg,1500)
//       return
//     }
//   }

//   setTimeout(()=>{
//     getListCollectData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}&sex=${virtualmanGender}`)
//     getListData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
//     "virtualman_key":psyaiVirtualmanKey,
//     "scene":scene.value,
//     "language":language.value,
//     "sex":virtualmanGender
//   })
//   },100)
// }

async function collectFun(type,item){
  // console.log(item.id)
  // console.log(item.sex);
  getSigFun()
  if(type===1){
    var data=await delCollection(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
      "timbre_id":item.id,
    })
    if(data.msg){
      tipsFun(data.msg,1500)
      return
    }
  }else{
    if(listCollect.length>=4){
      tipsFun('收藏不能超过4个');
      return
    }
    var data=await setCollection(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
      "timbre_id":item.id,
      "sex": item.sex
    })
    if(data.msg){
      tipsFun(data.msg,1500)
      return
    }
  }

  setTimeout(()=>{
    getListCollectData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}&sex=${virtualmanGender}`)
    getListData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
    "virtualman_key":psyaiVirtualmanKey,
    "scene":scene.value,
    "language":language.value,
    "sex":virtualmanGender
  })
  },100)
}


function toggleDropdown(type) {
  // console.log(type,isDropdownOpen.value,91);
  isDownClick.value=false;

  if(type==1){
    isDropdownApplyOpen.value=false;
    isDropdownSpeedOpen.value=false;

    isDropdownOpen.value = !isDropdownOpen.value;
    // console.log(type,isDropdownOpen.value);
  }else if(type==2){
    isDropdownOpen.value=false;
    isDropdownSpeedOpen.value=false;
    isDropdownApplyOpen.value = !isDropdownApplyOpen.value;
  }else{
    isDropdownOpen.value=false;
    isDropdownApplyOpen.value=false;
    isDropdownSpeedOpen.value = !isDropdownSpeedOpen.value;
  }
}
function closeIsDrop(){
  if(isDownClick.value){
    isDropdownOpen.value=false;
    isDropdownApplyOpen.value=false;
    isDropdownSpeedOpen.value=false;
  }else{
    isDownClick.value=true;
  }
}


function stopAudio(){
  listData.forEach(item => {
    item.isShow = true;
  });
  listCollect.forEach(item => {
    item.isShow = true;
  });
}

function selectOption(option,type) {
  selectedOption.value = option;
  isDropdownOpen.value = false;
  if(type==1){
    saveDataObj.LangDesc=option.desc
    isDropdownApplyOpen.value=false;
    isDropdownSpeedOpen.value=false;
    saveDataObj.SpeakSpeed= selectedOptionSpeed.desc;
    isDropdownOpen.value = !isDropdownOpen.value;
    selectedOption.desc=option.desc
    language.value=option.value;
    getListData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
    "virtualman_key":psyaiVirtualmanKey,
    "scene":scene.value,
    "language":language.value,
    "sex":virtualmanGender
  })
    isAnimation.value=false;
    setTimeout(()=>{
      isAnimation.value=true;
    },0)
  }else if(type==2){
    isDropdownOpen.value=false;
    isDropdownSpeedOpen.value=false;

    isDropdownApplyOpen.value = false;
    isDropdownApplyOpen.value = !isDropdownApplyOpen.value;
    selectedOptionApply.desc=option.desc

    scene.value=option.value;
    getListData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
    "virtualman_key":psyaiVirtualmanKey,
    "scene":scene.value,
    "language":language.value,
    "sex":virtualmanGender
  })
    isAnimation.value=false;
    setTimeout(()=>{
      isAnimation.value=true;
    },0)
  }else if(type==3){
    saveDataObj.SpeakSpeed= option.desc;
    selectedOptionSpeed.desc=option.desc;
    isDropdownOpen.value=false;
    isDropdownApplyOpen.value=false;
    isDropdownSpeedOpen.value = false;
    isDropdownSpeedOpen.value = !isDropdownSpeedOpen.value;
  }
}

function onAudioEnded(){
  if(imgElement) {
    imgElement.src = play;
    imgElement = null;
  }
  stopAudio();
  playing.value = false;
}

const togglePlayback = () => {
  const audio = audioPlayer.value;
  if (playing.value) {
    audio.pause();
    // document.querySelector('.jodit-toolbar-button_audition .jodit-icon').style.backgroundImage=`url('${audition}')`
  } else {
    audio.play();
    // document.querySelector('.jodit-toolbar-button_audition .jodit-icon').style.backgroundImage=`url('${suspend}')`
  }
  playing.value = !playing.value;
};

let imgElement = null;
let previousImgElement = null;

function playAudio(item){
  if(imgElement) {
      imgElement.src = play;
      const audio = audioPlayer.value;
      audio.pause();
      stopAudio();
      playing.value = false;

      imgElement = event.target;

      if(imgElement != null && (imgElement == previousImgElement)) {
        imgElement = null;
        return;
      }
  }

  imgElement = event.target;
  imgElement.src = pause;

  if(!item.isShow){
    return
  }
  stopAudio();
  item.isShow=!item.isShow;
  playing.value = true;

  auditionClick(item)

  previousImgElement = imgElement;
}

function tipsFun(text,time=2000){
  tipMsg.value=text
  if(isMsg.value){
    clearTimeout(isTime);
    isMsg.value=false
    isTime.value=setTimeout(()=>{
      isMsg.value=true
      loaderShow.value=false;
      tipMsg.value=''
    },time)
  }
}

async function auditionClick(item){
  // console.log(audioPlayer,item,45)
  const audio = audioPlayer.value;
  // audio.play();
  // audio.pause(); // 停止音频
  // audio.currentTime = 0; // 重置音频播放位置
  //  isShowAudio.value=false;
  //  setTimeout(()=>{
  //    isShowAudio.value=true;
  //  },100)
  // if(playing.value){
  //   audio.pause();
  //   // document.querySelector('.jodit-toolbar-button_audition .jodit-icon').style.backgroundImage=`url('${audition}')`
  //   playing.value = !playing.value;
  //   return
  // }

  //jsonString={
  //  "LangID" : item.dialect,        //SSML所需的 xml:lang的值 如 "zh-CN"
  //  "VoiceID" : item.speaker_name,        //SSML所需的 voice name的值 如 "zh-CN-XiaoxiaoNeural"
  //  "DisplayName" : item.name,    //用于展示的声音名称
  //  "VirtualmanKey" : psyaiVirtualmanKey    //人物音色id
  //}
  console.log(item);
  //试听接口
  loaderShow.value=true;
  getSigFun()
  const data= await aditionCreate({
    data:{
      text:`<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"https://www.w3.org/2001/mstts\" xml:lang=\"${item.dialect}\"><voice name=\"${item.speaker_name}\">${
        selectedOptionSpeed.desc
          ? `<prosody rate=\"${selectedOptionSpeed.desc}\">${item.audition_text}</prosody>`
          : item.audition_text
      }</voice></speak>`,
      speaker:item.id,
      original_text:`${item.audition_text}`
    },
    gen_url:true,
  })

  if(data.url){
    audioSrc.value=data.url;
    if(data){
      setTimeout(()=>{
        // togglePlayback();
        if(playing.value) {
          audio.play();
        }
        
        setTimeout(()=>{
          loaderShow.value=false;
        },500)
      },0)
    }
  }else{
    isMsg.value=true;
    tipsFun(data.msg,1500)
  }

};

const toggleOptionsSpeed = () => {
  showOptions.value = !showOptions.value;
};

const selectOptionSpeed = (option) => {
  selectedOption.value = option;
  showOptions.value = false;
};


function init(){
  var soundBox = document.querySelector('.sound-box');
  var soundListOption = document.querySelector('.sound-list-option');
  var soundListHeight = document.querySelector('.sound-list-height');



  soundBox.addEventListener('scroll', function() {
    var scrollTop = soundBox.scrollTop;

    if (scrollTop >= 170) {
      soundListOption.classList.add('cur');
      soundListHeight.classList.add('cur');
    }else{
      soundListOption.classList.remove('cur');
      soundListHeight.classList.remove('cur');
    }
  });
}
async function getTimbreEnum(obj) {
  getSigFun()
  const data= await timbreEnum(obj)
  // console.log(data.language)
  options.value=data.language;


  optionsApply.value=data.scene;
  selectedOption.value=psyaiLangValue;
  // selectedOption.desc=data.language.filter(d=>{return d.value==psyaiLangValue})[0].desc
  let filteredData = data.language.filter(d => d.value == psyaiLangValue);
  selectedOption.desc = filteredData.length > 0 ? filteredData[0].desc : 'Default Description';
  //

  // options.value.unshift(objText)
  // Object.assign(options.value, {objText});

  // console.log(options,343434)
  getListData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
    "virtualman_key":psyaiVirtualmanKey,
    "scene":scene.value,
    "language":language.value,
    "sex":virtualmanGender
  })

  getListCollectData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}&sex=${virtualmanGender}`)

}
function resetFun(){
  scene.value='';
  language.value='';
  selectedOption.desc='语言';
  selectedOptionApply.desc='应用场景';
  getListData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
    "virtualman_key":psyaiVirtualmanKey,
    "scene":scene.value,
    "language":language.value,
    "sex":virtualmanGender
  })
  closeIsDrop();
}

async function getListData(form,obj) {
  getSigFun()
  const data= await getList(form,obj)
  console.log(data);
  console.log(obj);
  listData.splice(0, listData.length, ...data.list);
  listData.forEach(item => {
    if(item.labels||listData.keys(item.labels).length!==0){
      var labels = item.labels.split(',');
      var labelsText = labels.map(label => {
        var match = optionsApply.value.find(item => item.value === label);
        return match ? match.desc : '';
      });
      item.labelsText = labelsText;
    }
  });

  if(callShow.value){
    selectedOptionSpeed.desc=psyaiSpeakSpeed
    var CallBackObj=listData.filter(d=>{return d.id==psyaiVoiceID})
    var dataIndex=listData.findIndex(d=>{return d.id==psyaiVoiceID})
    // console.log(CallBackObj,psyaiVoiceID,dataIndex,34)

    if(CallBackObj){
      saveDataObj.LangID=CallBackObj.length>0&&CallBackObj[0].dialect;
      saveDataObj.VoiceID=CallBackObj.length>0&&CallBackObj[0].speaker_name;
      saveDataObj.LangDesc=document.querySelector('.selected span').innerHTML;
      saveDataObj.DisplayName=CallBackObj.length>0&&CallBackObj[0].name;
      saveDataObj.SpeakerID=CallBackObj.length>0&&CallBackObj[0].id;
      saveDataObj.SpeakSpeed= selectedOptionSpeed.desc;
      listIndex.value=dataIndex;
    }
    callShow.value=false;
  }
  stopAudio()
}


// async function getListData(form,obj) {
//   getSigFun()
//   const data= await getList(form,obj)
//   console.log(data);
//   console.log(obj);
//   listData.splice(0, listData.length, ...data);
//   listData.forEach(item => 
//   {
//     if(item.labels){
//       var labels = item.labels.split(',');
//       var labelsText = labels.map(label => {
//         var match = optionsApply.value.find(item => item.value === label);
//         return match ? match.desc : '';
//       });
//       item.labelsText = labelsText;
//     }
//   }
// );

//   if(callShow.value){
//     selectedOptionSpeed.desc=psyaiSpeakSpeed
//     var CallBackObj=listData.filter(d=>{return d.id==psyaiVoiceID})
//     var dataIndex=listData.findIndex(d=>{return d.id==psyaiVoiceID})
//     // console.log(CallBackObj,psyaiVoiceID,dataIndex,34)

//     if(CallBackObj){
//       saveDataObj.LangID=CallBackObj.length>0&&CallBackObj[0].dialect;
//       saveDataObj.VoiceID=CallBackObj.length>0&&CallBackObj[0].speaker_name;
//       saveDataObj.LangDesc=document.querySelector('.selected span').innerHTML;
//       saveDataObj.DisplayName=CallBackObj.length>0&&CallBackObj[0].name;
//       saveDataObj.SpeakerID=CallBackObj.length>0&&CallBackObj[0].id;
//       saveDataObj.SpeakSpeed= selectedOptionSpeed.desc;
//       listIndex.value=dataIndex;
//     }
//     callShow.value=false;
//   }
//   stopAudio()
// }

async function getListCollectData(obj) {
  getSigFun()
  const data= await getListCollect(obj)
  listCollect.splice(0, listCollect.length, ...data);
  listCollect.forEach(obj => {
    if(obj.labels) {
      var labels = obj.labels.split(',');
      var labelsText = labels.map(label => {
        var match = optionsApply.value.find(item => item.value === label);
        return match ? match.desc : '';
      });
      obj.labelsText = labelsText;
    }
  });
  stopAudio()
}


async function delCollectionData(obj) {
  getSigFun()
  const data= await delCollection(obj)
  // console.log(data.language)
  options.value=data.language;
  optionsApply.value=data.scene;
}


onMounted(() => {
  init()

  // getTimbreEnum(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)
})

</script>

<style lang="less" scoped>

</style>
