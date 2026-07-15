const logout = document.querySelector(".logout");
const message = document.querySelector("#message");
const watch = document.querySelector("#watch");
const newStudent = document.querySelector("#newStudent");
const addingTask = document.querySelector("#addingTask");
const welcomTo = document.querySelector("#welcomTo");
const timeing = document.querySelector("#timeing");
const sumStudents = document.querySelector("#sum-students");
const sumTasks = document.querySelector("#sum-tasks");
const totalPercent = document.querySelector("#total-percent");
const tasksToHtml = document.querySelector(".tasks");
const homeBtn = document.querySelector('#home-btn');
const current = getCurrent();

if (!current) {
    window.location.href = "../html/login.html";
} else {

    const setTimeing = () => {
        
            const daysOfWeek = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];
            const options = { hour: '2-digit', minute: '2-digit' };
            timeing.innerText = `${daysOfWeek[new Date().getDay()]} | ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString('he-IL', options)}`;
       
    };

    const setTasksToHtml = (current) => {
        tasksToHtml.innerHTML = "";
        const arr = getTasks() || [];
        const arrTaskForPrincipal = arr.filter(x => x.principalId == current.id);
        
        arrTaskForPrincipal.forEach(x => {
            const newTask = document.createElement("div");
            newTask.className = "task";
            
            const category = document.createElement("span");
            category.className = "category";
            category.innerText = x.category;
            newTask.append(category);

            const taskTitle = document.createElement("h4");
            taskTitle.className = "task-title";
            taskTitle.innerText = x.title;
            newTask.append(taskTitle);

            const deadLine = document.createElement("p");
            deadLine.innerText = "תאריך הגשה: " + x.deadline;
            newTask.append(deadLine);

            const buttons = document.createElement("div");

            const btnEdit = document.createElement("button");
            btnEdit.onclick = () => {
                window.location.href = `../html/addingTask.html?id=${x.id}`;
            };
            btnEdit.className = "edit";
            btnEdit.innerText = "עריכה";
            buttons.append(btnEdit);

            const btnDelete = document.createElement("button");
            btnDelete.onclick = () => {
                const tasksArray = getTasks();
                const filtArr = tasksArray.filter(t => t.id != x.id);
                setTasksToLs(filtArr);
                
                const users = getUsers() 
                const students = users.filter(user => user.role == "student" && user.principalId.includes(current.id));
                
                students.forEach((student) => {
                    student.taskArray = (student.taskArray || []).filter(task => task.tId != x.id);
                });
                
                setUsers(users);
                setTasksToHtml(current);
                setDetails(current);
            };
            btnDelete.className = "delete";
            btnDelete.innerText = "מחיקה";
            buttons.append(btnDelete);
            
            newTask.append(buttons);
            tasksToHtml.append(newTask);
        });
    };

    const setDetails = (current) => {
        let totalUsers = 0;
        const users = getUsers() || [];
        users.forEach(element => {
            if (element.role == "student" && element.principalId.includes(current.id))
                totalUsers++;
        });
        sumStudents.innerText = totalUsers;

        let totalTask = 0;
        const tasksAll = getTasks() || [];
        tasksAll.forEach(element => {
            if (element.principalId == current.id) {
                totalTask++;
            }
        });
        sumTasks.innerText = totalTask;
        setPercents(current);
    };

    const setPercents = (current) => {
        const users = getUsers() || [];
        const students = users.filter(
            user => user.role === "student" && user.principalId.includes(current.id)
        );

        if (students.length === 0) {
            totalPercent.innerText = "0%";
            return;
        }

        const tasks = getTasks()?.filter(
            task => task.principalId === current.id
        ) || [];

        if (tasks.length === 0) {
            totalPercent.innerText = "0%";
            return;
        }

        let completedTasks = 0;

        tasks.forEach(task => {
            const allStudentsDone = students.every(student => {
                return (student.taskArray || []).find(
                    t => t.tId === task.id && t.isDone === true
                );
            });

            if (allStudentsDone) {
                completedTasks++;
            }
        });

        const percent = Math.round((completedTasks / tasks.length) * 100);
        totalPercent.innerText = percent + "%";
    };

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
        welcomTo.innerText = `${greeting}, ${splitName[0]}`;
    };

    homeBtn.onclick = () => { removeCurrent(); };
    logout.onclick = () => { removeCurrent(); };
    addingTask.onclick = () => { window.location.href = "../html/addingTask.html"; };
    message.onclick = () => { window.location.href = "../html/message.html"; };
    watch.onclick = () => { window.location.href = "../html/watch.html"; };
    newStudent.onclick = () => { window.location.href = "../html/newStudent.html"; };

    welcomMessage(current);
    setTimeing();
    setDetails(current);
    setTasksToHtml(current);
    
    
    setInterval(() => welcomMessage(current), 60000);
    setInterval(setTimeing,1000*30)
}