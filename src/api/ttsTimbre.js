import axios from '@/axios';
import {
    checkResult,
    newCheckResult
} from '@/utill.js'

function getSessions(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

// async function timbreEnum(form) {
//     return checkResult(await axios.get(psyaiEditorUrl+'inner/joint/assets/tts/timbre/enum'+form,
//     {
//         headers: {
//             "Content-Type": "application/json",
//             'token':  psyaiEditorToken,
//             'uid':  psyaiEditorUid 
//         },
//     }))
// }

async function timbreEnum(form) {
    let url = newPsyaiEditorUrl + 'audio/timbre/enum' + '?classify=tts_country';
    // let url = newPsyaiEditorUrl+'audio/timbre/enum'+'?classify=zh-CN';
    console.log(url);
    return newCheckResult(await axios.get(url,
        {
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                'Authorization': authToken
            },
        }))
}

//todo 音色查询语言，还有应用场景参数添加；
async function getList(form, obj) {
    let url = newPsyaiEditorUrl + 'audio/timbre/list' + '?assetId=10859&language=zh-CN&page=1&pageSize=50';
    console.log(url);
    console.log(obj);
    return newCheckResult(await axios.get(url,
        {
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                'Authorization': authToken
            },
        }))
}

// async function getList(form,obj) {
//     return checkResult(await axios.post(psyaiEditorUrl+'inner/joint/assets/tts/timbre/all_list'+form,{
//             ...obj
//         },
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 'token':  psyaiEditorToken,
//                 'uid':  psyaiEditorUid 
//             },
//         }))
// }

async function getListCollect(form) {
    let url = newPsyaiEditorUrl + 'audio/timbre/collect/list' + '?sex=male';
    console.log(url);
    return newCheckResult(await axios.get(url,
        {
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                'Authorization': authToken
            },
        }))
}

// async function getListCollect(form) {
//     let url = psyaiEditorUrl+'inner/joint/assets/tts/timbre/collect/list'+form;
//     console.log(url);
//     return checkResult(await axios.get(url,
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 'token':  psyaiEditorToken,
//                 'uid':  psyaiEditorUid
//             },
//         }))
// }


// async function setCollection(form, obj) {
//     return checkResult(await axios.post(psyaiEditorUrl + 'inner/joint/assets/tts/timbre/collect' + form, {
//         ...obj
//     },
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 'token': psyaiEditorToken,
//                 'uid': psyaiEditorUid
//             },
//         }))
// }

async function setCollection(form, obj) {
    let url = newPsyaiEditorUrl + 'audio/timbre/collect';
        console.log(url);
        console.log(obj);
    return newCheckResult(await axios.post(url, {
        ...obj
    },
        {
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                'Authorization': authToken
            },
        }))
}

// async function delCollection(form, obj) {
//     return checkResult(await axios.post(psyaiEditorUrl + 'inner/joint/assets/tts/timbre/collect/cancel' + form, {
//         ...obj
//     },
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 'token': psyaiEditorToken,
//                 'uid': psyaiEditorUid
//             },
//         }))
// }

async function delCollection(form, obj) {
    let url = newPsyaiEditorUrl + 'audio/timbre/cancel/collect';
        console.log(url);
        console.log(obj);

    return newCheckResult(await axios.post(url, {
        ...obj
    },
        {
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                'Authorization': authToken
            },
        }))
}



async function aditionCreate(form) {
    return checkResult(await axios.post(psyaiEditorUrl + 'web-tools/tts/gen', {
        ...form
    },
        {
            headers: {
                "Content-Type": "application/json",
                'token': psyaiEditorToken,
                'uid': psyaiEditorUid
            },
        }))
}
export {
    timbreEnum,
    getList,
    setCollection,
    delCollection,
    getListCollect,
    aditionCreate
}
