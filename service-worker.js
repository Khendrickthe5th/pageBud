// import './sw-omnibox.js';
// import './sw-tips.js';

chrome.contextMenus.create({
  "title": "Mark Notes: Mark Text",
  "id": "3123",
  "contexts": ["selection"]
})

chrome.contextMenus.onClicked.addListener(async(text)=>{
const selText = text.selectionText;
let tab = await chrome.tabs.query({active: true, currentWindow: true})
let response = await chrome.tabs.sendMessage(tab[0].id, {wrapNote: "wrapNote"})
console.log(response)
console.log(selText,"selText")
})

chrome.webNavigation.onCompleted.addListener(async()=>{
  let tabss = await chrome.tabs.query({active: true, currentWindow: true})
  let response = await chrome.tabs.sendMessage(tabss[0].id, {dubem: "I hate programming"})
    console.log(response, tabss[0].id, "hehehe");
    console.log(tabss[0].id, "Service-worker is running! 2")
})

// chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
//   if (message.currTab === "getCurrentTab"){
//       chrome.tabs.query({active: true, currentWindow: true}, (tab)=>{
//         sendResponse({"tabId": tab[0].id})
//       })
//       return true
//   }
// })

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
  if (message.injectCSS === "injectCSS"){
      chrome.tabs.query({active: true, currentWindow: true}, (tab)=>{
      chrome.scripting.insertCSS({
      target: {tabId: tab[0].id, allFrames: true},
      files: ["main.css"]
    })
    sendResponse("Successfully injected CSS")
      })
    
 //   i had to add this below because i couldnt get it to work and somehow i saw this code being recommended by others who facse similar issue on SO
    return true
  }
})