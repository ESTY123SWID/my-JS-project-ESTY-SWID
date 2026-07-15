const logoutBtn = document.querySelector(".logout")
const msgForm = document.querySelector("#msg-form")
const isSuccess = document.querySelector("#isSuccess")
const messagesHistoryCard = document.querySelector(".messages-history-card")
const msgText = document.querySelector("#msg-text")

msgText.parentElement.style.position = "relative";
msgText.setAttribute("data-tooltip", "ההודעה תופץ לכל התלמידים שלך");
let msg = getMessages()

const current = getCurrent()
if(!current)
{
    window.location.href="../html/login.html"
}
//אני אשמח אם המורה תוכל להסביר לי למה כשהכנסנו את זה לתוך if זה עצר את הרינדור האינסופי המתרגלת הסתבכה להסביר לי למה?
else{

msgForm.onsubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    data["id"] = (Date.now() + Math.floor(Math.random() * 10)).toString()
    data["principalId"] = current.id
    data["dateTime"] = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}`
    const allMessages = getMessages()
    const find = allMessages.find(x => x.text == data.text)
    if (find) {
        isSuccess.innerText = "הודעה זו כבר פורסמה!"
        isSuccess.style.color = "red"
    }
    else {
        setMessages(data)
        isSuccess.style.color = "#0f172a"
        isSuccess.innerText = "ההודעה נוספה בהצלחה!"
        setTimeout(() => {
    isSuccess.innerText = "";
}, 3000);
        msgForm.reset()
        msg=getMessages()
        renderFilteredHistory();

    }

}

const setHistoryCard = (arr) => {
    messagesHistoryCard.innerText = ""
    const H2 = document.createElement("h2")
    H2.className = "section-title"
    H2.innerText = "נוספו לאחרונה"
    messagesHistoryCard.append(H2)
    const messagesContainer = document.createElement("div");
    messagesContainer.className = "messages-list";
    messagesContainer.id = "messages-container";
    arr.forEach(x => {
       
        const msgItem = document.createElement("div")
        msgItem.className = "msg-item"
        const msgContent = document.createElement("p")
        msgContent.className = "msg-content"
        msgContent.innerText = x.text.trim()
        msgItem.append(msgContent)
        const msgFooter = document.createElement("div")
        msgFooter.className = "msg-footer"
        const msgDate = document.createElement("span")
        msgDate.className = "msg-date"
        msgDate.innerText = x.dateTime
        msgFooter.append(msgDate)


        const deleteMsgBtn = document.createElement("button")
        deleteMsgBtn.className = "delete-msg-btn"
        deleteMsgBtn.innerText = "מחיקה"
        deleteMsgBtn.title = "מחק הודעה"
        deleteMsgBtn.setAttribute("data-tooltip", "מחיקת ההודעה לצמיתות");
        deleteMsgBtn.onclick = () => {

            const filtedMsg = getMessages().filter(message => x.id != message.id)
            setMessagesAll(filtedMsg)
            msg = getMessages()
          
            renderFilteredHistory();
        }
        msgFooter.append(deleteMsgBtn)
        msgItem.append(msgFooter)

        messagesContainer.append(msgItem)

    })
        messagesHistoryCard.append(messagesContainer)

}

const  renderFilteredHistory=()=> {
    const now = new Date();
    const tenAgo = new Date();
    tenAgo.setDate(now.getDate() - 10);
    

    const recentMsg = msg.filter(x => {
        const datePart = x.dateTime.split("|")[0].trim();
        const [day, month, year] = datePart.split(".");
        const formattedDate = new Date(`${year}-${month}-${day}`);
        return formattedDate >= tenAgo && x.principalId == current.id;
    });
    
    // בדיקת אורך אמיתית ומדויקת
    if (recentMsg.length > 0) {
        setHistoryCard(recentMsg);
    } else {
        messagesHistoryCard.innerHTML = "<h2 class='section-title'>הודעות שנוספו לאחרונה</h2><p style='text-align:center; color:#6b7280; padding:20px;'>אין הודעות מהזמן האחרון</p>";
    }
}



renderFilteredHistory();
logoutBtn.onclick = () => {
    removeCurrent()
    window.location.href = "../html/login.html"
}
}