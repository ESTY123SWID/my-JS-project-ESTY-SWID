const form = document.querySelector("#addingForm")
const  isSuccess = document.querySelector("#message")
 const current = getCurrent()
 if(!current)
{
    window.location.href="../html/login.html"
}

const rejex={
    id:/^[0-9]{9}$/,
    name:/^([א-ת]{2,})(\s+[א-ת]{2,})+$/,
     userName:/^([A-Z a-z 0-9 !@#$%^&*(),.?":{}|<>]){5,12}$/,
    userPassword:/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])([A-Z a-z 0-9 !@#$%^&*(),.?":{}|<>]){5,15}$/,
    idMsg:"מספר תעודת זהות חייב לכלול 9 ספרות",
    nameMsg:"שם בעברית בלבד!",
    userNameMsg:"שם משתמש חייב להיות בן לפחות חמישה תווים ",
    userPasswordMsg:"סיסמה חייבת להיות בת לפחות חמישה תווים- כולל ספרה אחת ותו אחד"
}
const rejexFunc=(input)=>{
    const rule=rejex[input.name]
    if(!rule)
        return
    const isValid=rule.test(input.value)
    if(!isValid&&input.value!=""){
        isSuccess.innerText=rejex[input.name+"Msg"]
      
        input.style.borderBottom = "2px solid red";
    
    }else{
        input.style.borderBottomColor = "";
        isSuccess.innerText=""
    }
}



form.onsubmit = (e) => {
   
    e.preventDefault()


    let isFormValid = true;
Array.from(form.elements).forEach(input=>{
    if(input.tagName=="INPUT"){
        input.addEventListener('blur',()=>{rejexFunc(input)})
        // בודקים אם השדה קיבל צבע אדום (כלומר נכשל ב-Regex)
            if (input.style.borderBottomColor === "red") {
                isFormValid = false; // הטופס לא תקין!
            }
    }
})



if (!isFormValid) {
        errorMessage.innerText = "נא לתקן את השדות המסומנים באדום לפני השליחה.";
        return; // ה-return הזה קוטע את הפונקציה ולא מאפשר להמשיך הלאה!
    }


    
    const data = Object.fromEntries(new FormData(e.target))
    Object.keys(data).forEach(key => {
    data[key] = data[key].trim();
});
    data["role"] = "student"
    data["principalId"] = current.id
    const task = getTasks()||[]
    const arr = task.filter(x => x.principalId == current.id)
    const totalArr = []
    arr.forEach(element => {
        totalArr.push({ tId: element.id, isDone: false })

    });
    data["taskArray"]=totalArr
    const users=getUsers()||[]

const isExsist=users.find(x=>x.id==data.id && x.principalId==current.id)
    if(isExsist)
    {
        isSuccess.innerText="משתמש קיים במערכת!"
        isSuccess.style.color="red"
    }
     else{
    setUser(data)
        isSuccess.style.color="#0f172a"
        isSuccess.innerText="התלמיד נוסף בהצלחה!"
        form.reset()
        setTimeout(()=>{window.location.href="../html/admin.html"},1500)
    
    }
    

}
