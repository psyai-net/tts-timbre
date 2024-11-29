// export const MICROSOFT = "microsoft";
// export const TENCENT = "tencent";
// export const CHUMENWENWEN = "moyin";
// export const ALIYUN = "aliyun";
// export const ELEVENLABS = "eleven-labs";

export const MICROSOFT = "azure";
export const TENCENT = "tencent";
export const CHUMENWENWEN = "moyin";
export const ALIYUN = "alibaba";
export const ELEVENLABS = "eleven-labs";

// export const ID_TO_COMPANYS = {
//   "642a7b3fb9b3dde907f9a740": MICROSOFT,
//   "647f3ab2710f103710858f9a": TENCENT,
//   "64f03887f4a4549398d61e35": CHUMENWENWEN,
//   "656d7a0d32e6b419094a6ee0": ALIYUN,
//   "64c9cc0680009c782090c73a": ELEVENLABS,
// };
export const ID_TO_COMPANYS = {
  "azure": MICROSOFT,
  "tencent": TENCENT,
  "moyin": CHUMENWENWEN,
  "alibaba": ALIYUN,
  "ElevenLabs": ELEVENLABS,
  "undefined": ELEVENLABS,
  "FishAudio": ELEVENLABS,
  "minimax": ELEVENLABS,
};

export const REAL_SSML_TAG_MAP = {
  [MICROSOFT]: {
    wrapper: (speed, content, lang, voiceID, emotion) =>
      `<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"https://www.w3.org/2001/mstts\" xml:lang=\"${lang}\"><voice name=\"${voiceID}\"><mstts:express-as style=\"${emotion}\"><prosody rate="${speed}">${content}</prosody></mstts:express-as></voice></speak>`,
    pauseEnum: (value) => `<break time=\"${value}\"/>`,
    speechSpeedEnum: (content, value) =>
      `<prosody rate="${value}">${content}</prosody>`,
    continuous: (content) => `<s>${content}</s>`,
    pinyin: (content, value) => `<sub alias="/${value[0]}">${content}</sub>`,
    digitSymbolEnum: (content, value) =>
      `<say-as interpret-as="${value}">${content}</say-as>`,
    volumeEnum: (content, value) =>
      `<prosody volume="${value}">${content}</prosody>`,
    toneEnum: (content, value) =>
      `<prosody pitch="${value}">${content}</prosody>`,
  },
  [TENCENT]: {
    wrapper: (speed, content) => `<speak>${content}</speak>`,
    pauseEnum: (value) => `<break time=\"${value}\"/>`,
    pinyin: (content, value) =>
      `<phoneme alphabet="py" ph="${value[1]}">${content}</phoneme>`,
    digitSymbolEnum: (content, value) =>
      `<say-as interpret-as="${value}">${content}</say-as>`,
  },
  [CHUMENWENWEN]: {
    wrapper: (speed, content, lang) =>
      `<speak version="1.0" xml:lang="${lang}" xmlns="http://www.w3.org/2001/10/synthesis" domain="public.weather"><option speed="${speed}" >${content}</option></speak>`,
    pauseEnum: (value) => `<break time=\"${value}\"/>`,
    continuous: (content) => `<w>${content}</w>`,
    pinyin: (content, value) => `<p phoneme="${value[1]}">${content}</p>`,
    digitSymbolEnum: (content, value) =>
      `<say-as interpret-as="${value}">${content}</say-as>`,
  },
  [ALIYUN]: {
    wrapper: (speed, content) => `<speak rate="${speed}">${content}</speak>`,
    pauseEnum: (value) => `<break time=\"${value}\"/>`,
    digitSymbolEnum: (content, value) =>
      `<say-as interpret-as="${value}">${content}</say-as>`,
  },
};

/**
 * 特殊字符转义
 */
export function escapeSpecialCharacters(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/\(/g, "&#40;")
    .replace(/\)/g, "&#41;");
}

function removeEditorTagsOptionBox(element) {
  // 标签
  const editorTagsOptionBoxRegex =
    /<div class="editorTagsOptionBox"[^>]*>[\s\S]*?<\/div>/g;
  // 标签下拉框
  const editorListRegex = /<div class="editorList"[^>]*>[\s\S]*?<\/div>/g;
  // const classTxtRegex = /<span class="classTxt"[^>]*>[\s\S]*?<\/span>/g;
  const editorTagsOptionRegex =
    /<div class="optionBtn editorTagsOption[^>]*>[\s\S]*?<\/div>/g;
  const preRegex = /<pre[^>]*>[\s\S]*?<\/pre>/g;
  const emRegex = /<em[^>]*>[\s\S]*?<\/em>/g;
  const iRegex = /<i[^>]*>[\s\S]*?<\/i>/g;
  const nbspRegex = /&nbsp;/g;
  let processedHTML = element.replace(editorTagsOptionBoxRegex, "");
  processedHTML = processedHTML.replace(editorListRegex, "");
  // processedHTML = processedHTML.replace(classTxtRegex, '');
  processedHTML = processedHTML.replace(editorTagsOptionRegex, "");
  processedHTML = processedHTML.replace(preRegex, "");
  processedHTML = processedHTML.replace(emRegex, "");
  processedHTML = processedHTML.replace(iRegex, "");
  processedHTML = processedHTML.replace(nbspRegex, "");
  processedHTML = processedHTML.replace(
    /<div class="editorTags pauseEnum"[^>]*>/g,
    ""
  );
  processedHTML = processedHTML.replace(
    /<div class="editorTags speechSpeedEnum"[^>]*>/g,
    ""
  );
  processedHTML = processedHTML.replace(
    /<div class="editorTags continuous"[^>]*>/g,
    ""
  );
  processedHTML = processedHTML.replace(
    /<div class="editorTags pinyin"[^>]*>/g,
    ""
  );
  processedHTML = processedHTML.replace(
    /<div class="editorTags digitSymbolEnum"[^>]*>/g,
    ""
  );
  processedHTML = processedHTML.replace(
    /<div class="editorTags volumeEnum"[^>]*>/g,
    ""
  );
  processedHTML = processedHTML.replace(
    /<div class="editorTags toneEnum"[^>]*>/g,
    ""
  );
  processedHTML = processedHTML.replace(
    /<div class="editorTags emotionEnum"[^>]*>/g,
    ""
  );
  processedHTML = processedHTML.replace(/<\/div>/g, "");

  return processedHTML;
}

/**
 * 将html标签转为ssml标签：如果是可用标签，则转换为ssml标签，否则只获取内容文本
 * 同时对文本内容进行特殊字符转义
 */
export function htmlToSsml(
  htmlStr,
  { companyId, labelData, lang, voice, emotion, speed }
) {
  const speakerCompany = ID_TO_COMPANYS[companyId];

  const targetEl = document.createElement("div");
  targetEl.innerHTML = removeEditorTagsOptionBox(htmlStr);
  const realSsmlTags = REAL_SSML_TAG_MAP[speakerCompany];
  function replaceTags(element) {
    // 创建一个空字符串来存储新的内容
    var newContent = "";
    // 遍历子节点
    for (var i = 0; i < element.childNodes.length; i++) {
      var node = element.childNodes[i];

      // 如果是元素节点
      if (node.nodeType === 1) {
        // 获取元素节点的data-type属性值
        var dataType = node.getAttribute("data-type");
        var dataMark = node.getAttribute("data-mark");
        var dataVal = node.getAttribute("data-val");
        var dataNumVal = node.getAttribute("data-numVal");

        const getContent = () => replaceTags(node);
        switch (dataType) {
          case "pauseEnum":
            newContent += realSsmlTags[dataType]
              ? realSsmlTags[dataType](dataVal)
              : getContent();
            break;
          case "speechSpeedEnum":
            newContent += realSsmlTags[dataType]
              ? realSsmlTags[dataType](getContent(), dataVal)
              : getContent();
            break;
          case "continuous":
            newContent += realSsmlTags[dataType]
              ? realSsmlTags[dataType](getContent(), dataVal)
              : getContent();
            break;
          case "pinyin":
            newContent += realSsmlTags[dataType]
              ? realSsmlTags[dataType](getContent(), [dataVal, dataNumVal])
              : getContent();
            break;
          case "digitSymbolEnum":
            newContent += realSsmlTags[dataType]
              ? realSsmlTags[dataType](
                  getContent(),
                  dataMark && dataMark !== "null"
                    ? labelData[speakerCompany][dataType].find(
                        (e) => e.item_mark === dataMark
                      ).value
                    : dataVal
                )
              : getContent();
              // // 提取当前数据类型的处理函数
              // const ssmlTagHandler = realSsmlTags[dataType];

              // // 获取标签内容
              // let tagContent = getContent();

              // // 判断是否有有效的 dataMark
              // let valueToUse;
              // if (dataMark && dataMark !== "null") {
              //     // 根据 dataMark 查找具体的值
              //     const labelEntry = labelData[speakerCompany][dataType].find(
              //         (e) => e.item_mark === dataMark
              //     );

              //     // 如果找到对应项，取其 value，否则保持 undefined
              //     valueToUse = labelEntry ? labelEntry.value : undefined;
              // } else {
              //     // 如果 dataMark 不存在或为 "null"，使用 dataVal
              //     valueToUse = dataVal;
              // }

              // // 构建新的内容
              // if (ssmlTagHandler) {
              //     newContent += ssmlTagHandler(tagContent, valueToUse);
              // } else {
              //     // 如果没有处理函数，则仅追加内容
              //     newContent += tagContent;
              // }
            break;
          case "volumeEnum":
            newContent += realSsmlTags[dataType]
              ? realSsmlTags[dataType](getContent(), dataVal)
              : getContent();
            break;
          case "toneEnum":
            newContent += realSsmlTags[dataType]
              ? realSsmlTags[dataType](getContent(), dataVal)
              : getContent();
            break;
          default:
            newContent += getContent();
        }
      } else {
        // 如果是文本节点，则直接将内容添加到新的内容字符串中
        newContent += escapeSpecialCharacters(node.textContent);
      }
    }

    return newContent;
  }
  const processedHTML = replaceTags(targetEl).toString();
  const processedStr = realSsmlTags.wrapper(
    speed,
    processedHTML,
    lang,
    voice,
    emotion
  );
  let str = processedStr.replace(/[\t\r\n]+(?![^<>]*>)/g, "");
  str = str.replace(/ {2,}/g, " ");
  return str;
}
