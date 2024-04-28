<template>
  <!--  @click.capture="closeIsDrop"-->
  <div class="popUp-sound"   @click.stop.prevent="closeIsDrop">
    <div class="sound-title">声音</div>
    <div class="sound-box">
      <div class="sound-collection animationDown">
        <div class="sound-collection-title">我的收藏</div>
        <div class="sound-list animationTop">
          <ul>
            <li v-for="(item,index) in listCollect" :key="item.id">
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
                <img :src="icon1">
                <span>{{item.name}}</span>
              </div>
              <div class="sound-type">
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
                <li>
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
                    <img :src="icon1">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="sound-type">
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

      <div class="selected" @click="toggleDropdown(3)">

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
    <!--    <div class="loaderBox" v-if="loaderShow">-->
    <!--      <div class="loader"></div>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
const ak ="SaYqAFVP1QpMKp99cLEajJHwBa1dTfls";   //ak
const sk ="LgzSv0gOgLlJSIzOH95BtZZmyVdSXDksxPyL8VKT4UvvGVLcoMBaiP6Ls7Xj7RXT";  //sk
const uid='64d99f8fcebbd0f25432b6d0';    //uid
var timeStamp = parseInt(new Date().getTime() / 1000);
// var timeStamp =1693815174;
let sig = getSig(uid,timeStamp);


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


const objText={desc:'全部',img :arrows,value:""}
const audioSrc = ref('');
const playIcon=ref(play)
import "./ttsTimbre.less"
import {timbreEnum, getList, setCollection, delCollection, aditionCreate, getListCollect} from "../../api/ttsTimbre";

const isDropdownOpen = ref(false);
const isDropdownApplyOpen = ref(false);
const isDropdownSpeedOpen = ref(false);
const isShowAudio = ref(true);
const isAnimation = ref(true);
const isDownClick = ref(false);
const audioPlayer = ref(null);
const ssmlTxt=ref('大家好，我是深锶自动播的虚拟人，很高兴见到你！');
const loaderShow=ref(false);

const selectedOption = reactive({desc:'语言'});
const options = reactive([
]);
const tipMsg = ref('');
const isMsg = ref(true);
const isTime= ref(null);
const virtualman_key = ref('d656376640bae2d2616e904289d781c7');
const scene = ref('');
const language = ref('');

const selectedOptionApply = reactive({desc:'应用场景'});
const optionsApply = reactive([
]);
const listCollect = reactive([]);


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

function getSig(uid,timeStamp){
  let content = "ak="+ak+"&uid="+uid+"&timestamp="+timeStamp;
  let sig  = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(content, sk));
  console.log(sig);
  return sig;
}


async function collectFun(type,item){
  console.log(item.id)
  if(type===1){
    var data=await delCollection(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`,{
      "speaker_id":item.id
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
      "speaker_id":item.id
    })
    if(data.msg){
      tipsFun(data.msg,1500)
      return
    }
  }

  setTimeout(()=>{
    getListCollectData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)
    getListData(`?virtualman_key=${virtualman_key.value}&scene=${scene.value}&language=${language.value}&ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)
  },100)
}


function toggleDropdown(type) {
  console.log(type,isDropdownOpen.value,91);
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
    isDropdownApplyOpen.value=false;
    isDropdownSpeedOpen.value=false;

    isDropdownOpen.value = !isDropdownOpen.value;
    selectedOption.desc=option.desc
    language.value=option.value;
    getListData(`?virtualman_key=${virtualman_key.value}&scene=${scene.value}&language=${language.value}&ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)
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
    getListData(`?virtualman_key=${virtualman_key.value}&scene=${scene.value}&language=${language.value}&ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)
    isAnimation.value=false;
    setTimeout(()=>{
      isAnimation.value=true;
    },0)
  }else{
    isDropdownOpen.value=false;
    isDropdownApplyOpen.value=false;
    isDropdownSpeedOpen.value = false;
    isDropdownSpeedOpen.value = !isDropdownSpeedOpen.value;
    selectedOptionSpeed.desc=option.desc
  }

}

function onAudioEnded(){
  stopAudio();
  playing.value = !playing.value;
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

function playAudio(item){
  if(!item.isShow){
    return
  }
  stopAudio();
  item.isShow=!item.isShow;
  auditionClick(item)
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
  console.log(audioPlayer,item,45)
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


  //试听接口
  loaderShow.value=true;
  const data= await aditionCreate({
    data:{
      // text:`<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"https://www.w3.org/2001/mstts\" xml:lang=\"PsyaiLangID\"><voice name=\"${item.speaker_name}\"><mstts:express-as style=\"\"><prosody rate=\"${selectedOptionSpeed.desc}\">大家好，我是深锶自动播的虚拟人，很高兴见到你！</prosody></mstts:express-as></voice></speak>`,
      text:`<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"https://www.w3.org/2001/mstts\" xml:lang=\"${item.dialect}\"><voice name=\"${item.speaker_name}\"><prosody rate=\"${selectedOptionSpeed.desc}\">${item.audition_text}</prosody></voice></speak>`,
      speaker:"64c0e3041138dde84955ef84"
    },
    gen_url:true,
  })

  if(data.url){
    audioSrc.value=data.url;
    if(data){
      setTimeout(()=>{
        // togglePlayback();
        audio.play();
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

function confirm(){

}
function cancel(){

}
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
  const data= await timbreEnum(obj)
  console.log(data.language)
  options.value=data.language;


  optionsApply.value=data.scene;

  // options.value.unshift(objText)
  // Object.assign(options.value, {objText});

  console.log(options,343434)
  getListData(`?virtualman_key=${virtualman_key.value}&scene=${scene.value}&language=${language.value}&ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)

  getListCollectData(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)

}
function resetFun(){
  scene.value='';
  language.value='';
  selectedOption.desc='语言';
  selectedOptionApply.desc='应用场景';
  getListData(`?virtualman_key=${virtualman_key.value}&scene=${scene.value}&language=${language.value}&ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)
  closeIsDrop();
}

async function getListData(obj) {
  const data= await getList(obj)
  listData.splice(0, listData.length, ...data);
  listData.forEach(obj => {
    if(obj.labels){
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

async function getListCollectData(obj) {
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
  const data= await delCollection(obj)
  console.log(data.language)
  options.value=data.language;
  optionsApply.value=data.scene;
}


onMounted(() => {
  init()
  //获取枚举数据
  getTimbreEnum(`?ak=${ak}&sig=${sig}&timeStamp=${timeStamp}`)
  //获取枚举数据


})

</script>

<style lang="less" scoped>

</style>
