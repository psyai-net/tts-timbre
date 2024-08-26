import axios from '@/axios';
import {
    checkResult
} from '@/utill.js'

function getSessions(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

async function timbreEnum(form) {
    return checkResult(await axios.get(psyaiEditorUrl+'inner/joint/assets/tts/timbre/enum'+form,
    {
        headers: {
            "Content-Type": "application/json",
            'token':  psyaiEditorToken,
            'uid':  psyaiEditorUid 
        },
    }))
}

async function getList(form,obj) {
    return checkResult(await axios.post(psyaiEditorUrl+'inner/joint/assets/tts/timbre/all_list'+form,{
            ...obj
        },
        {
            headers: {
                "Content-Type": "application/json",
                'token':  psyaiEditorToken,
                'uid':  psyaiEditorUid 
            },
        }))
}

async function getListCollect(form) {
    return checkResult(await axios.get(psyaiEditorUrl+'inner/joint/assets/tts/timbre/collect/list'+form,
        {
            headers: {
                "Content-Type": "application/json",
                'token':  psyaiEditorToken,
                'uid':  psyaiEditorUid
            },
        }))
}


async function setCollection(form,obj) {
    return checkResult(await axios.post(psyaiEditorUrl+'inner/joint/assets/tts/timbre/collect'+form,{
            ...obj
        },
        {
            headers: {
                "Content-Type": "application/json",
                'token':  psyaiEditorToken,
                'uid':  psyaiEditorUid
            },
        }))
}

async function delCollection(form,obj) {
    return checkResult(await axios.post(psyaiEditorUrl+'inner/joint/assets/tts/timbre/collect/cancel'+form,{
            ...obj
        },
        {
            headers: {
                "Content-Type": "application/json",
                'token':  psyaiEditorToken,
                'uid':  psyaiEditorUid
            },
        }))
}

async function aditionCreate(form) {
    return checkResult(await axios.post(psyaiEditorUrl+'web-tools/tts/gen', {
            ...form
        },
        {
            headers: {
                "Content-Type": "application/json",
                'token':  psyaiEditorToken,
                'uid':  psyaiEditorUid
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
