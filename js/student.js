const time = document.querySelector("#time")
const welcomTo = document.querySelector("#welcomAlert")
const logout = document.querySelector(".logout");
const tasksCard = document.querySelector("#tasksCard");
const restTasks = document.querySelector("#restTasks");
const percents = document.querySelector("#percents");
const innerValue = document.querySelector(".inner-value");
const progressCircle = document.querySelector('.progress-circle-svg');
const priorityIndicator = document.querySelector('.difficulty-indicator');
const taskNextName = document.querySelector('.task-next-name');
const tasksToHtml = document.querySelector('.tasks');
const search = document.querySelector('#search');
const backToAdminBtn = document.querySelector('#back-to-admin-btn');
const msgBody = document.querySelector('.msg-body');
const homeBtn = document.querySelector('#home-btn');
let fromAdmin = false


const tasksAll = getTasks()
backToAdminBtn.style.display = "none"

const findAdminIdByTaskid = (tId) => {
    const filtedId = tasksAll.find(x => x.id == tId)

    return filtedId.principalId
}

homeBtn.onclick = () => {
    removeCurrent()

}
let currentCheck = "";

const currentReal = () => {
    currentCheck = getCurrent()

    if (!currentCheck) {
        location.href = "../html/login.html"
        return
    }

    if (currentCheck.role == "admin") {
        fromAdmin = true
        backToAdminBtn.style.display = "block"
        return getUsers().find(user => user.id == new URLSearchParams(location.search).get("id"))

    }
    return currentCheck
}

const current = currentReal()

setMsgBody = () => {
    msgBody.innerText = ""
    const ul = document.createElement("ul")
    ul.className = "admin-msg-list"
    const msgAll = getMessages()
    const IsExistsManagerBackUp = getManagerBackUp();
    const principalId = current.principalId
    
    const filt = msgAll.filter(x => fromAdmin ? (x.principalId == currentCheck.id ): (principalId.includes(x.principalId))) 
    if (filt.length > 0) {
        filt.forEach(msg => {
            const message = document.createElement("li")
            message.innerText = msg.text
            ul.append(message)
        })
        msgBody.append(ul)

    }
    else {
        msgBody.innerText = "======"
    }
}

backToAdminBtn.onclick = () => {
    window.location.href = "../html/watch.html"

}

const setTimeing = () => {

        const daysOfWeek = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];
        const options = { hour: '2-digit', minute: '2-digit' };
        time.innerText = `${daysOfWeek[new Date().getDay()]} | ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString('he-IL', options)}`

}
const welcomMessage = (current) => {

    const splitName = current.name.trim().split(' ');
    
    const currentHour = new Date().getHours();

    const greetings = [
        { upTo: 5, text: "לילה טוב" },
        { upTo: 12, text: "בוקר טוב" },
        { upTo: 17, text: "צהריים טובים" },
        { upTo: 22, text: "ערב טוב" }
    ];
    const greeting = greetings.find(g => currentHour < g.upTo)?.text || "לילה טוב";

    welcomTo.innerText = `${greeting} , ${splitName[0]}`
}
const getNextTask = (taskArray) => {
    if (!taskArray || taskArray.length == 0) return null;
    const now = new Date();
    const futureTasks = taskArray.filter(task => !task.isDone && new Date(task.deadline) >= now);
    futureTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    return futureTasks[0] || null;
};
const setDetails = (current) => {
    const total = fromAdmin ? (current.taskArray?.filter(x => findAdminIdByTaskid(x.tId) == currentCheck.id).length || 0) : (current.taskArray.length || 0)

    const rest = current.taskArray?.filter(x => fromAdmin ? (!x.isDone && findAdminIdByTaskid(x.tId) == currentCheck.id) :( !x.isDone)).length || 0
    

    tasksCard.innerText = total
    restTasks.innerText = rest
    const totalPercents = total > 0 ? Math.round(((total - rest) / total) * 100) : 0;
    percents.innerText = totalPercents + "%"
    innerValue.innerText = totalPercents + "%"

    progressCircle.style.setProperty('--percent', `${totalPercents}%`);
    const totalTasks = tasksAll.filter(task => fromAdmin ? task.principalId == currentCheck.id : current.principalId.includes(task.principalId))
    const incompleteTasks = current.taskArray.filter(element => {
        const originalTask = tasksAll.find(x => x.id == element.tId);
        return originalTask && !element.isDone
    });

    const mappedTasks = incompleteTasks.map(element => {
        const originalTask = tasksAll.find(x => x.id == element.tId);
        // totalTasks במקוםtasksAll זה לא עבד????????? למורה היקרה! אני אשמח להסבר למה כשכתבתי
        return {
        
            ...element,
            title: originalTask.title,
            deadline: originalTask.deadline,
            priority: originalTask.priority 
        };
    });
    const nextTask = getNextTask(mappedTasks);
    taskNextName.innerText = nextTask?.title || "----------------";

  
    if (priorityIndicator) {
    
        priorityIndicator.className = "difficulty-indicator";

        if (nextTask) {
            if (nextTask.priority === "high") {
                priorityIndicator.innerText = "דחיפות: גבוהה";
                priorityIndicator.classList.add("red-dot");
            } else if (nextTask.priority === "medium") {
                priorityIndicator.innerText = "דחיפות: בינונית";
                priorityIndicator.classList.add("orange-dot");
            } else {
                priorityIndicator.innerText = "דחיפות: נמוכה";
                priorityIndicator.classList.add("green-dot");
            }
        } else {
            priorityIndicator.innerText = "-";
        }
    }

}
const setCards = (arr) => {
    tasksToHtml.innerHTML = "";

    arr.forEach(element => {
        if ((fromAdmin && currentCheck.id == findAdminIdByTaskid(element.tId)) || !fromAdmin) {
            const currentTask = tasksAll.find(x => x.id == element.tId)
            const task = document.createElement("div")
            task.className = "task";
            const taskHeaderRow = document.createElement("div")
            taskHeaderRow.className = "task-header-row";
            const category = document.createElement("span")
            category.className = "category";
            category.innerText = currentTask.category
            taskHeaderRow.append(category)

            const priorityDot = document.createElement("span")
            priorityDot.classList.add("priority-dot");
            if (currentTask.priority === "high") {
                priorityDot.classList.add("red-dot");
                priorityDot.setAttribute("data-tooltip", "חשיבות: גבוהה");

            } else if (currentTask.priority === "medium") {
                priorityDot.classList.add("orange-dot");
                priorityDot.setAttribute("data-tooltip", "חשיבות: בינונית");

            } else {
                priorityDot.classList.add("green-dot");
                priorityDot.setAttribute("data-tooltip", "חשיבות: נמוכה");

            }

            taskHeaderRow.append(priorityDot)
            task.append(taskHeaderRow)
            const taskTitle = document.createElement("div")
            taskTitle.className = "task-title";
            taskTitle.innerText = currentTask.title
            task.append(taskTitle)
            const deadline = document.createElement("p")
            deadline.innerText = currentTask.deadline
            task.append(deadline)
            const studentTaskActions = document.createElement("div")
            studentTaskActions.className = "student-task-actions"
            const doneContainer = document.createElement("label")
            doneContainer.className = "done-container"
            const taskCheckbox = document.createElement("input")
            taskCheckbox.className = "task-checkbox"
            taskCheckbox.type = "checkbox"
            if (fromAdmin) {
                taskCheckbox.disabled = true
            }
            taskCheckbox.checked = element.isDone;
            const now = new Date();
            const taskDeadline = new Date(currentTask.deadline);

            taskCheckbox.onchange = (e) => {

                const timeNow = new Date().getTime();
                const deadlineTime = new Date(currentTask.deadline).getTime();

                if (timeNow > deadlineTime && !element.isDone) {
                    alert("לא ניתן לסמן משימה כבוצעה לאחר תאריך ההגשה!");
                    taskCheckbox.checked = false;
                    event.preventDefault();
                    return;
                }
                element.isDone = taskCheckbox.checked;
                const users = getUsers();
                const index = users.findIndex(x => x.id == current.id);

                if (index !== -1) {
                  
                    users[index].taskArray = current.taskArray;
                    setUsers(users);
                     localStorage.setItem("current", JSON.stringify(current))
                }

                setDetails(current);
            };
            doneContainer.append(taskCheckbox)

            const checkMark = document.createElement("span")
            checkMark.className = "checkmark"
            doneContainer.append(checkMark)
            const textNode = document.createTextNode("בוצע");
            doneContainer.append(textNode);


            studentTaskActions.append(doneContainer)
            task.append(studentTaskActions)
            tasksToHtml.append(task)
        }
    });

}
search.oninput = (e) => {
    filtArr = tasksAll.filter(x => (fromAdmin ? x.principalId == current.id : current.principalId.includes(x.principalId)) && (x.title.toLowerCase().includes(e.target.value.toLowerCase().trim()) || x.category.toLowerCase().includes(e.target.value.toLowerCase().trim())))
    filtId = filtArr.map(x => x.id)
    filtfiltArr = current.taskArray.filter(x => filtId.includes(x.tId))
    if (filtfiltArr.length === 0) {
        tasksToHtml.innerText = "לא נמצאו משימות תואמות ..."

    }
    else {
        setCards(filtfiltArr)
    }
}
logout.onclick = () => {
    removeCurrent()
    window.location.href = "../html/login.html";
}
setMsgBody()
setTimeing()
welcomMessage(current)
setDetails(current)
setCards(current.taskArray)
setInterval(()=>welcomMessage(current), 60000);
setInterval(setTimeing,1000*30)
