const textarea = document.querySelector('textarea'),
    form = document.querySelector('form'),
    body = document.querySelector('.body')

textarea.addEventListener('input', () => {
    const line = textarea.value.split('\n').length
    if (textarea.rows < 4 || line < 4) {
        textarea.rows = line
    }
})

form.onsubmit = (e) => {
    e.preventDefault()
    let userInput = textarea.value
    if (textarea.value.trim().length >= 1) {
        userMsg(userInput)
        body.scrollTo(0, body.scrollHeight)
        setTimeout(() => {
            autoReply(userInput)
            body.scrollTo(0 , body.scrollHeight)
            SaveChats()
        }, 1000)
    }
}

function userMsg(userInput) {
    let today = new Date()
    let hour = today.getHours()
    let min = today.getMinutes()
    let time = `${hour}:${min}`
    let userMsg = `<div class="msg-box user">
                    <div class="msg">
                        ${userInput}
                    </div>
                    <div class="time">
                        ${time}
                    </div>
                </div>`
    body.insertAdjacentHTML('beforeend', userMsg)
    textarea.value = ''
    textarea.rows = 1
    noMsg()
}

function autoReply(userInput) {
    let today = new Date()
    let hour = today.getHours()
    let min = today.getMinutes()   
    let time = `${hour}:${min}`
    let botInput = 'Thanks for your awesome support!'
    // if(userInput == 'hi'){
    //     botInput = 'Also hi for you'
    // }
    let botMsg = `<div class="msg-box bot">
                    <div class="msg">
                        ${botInput}
                    </div>
                    <div class="time">
                        ${time}
                    </div>
                </div>`
    body.insertAdjacentHTML('beforeend', botMsg)
}

function noMsg() {
    let noMsg = `<div class="no-message">
                    You don't have message yet!
                </div>`
    if (body.children.length == 0) {
        body.insertAdjacentHTML('beforeend', noMsg)
    } else {
        let noMessage = body.querySelector('div.no-message')
        if (noMessage != null) {
            body.removeChild(noMessage)
        }
    }
}
function SaveChats(){
    console.log('working')
    let userChats = document.querySelectorAll('.user .msg')
    let botChats = document.querySelectorAll('.bot .msg')
    let userTime = document.querySelectorAll('.user .time')
    let botTime = document.querySelectorAll('.bot .time')
    let userData = []
    let botData = []
    let userTimeData = []
    let botTimeData = []
    for(i=0;i<userChats.length;i++){
        userData.push(userChats[i].innerText)
        botData.push(botChats[i].innerText)
        userTimeData.push(userTime[i].innerText)
        botTimeData.push(botTime[i].innerText)
    }
    localStorage.setItem('userChat' , JSON.stringify(userData))
    localStorage.setItem('botChat' , JSON.stringify(botData))
    localStorage.setItem('userTime' , JSON.stringify(userTimeData))
    localStorage.setItem('botTime' , JSON.stringify(botTimeData))
}
// console.log(JSON.parse(localStorage.getItem('userChat')))
(function(){
    let userData = JSON.parse(localStorage.getItem('userChat'))
    let botData = JSON.parse(localStorage.getItem('botChat'))
    let userTime = JSON.parse(localStorage.getItem('userTime'))
    let botTime = JSON.parse(localStorage.getItem('botTime'))
    let chatContainer = document.querySelector('.chat-container .body')
    chatContainer.innerHTML = ''
    if(userData){
        for(i=0;i<userData.length;i++){
            chatContainer.innerHTML += `<div class="msg-box user">
                                            <div class="msg">
                                                ${userData[i]}
                                            </div>
                                            <div class="time">
                                                ${userTime[i]}
                                            </div>
                                        </div>`;
            chatContainer.innerHTML += `<div class="msg-box bot">
                                            <div class="msg">
                                                ${botData[i]}
                                            </div>
                                            <div class="time">
                                                ${botTime[i]}
                                            </div>
                                        </div> `;
        }
    }
})()
noMsg();