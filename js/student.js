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

backToAdminBtn.style.display = "none"

const currentReal = () => {
    const currentCheck = getCurrent()
    if (!currentCheck) {
        window.location.href = "../html/login."
        return
    }

    if (currentCheck.role == "admin") {
        backToAdminBtn.style.display = "block"
        return getUsers().find(user => user.id == new URLSearchParams(location.search).get("id")&&user.principalId==new URLSearchParams(location.search).get("principalId"))

    }
    return currentCheck
}
const current = currentReal()

const homeBtn = document.querySelector('#home-btn');
const tasksAll = getTasks()


setMsgBody = () => {
    msgBody.innerText = ""
    const ul = document.createElement("ul")
    ul.className = "admin-msg-list"
    const msgAll = getMessages()
    const IsExistsManagerBackUp = getManagerBackUp();
    const principalId = current.principalId
    const filt = msgAll.filter(x => x.principalId.trim() == principalId.trim())
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
    setInterval(() => {
        const daysOfWeek = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];
        const options = { hour: '2-digit', minute: '2-digit' };
        time.innerText = `${daysOfWeek[new Date().getDay()]} | ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString('he-IL', options)}`
    }, 100)

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
    const total = current.taskArray?.length || 0;
    const rest = current.taskArray?.filter(x => !x.isDone).length || 0
    tasksCard.innerText = total
    restTasks.innerText = rest
    const totalPercents = total > 0 ? Math.round(((total - rest) / total) * 100) : 0;
    percents.innerText = totalPercents + "%"
    innerValue.innerText = totalPercents + "%"

    progressCircle.style.setProperty('--percent', `${totalPercents}%`);
    const totalTasks = tasksAll.filter(task => task.principalId == current.principalId)
    //////////////////////////////////////////////////////////////////
    const incompleteTasks = current.taskArray.filter(element => {
        const originalTask = tasksAll.find(x => x.id == element.tId);
        // בודקים שהמשימה שייכת לסטודנט, שהיא לא בוצעה, ושיש לה תאריך תקף
        return originalTask && !element.isDone && originalTask.principalId == current.principalId;
    });

    // נמפה את זה כדי ש-getNextTask תקבל אובייקטים עם deadline ו-title
    const mappedTasks = incompleteTasks.map(element => {
        const originalTask = tasksAll.find(x => x.id == element.tId);
        return {
            ...element,
            title: originalTask.title,
            deadline: originalTask.deadline,
            priority: originalTask.priority // נשמור גם את רמת הדחיפות לפיתוח הבא שלך
        };
    });

    const nextTask = getNextTask(mappedTasks);
    taskNextName.innerText = nextTask?.title || "----------------";

    // בונוס: עדכון רמת הדחיפות של המשימה הקרובה ביותר במסך!
    if (priorityIndicator) {
        // מנקים לחלוטין קלאסים ישנים כדי שרק ה-CSS החדש ישפיע
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

    //////////////////////////////////////////////////////
}
const setCards = (arr) => {
    tasksToHtml.innerHTML = "";

    arr.forEach(element => {
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
        taskCheckbox.checked = element.isDone;
        const now = new Date();
        const taskDeadline = new Date(currentTask.deadline);
       
        taskCheckbox.onchange = () => {

      const timeNow = new Date().getTime();
    const deadlineTime = new Date(currentTask.deadline).getTime();

    if (timeNow > deadlineTime &&!element.isDone) {
        alert("לא ניתן לסמן משימה כבוצעה לאחר תאריך ההגשה!");
       taskCheckbox.checked = false; 
        event.preventDefault(); 
        return; 
    }

   


            // 1. משנים את הסטטוס של המשימה הספציפית בתוך האובייקט הנוכחי
            element.isDone = taskCheckbox.checked;

            // 2. שולפים את המערך הכללי של המשתמשים
            const users = getUsers();

            // 3. מוצאים את המשתמש הנוכחי במערך
            const index = users.findIndex(x => x.id == current.id);

            if (index !== -1) {
                // 4. מעדכנים את ה-taskArray של המשתמש בתוך המערך הגדול
                users[index].taskArray = current.taskArray;

                // 5. שומרים את המערך המעודכן בחזרה ל-LocalStorage
                setUsers(users);


                const loggedInUser = getCurrent();
                if (loggedInUser.role == "student" && loggedInUser.id === current.id)
                    localStorage.setItem("current", JSON.stringify(current))



            }

            // 7. קוראים לפונקציות הריענון של המסך
            setDetails(current);
        };
        doneContainer.append(taskCheckbox)

        const checkMark = document.createElement("span")
        checkMark.className = "checkmark"
        doneContainer.append(checkMark)
        const textNode = document.createTextNode("בוצע");
        doneContainer.append(textNode);//חשוב מאוד! אסור לדרוס!


        studentTaskActions.append(doneContainer)
        task.append(studentTaskActions)
        tasksToHtml.append(task)
    });

}
search.oninput = (e) => {
    filtArr = tasksAll.filter(x => x.principalId == current.principalId && (x.title.toLowerCase().includes(e.target.value.toLowerCase().trim()) || x.category.toLowerCase().includes(e.target.value.toLowerCase().trim())))
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





    window.location.href = "../html/login.html";
}
setMsgBody()
setTimeing()
welcomMessage(current)
setDetails(current)
setCards(current.taskArray)
setInterval(welcomMessage(current), 60000);
