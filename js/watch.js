const backBtn = document.querySelector(".back-btn")
const addStudentFastBtn = document.querySelector(".add-student-fast-btn")
const studentsContainer = document.querySelector("#students-container")
const studentSearchInput = document.querySelector("#student-search-input")

let usersAll = getUsers()
const current = getCurrent()
if(!current)
{
    window.location.href="../html/login.html"
}

studentSearchInput.oninput = (e) => {
    const filted = usersAll.filter(x => x.role == "student" && x.principalId == current.id).filter(student =>
        student.name.toLowerCase().includes(e.target.value.trim().toLowerCase()) || student.id.includes(e.target.value.trim())
    )
    if (filted.length > 0) {
        setStudentsContainer(filted)
    }
    else {
        studentsContainer.innerText = "לא נמצאו סטודנטים תואמים לפרטים שהוזנו..."
    }
}
const setPercents = (currentStudent) => {
    const total = currentStudent.taskArray?.length || 0;
    const rest = currentStudent.taskArray?.filter(x => !x.isDone).length || 0
    const totalPercents = total > 0 ? Math.round(((total - rest) / total) * 100) : 0;
    return totalPercents
}

const setStudentsContainer = (arr) => {
    studentsContainer.innerText = ""
    arr.forEach(element => {
        const student = document.createElement("div")
        student.className = "student-card"
        const studentAvatar = document.createElement("div")
        studentAvatar.className = "student-avatar"
        const span = document.createElement("span")
        const arrName = element.name.trim().split(" ")
        const firstName = arrName[0] ? arrName[0].split("") : []
        const lastName = arrName[1] ? arrName[1].split("") : []
        span.innerText = (firstName[0] || "") + (lastName[0] || "")
        studentAvatar.append(span)
        student.append(studentAvatar)
        const fullName = document.createElement("h3")
        fullName.className = "student-name"
        fullName.innerText = element.name.trim()
        student.append(fullName)
        const studentId = document.createElement("span")
        studentId.className = "student-id"
        studentId.innerText = element.id
        student.append(studentId)
        const progressSection = document.createElement("div")
        progressSection.className = "progress-section"
        const progressTextRow = document.createElement("span")
        progressTextRow.className = "progress-text-row"
        const percentsText = document.createElement("span")
        percentsText.innerText = "אחוז השלמת מטלות"
        progressTextRow.append(percentsText)
        const progressPercentVal = document.createElement("span")
        progressPercentVal.className = "progress-percent-val"
        const percentTotal = setPercents(element)
        progressPercentVal.innerText = percentTotal + "%"
        progressTextRow.append(progressPercentVal)
        progressSection.append(progressTextRow)

        const progressBarBg = document.createElement("div")
        progressBarBg.className = "progress-bar-bg"
        const progressBarFill = document.createElement("div")
        progressBarFill.className = "progress-bar-fill"
        progressBarFill.style.width = percentTotal + "%"
        progressBarBg.append(progressBarFill)

        progressSection.append(progressBarBg)
        student.append(progressSection)
        const studentCardActions = document.createElement("div")
        studentCardActions.className = "student-card-actions"


        const viewProfileBtn = document.createElement("button")
        viewProfileBtn.className = "view-profile-btn"
        viewProfileBtn.innerText = "צפיה בפרופיל"
        viewProfileBtn.onclick = () => {
 
            window.location.href = `../html/student.html?id=${element.id}&principalId=${current.id}`
        }
        studentCardActions.append(viewProfileBtn)

        const deleteStudentBtn = document.createElement("button")
        deleteStudentBtn.className = "delete-student-btn"
        deleteStudentBtn.innerText = "מחיקה"
        deleteStudentBtn.onclick = () => {
            const filtedArr = usersAll.filter(x => x.id != element.id)
            setUsers(filtedArr)
            usersAll = filtedArr
            const updatedStudents = filtedArr.filter(x => x.role == "student" && x.principalId == current.id);
            setStudentsContainer([...updatedStudents].sort((a, b) => a.name.trim().localeCompare(b.name.trim())));
        }
        studentCardActions.append(deleteStudentBtn)

        student.append(studentCardActions)
        studentsContainer.append(student)

    });
}

setStudentsContainer(usersAll.filter(x => x.role == "student" && x.principalId == current.id)
.sort((a, b) => a.name.trim().localeCompare(b.name.trim())) || [])


backBtn.onclick = () => {
    window.location.href = "../html/admin.html"
}
addStudentFastBtn.onclick = () => {
    
    window.location.href = "../html/newStudent.html"
}