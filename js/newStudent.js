const form = document.querySelector("#addingForm");
const isSuccess = document.querySelector("#message");

const current = getCurrent();
if (!current) {
    window.location.href = "../html/login.html";
}


const rejex = {
    id: /^[0-9]{9}$/,
    name: /^([א-ת"'-]{2,})(\s+[א-ת"'-]{2,})+$/,
    userName: /^([A-Za-z0-9!@#$%^&*(),.?":{}|<>]{5,12})$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{5,15}$/,
    idMsg: "מספר תעודת זהות חייב לכלול 9 ספרות",
    nameMsg: "שם בעברית מלא (פרטי ומשפחה) בלבד!",
    userNameMsg: " שם משתמש חייב להיות  אנגלית ותווים - בין 5 ל-12 תווים",
    passwordMsg: "סיסמה חייבת להיות באנגלית בין 5 ל-15 תווים - כולל ספרה אחת ותו מיוחד"
};

const validateInput = (input) => {

    const rule = rejex[input.name];
    const valueTrimmed = input.value.trim();


    if (valueTrimmed === "") {
        input.style.borderBottom = "";
        return false;
    }
    console.log(rule)
    const isValid = rule.test(valueTrimmed);

    if (!isValid) {

        isSuccess.innerText = rejex[input.name + "Msg"];
        isSuccess.style.color = "red";
        input.style.borderBottom = "2px solid red";
        return false;
    } else {

        input.style.borderBottom = "";
        isSuccess.innerText = ""
        return true;
    }
};


Array.from(form.elements).forEach(input => {
    if (input.tagName === "INPUT") {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    }
});


form.onsubmit = (e) => {
    e.preventDefault();

    isSuccess.innerText = "";
    let isFormValid = true;

    Array.from(form.elements).forEach(input => {
        if (input.tagName === "INPUT") {
            const isValid = validateInput(input);
            if (!isValid) {
                isFormValid = false;
            }
        }
    });


    if (!isFormValid) {
        if (isSuccess.innerText === "") {
            isSuccess.innerText = "נא למלא את כל השדות כנדרש.";
            isSuccess.style.color = "red";
        }
        return;
    }

    const users = getUsers() 

    const data = Object.fromEntries(new FormData(e.target));
    Object.keys(data).forEach(key => {
        data[key] = data[key].trim();
    });

    const isExsistForThisAdmin = users.find(x => x.id == data.id && x.principalId?.includes(current.id));
    const isExsist = users.find(x => x.id == data.id)
    if (isExsistForThisAdmin) {
        isSuccess.innerText = "משתמש קיים במערכת!";
        isSuccess.style.color = "red";

        return
    }
    else if (isExsist) {

        const task = getTasks() 
        const arr = task.filter(x => x.principalId == current.id);
        const totalArr = isExsist.taskArray
        arr.forEach(element => {
            totalArr.push({ tId: element.id, isDone: false });
        });


        isExsist.principalId.push(current.id)

        setUsers(users)

        isSuccess.style.color = "#0f172a";
        isSuccess.innerText = "התלמיד נוסף בהצלחה!";
        form.reset();
        setTimeout(() => {
            window.location.href = "../html/admin.html";
        }, 1500);
        return
    }
    else {

        data["role"] = "student";
        data["principalId"] = [current.id];

        
        const task = getTasks() 
        const arr = task.filter(x => x.principalId == current.id);
        const totalArr = [];
        arr.forEach(element => {
            totalArr.push({ tId: element.id, isDone: false });
        });
        data["taskArray"] = totalArr;

        setUser(data);
        isSuccess.style.color = "#0f172a";
        isSuccess.innerText = "התלמיד נוסף בהצלחה!";
        form.reset();
        setTimeout(() => {
            window.location.href = "../html/admin.html";
        }, 1500);
    }
};