const addAllDataToLs=()=>{
    if(!localStorage.getItem('users')){
        localStorage.setItem("users",JSON.stringify(users))
    }
    if(!localStorage.getItem("tasks")){
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    if(!localStorage.getItem("messages")){
        localStorage.setItem("messages",JSON.stringify([]))
    }
}
addAllDataToLs()
const getUsers=()=>{
    return JSON.parse(localStorage.getItem("users"))

}
const getMessages=()=>{
    return JSON.parse(localStorage.getItem("messages"))||[]

}
const setMessages=(message)=>{
    const allMessages=getMessages()||[]
    allMessages.push(message)

   localStorage.setItem("messages" ,JSON.stringify( allMessages))

}
const setMessagesAll=(messages)=>{
   

   localStorage.setItem("messages" ,JSON.stringify(messages))

}
const setUser=(newUser)=>{
    const allUsers=getUsers()||[]
    allUsers.push(newUser)

   localStorage.setItem("users" ,JSON.stringify( allUsers))

}
const getTasks=()=>{
    return JSON.parse(localStorage.getItem("tasks"))
}
const setTasks=(task)=>{
    const allTask=getTasks()||[]
    allTask.push(task)
    localStorage.setItem("tasks",JSON.stringify(allTask))
}
const getCurrent=()=>{
    return JSON.parse(localStorage.getItem("current"))
}
const getManagerBackUp=()=>{
    return JSON.parse(localStorage.getItem("managerBackUp"))
}
const setUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users))
}
const setTasksToLs=(allTask)=>{
    localStorage.setItem("tasks",JSON.stringify(allTask))

}
const removeCurrent=()=>{
    localStorage.removeItem("current")
     window.location.href="../html/login.html"
}
