

const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#errorMessage");
const logBtn = document.querySelector(".log-btn");
const userPassword = document.querySelector("#userPassword");
const userName = document.querySelector("#userName");
const signUp = document.querySelector("#sign-up");

const rejex = {
    userName: /^([A-Za-z0-9!@#$%^&*(),.?":{}|<>]{5,12})$/,
    userPassword: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{5,20}$/,
    userNameMsg: " שם משתמש חייב להיות  אנגלית ותווים - בין 5 ל-12 תווים",
    userPasswordMsg: "סיסמה חייבת להיות באנגלית בין 5 ל-20 תווים - כולל ספרה אחת ותו מיוחד"

}

const rejexFunc = (input) => {
    const rule = rejex[input.name]

    const valueTrimmed = input.value.trim();
    if (valueTrimmed == "") {
        input.style.borderBottom = "";
        return false;
    }
    const isValid = rule.test(input.value)
    if (!isValid) {
        errorMessage.innerText = rejex[input.name + "Msg"]
        input.style.borderBottomColor = "red";
        return false
    }
    else {
        input.style.borderBottom = "";
        errorMessage.innerText = ""
        return true;
    }
}

const allInputs = Array.from(form.elements)
allInputs.forEach(x => {
    if (x.tagName == 'INPUT') {
        x.addEventListener('blur', () =>  rejexFunc(x) )
    }
}

)

form.onsubmit = (e) => {
    e.preventDefault();

    errorMessage.innerText = "";
    const isFormValid = true
    allInputs.forEach(input => {

        if (input.tagName == "INPUT") {
            const isValid = rejexFunc(input)
            if (!isValid)
                isFormValid = false
        }


    })
    if (!isFormValid) {
        errorMessage.innerText = "נא למלא את כל השדות כנדרש.";
        errorMessage.style.color = "red";
        return
    }

    const data = Object.fromEntries(new FormData(e.target))

    const users = getUsers() 
    
    const find = users.find(user => (user.password.trim() == data.userPassword.trim()) && (user.userName.trim() == data.userName.trim()))

    if (!find) {
        errorMessage.innerText = "אחד או יותר מפרטי ההזדהות שהוכנסו שגויים"
    } else {
        errorMessage.innerText = ""
        localStorage.setItem("current", JSON.stringify(find))
        logBtn.innerText = "מתחבר..."
        setTimeout(() => {
            if (find.role == "admin") {
                window.location.href = "../html/admin.html"
            }
            else {
                window.location.href = "../html/student.html"
            }
        }, 1000)
        form.reset()

    }
}

signUp.onclick = () => {
    window.location.href = "../html/signUp.html"
}