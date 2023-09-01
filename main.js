let index = 0;
const allHighlightedTextInPage = [];
const allHighlightedTextInPageCopy = [];
const allHighlightedTextInPageObj = [];
let noteIndexCounter;
let noteVal;
let noteTagVal;
let totalNotes;
let currSpanDetails = {};
const obj = {}


let body = document.querySelector("body")
let hoveElem = `<span class="xxi" id="xxii"  style="position: relative; font-size: 1rem; top: 0px; background-color: white; box-shadow: 3px 3px 12px black; border-radius: 50%; border: 1px solid black; display: grid; place-items: center; width: 35px; height: 35px; cursor: pointer; user-select: none;">📌</span>`



// Lots of works, functions to initialize upon webpage load
window.onload = ()=>{
totalNotes = document.createElement("div")
totalNotes.innerHTML = "-"
totalNotes.classList.add("yolo")
totalNotes.setAttribute("style", ` color: white; font-size: 1.5rem; font-family: "Space Grotesk"; box-shadow: 3px 3px 12px grey; border: 2px solid white; position: fixed; display: grid; place-items: center; bottom: 50px; z-index: 20; right: 60px; border-radius: 50%; width: 50px; height: 50px; background-color: grey; transition-duration: 500ms; cursor: pointer; user-select: none;`)
document.body.append(totalNotes)
ci()

// document.querySelector(".yolo").onclick = ()=>{
// let body = document.styleSheets
//   for(const item of body){
//   for(const CSSStyleRules of item.cssRules){
//     console.log(CSSStyleRules.cssText)
//   }
//   }
// }

document.querySelector(".yolo").onclick = ()=>{
var stylesArray = []
const docFile = document.querySelector("html").innerHTML;
const bodyTagEndIndex = docFile.indexOf("</head>");
let docFileArry = Array.from(docFile)

let body = document.styleSheets
  for(const item of body){
  for(const CSSStyleRules of item.cssRules){
    stylesArray.push(CSSStyleRules.cssText) 
    // console.log(CSSStyleRules.cssText)
  }
}

let stylesStrng = stylesArray.join("")
docFileArry.splice(bodyTagEndIndex, 0, `<style crossorigin="anonymous">${stylesStrng}</style>`)
let finalResult = docFileArry.join("")
// console.log("Here is the index :", docFile.indexOf("</head>"), "docFile.length :", docFile.length)
console.log("finalRes :", finalResult, "finalRes.length", finalResult.length)

fetch("https://s.imgur.com/min/newregister.css?1692808005", {
  method: "GET",
  mode: "no-cors",
  headers: {
    "Content-Type": "text/css",
  }
})
  .then(res => res.text())
  .then(reso => console.log(reso))
  .catch(err => console.log(err))
// console.log("-------------------------------------------------------------------------", stylesStrng)

// const logHTML = ()=>{
//   // let body = document.querySelector("html")
//   // console.log(body.innerHTML)

//   // document.querySelector(".yolo").onclick = ()=>{
// let x =  new File([document.querySelector("html").innerHTML], "test.html", {type: "text/html"})
// let y = URL.createObjectURL(x)
// console.log(x, y)
// window.open(y, "_blank")
// }
}

// document.querySelector(".yolo").onclick = ()=>{
// chrome.runtime.sendMessage({captureMHTML: "captureMHTML"}, (response)=>{
//   console.log("Opening Page")
// window.open(response, "_blank")
// })
// }
// Sends message to service worker to inject CSS into the painted page
chrome.runtime.sendMessage({injectCSS: "injectCSS"}, (response)=>{
  console.log(response, "Success!")
    })

    // Injecting the Notes mini editor on the screen 
    document.body.insertAdjacentHTML("beforeend", `
    <section id="toolTipCont">
	<div id="toolTip" class="noteTakerElemMember">
		<div id="firstBlock" class="noteTakerElemMember">
			<span id="noteIndexCounter" class="noteTakerElemMember">0</span>
			<span id="colorI" class="noteTakerElemMember"></span>
			<span id="colorII" class="noteTakerElemMember"></span>
			<span id="colorIII" class="noteTakerElemMember"></span>
		</div>
		<div id="secondBlock" class="noteTakerElemMember">
			<form class="noteTakerElemMember">
				<textarea id="noteVal" class="noteTakerElemMember" type="text" placeholder="Type your notes here" cols="25" rows="4"></textarea>
			</form>
		</div>

		<div id="thirdBlock" class="noteTakerElemMember">
			<span id="saveBut" class="noteTakerElemMember">Save</span>
			<input id="noteTagsVal" class="noteTakerElemMember" type="text" placeholder="Types your notes tag here">
</div>
		</div>
</section>
    `)
  noteIndexCounter = document.getElementById("noteIndexCounter");
  noteVal = document.getElementById("noteVal");
  noteTagVal = document.getElementById("noteTagsVal");

}

const ci = function(){
  console.log('scripting here!', chrome)
  let x = document.querySelector('.yolo')
  x.addEventListener('click', ()=>{ console.log("checking lololo")})
}

// Listens and waits for a message from service worker, this messgae signals that a text is selected and context menu has been clicked, this creast the following element and surrounds the selected text with it
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
if(message.wrapNote == "wrapNote"){
  // This below block secures a highlighted text, and encapsulate it with a span element
  const selText = document.getSelection()
  const span = document.createElement("span")
  const x = selText.getRangeAt(0)
  span.setAttribute("class", `noteTaker noteTakerIndex${index}`)
  x.surroundContents(span)

  // This block populates the currSpanDetails object initialized at the top and, and also pushes each new one into an array called allHighlightedTextInPageObj
  currSpanDetails.spanIndex = `noteTakerIndex${index}`
  currSpanDetails.class = `noteTaker noteTakerIndex${index}`
  currSpanDetails.color = "#c5e99b"
  currSpanDetails.notesVal = "N/A"
  currSpanDetails.noteTag = "N/A"
  allHighlightedTextInPageObj.push(currSpanDetails)

  // This block, upon pushing the current selected info object in the allHighlightedTextInPageObj array, it also de-highlights the selected text, increments the index by 1 and send a response to service worker
  selText.removeAllRanges()
  index++
  sendResponse("Successfully wraped the text")

  // this block oversees both displaying the note mini panel and calculating the position it will be rendered
  allHighlightedTextInPage.push(span)
  allHighlightedTextInPageCopy.push(span)
  totalNotes.innerText = allHighlightedTextInPageCopy.length;
  const lastElemeOfallHighlightedTextInPage = allHighlightedTextInPage.splice(-1)

  const funcc = (e)=>{
    const miniNotePanel = document.getElementById("toolTipCont");
    const spanClasses = span.classList.value
    const spanIndexVal =  Number(spanClasses.slice(24, 25))
    noteIndexCounter.innerText = spanIndexVal + 1
    
    console.log(currSpanDetails)
    // Adding eventlisteners to the color notches so it an be changed with just a click
    let colorBtn = document.querySelectorAll("#colorI, #colorII, #colorIII")
    colorBtn.forEach((btn)=>{
      btn.onclick = ()=>{
        let styles = window.getComputedStyle(btn)
        span.style.backgroundColor = styles.backgroundColor
      }
    })

    // Logging all the mini editor panel values to the console
    document.querySelector("#saveBut").onclick = ()=>{
      obj.indexNum = spanIndexVal,
      obj.spanColor = window.getComputedStyle(span).backgroundColor,
      obj.noteTagVal = noteTagVal.value,
      obj.noteVal = noteVal.value
      }
    // )


    // checking and doing some maths on how to position the mini editor panel based on where a click was inititated
    if( miniNotePanel.style.display !== "inline-block" || e.target.classList.contains(`noteTaker`)){
    miniNotePanel.style.display = "inline-block"
    noteVal.focus()
    let offsetFrmRight = document.body.clientWidth - e.pageX;
    let offsetFrmBtm = document.body.clientHeight - e.clientY;
    let pxToAdd = 200 - offsetFrmRight + 20;

    if(offsetFrmRight < 200){
      miniNotePanel.style.left = `${e.pageX - pxToAdd}px`
      
      if(offsetFrmBtm < 130){
        miniNotePanel.style.top = `${e.clientY}px`
        window.scrollBy(0, 120)
      }
      miniNotePanel.style.top = `${e.pageY}px`
    }
    else{
      miniNotePanel.style.left = `${e.pageX}px`

      if(offsetFrmBtm < 130){
        miniNotePanel.style.top = `${e.clientY}px`
        window.scrollBy(0, 120)
      }
      miniNotePanel.style.top = `${e.pageY}px`
    }
    }
    else{
      miniNotePanel.style.display = "none"
      noteVal.blur() 
      console.log(e.target.getAttribute('class'), "Failed", index)
    }

    // This handles the hiding of the mini note panel when a click occurs where it doesnt includes any element with a class of noteTaker
    document.querySelector("body").onclick = (e)=>{
      if(!e.target.classList.contains("noteTaker") && !e.target.classList.contains("noteTakerElemMember")){
        miniNotePanel.style.display = "none" 
      }}

      let x;

      noteVal.onblur = ()=>{
        x = setTimeout(()=>{
        miniNotePanel.style.display = "none" 
      }, 1000)}
      noteTagVal.onblur = ()=>{
        x = setTimeout(()=>{
        miniNotePanel.style.display = "none" 
      }, 1000)}
      noteVal.onfocus = ()=>clearTimeout(x)
      noteTagVal.onfocus = ()=>clearTimeout(x)
      // let xxy = document.querySelectorAll(noteVal, noteTagVal)

      
      // if(!document.activeElement.classList.contains("noteTakerElemMember")){
      //   x = setTimeout(()=>{
      //     miniNotePanel.style.display = "none" 
      //   }, 5000)
      // }else if(document.activeElement.classList.contains("noteTakerElemMember")){
      //   clearTimeout(x)
      // }
  }
  // This adds an event listener to every text selected, one by one
  lastElemeOfallHighlightedTextInPage[0].addEventListener("click", funcc)
}})




chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
  if (message.dubem === "I hate programming"){
    console.log(message, 'Okay its working')
    sendResponse({res: "Hello world", sender: sender})
  }
})


