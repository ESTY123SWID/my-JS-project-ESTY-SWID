const form = document.querySelector("#form")
const msg = document.querySelector("#msg")
const select = document.querySelector("select")
const addingTaskTitle = document.querySelector("#addingTaskTitle")
const addingTaskBtn = document.querySelector("#addingTaskBtn")
const current = getCurrent()
const urlParams = new URLSearchParams(location.search);
const lastTask = getTasks().filter(t => t.id == urlParams.get("id"))[0]
if (!current) {
    window.location.href = "../html/login.html"
}

select.onchange = () => {
    select.style.color = "black"
}


if (lastTask) {
    addingTaskTitle.innerText = "עריכת משימה"
    addingTaskBtn.innerText = "סיום"
    const lastTaskFilt = Object.fromEntries(Object.entries(lastTask).filter(([key, value]) => key != "id" && key != "principalId"))
    Object.entries(lastTaskFilt).forEach(([key, value]) => form[key].value = value)
}
form.onsubmit = (e) => {

    e.preventDefault()


    const tasks = getTasks()

    const data = Object.fromEntries(new FormData(e.target))

    Object.keys(data).forEach(key => {
        data[key] = data[key].toString().trim();
    });

    data["principalId"] = current.id
    if (lastTask) {
        const find = tasks.find(task =>
            task.id !== lastTask.id &&
            task.title === data.title &&
            task.category === data.category &&
            task.deadline === data.deadline
        );

        if (find) {
            msg.innerText = "כבר קיימת משימה כזו!";
            msg.style.color = "red";

            return;
        }
        data.id = lastTask.id

        const index = tasks.findIndex(
            t => t.id == lastTask.id
        );

        tasks[index] = data;

        setTasksToLs(tasks);
        msg.style.color = "#0f172a"
        msg.innerText = "המטלה עודכנה בהצלחה!"
        form.reset()
        setTimeout(() => { window.location.href = "../html/admin.html" }, 1500)
    }
    else {
        data["id"] = (Date.now() + Math.floor(Math.random() * 10)).toString()

        const find = tasks.find(({ title, category, deadline }) =>
            title == data.title && category == data.category && deadline == data.deadline

        )

        if (find) {
            msg.innerText = "כבר קיימת משימה כזו!"
            msg.style.color = "red"
        }
        else {
            const users = getUsers()
            const students = users.filter(x => x.role == "student" && x.principalId?.includes(current.id))
            students.forEach(element => {
                element.taskArray.push({ tId: data.id, isDone: false })
            });
            setUsers(users)
            setTasks(data)

            msg.style.color = "#0f172a"
            msg.innerText = "המטלה נוספה בהצלחה!"
            form.reset()
            setTimeout(() => { window.location.href = "../html/admin.html" }, 1500)

        }


    }

}