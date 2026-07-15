const form = document.querySelector("form");
const isSuccess = document.querySelector("#is-success");

const rejex = {
    id: /^[0-9]{9}$/,
    name: /^([א-ת"'-]{2,})(\s+[א-ת"'-]{2,})+$/,
    userName: /^([A-Za-z0-9!@#$%^&*(),.?":{}|<>]{5,12})$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{5,20}$/,
    campus: /^[A-Za-z-'א-ת]{2,100}$/,
    idMsg: "מספר תעודת זהות חייב לכלול 9 ספרות",
    nameMsg: "שם בעברית בלבד!",
    userNameMsg: " שם משתמש חייב להיות  אנגלית ותווים - בין 5 ל-12 תווים",
    passwordMsg: "סיסמה חייבת להיות באנגלית בין 5 ל-20 תווים - כולל ספרה אחת ותו מיוחד",
    campusMsg: "שם הקמפוס מכיל אותיות בלבד!"

}
const allInputs = Array.from(form.elements)
allInputs.forEach(input => {
    if (input.tagName == "INPUT") {
        input.addEventListener('blur', () => { rejexFunc(input) })
    }
})

const rejexFunc = (input) => {
    const rule = rejex[input.name]
    const trimmedValue = input.value.trim()
console.log(rule)


    if (trimmedValue === "") {
        input.style.borderBottom = "";
        return false;
    }
    const isValid = rule.test(trimmedValue)
    if (!isValid) {
        isSuccess.innerText = rejex[input.name + "Msg"]
        isSuccess.style.color = "red"
        input.style.borderBottom = "2px solid red";
        return false;
    } else {
        input.style.borderBottom = "";
        isSuccess.innerText = ""
        return true;

    }
}

form.onsubmit = (e) => {
    e.preventDefault()
    
    isSuccess.innerText = ""; 
    let isFormValid = true
    allInputs.forEach(input => {
        if (input.tagName == "INPUT"){
    const isValid = rejexFunc(input)
        if (!isValid)
            isFormValid = false

        }
        
    })
    if (!isFormValid) {
        isSuccess.innerText = "יש לתקן את כל השדות"
         isSuccess.style.color = "red";
        return
    }


    const data = Object.fromEntries(new FormData(e.target))
    Object.keys(data).forEach(key => {
        data[key] = data[key].trim();
    });
    const users = getUsers() 

    data["role"] = "admin"
    const isExist = users.find(x => x.id == data.id && x.role == "admin")
    if (isExist) {
        isSuccess.innerText = "משתמש קיים במערכת!"
    }
    else {
        setUser(data)
        localStorage.setItem("current",JSON.stringify(data))

        isSuccess.style.color = "#0f172a"
        isSuccess.innerText = "ההרשמה הושלמה.המשך יום טוב!"
        form.reset()

        setTimeout(() => { window.location.href = "../html/admin.html" }, 2000)

    }

}
