


const users = [
    { id: "216290171", name: "אסתי סוויד", userName: "ESTY$123", password: "EstySwidPass123!", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false}, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "216290170", name: "ציבי כהן", userName: "YaFA$123", password: "Y$$123456789", role: "student", principalId:[ "216960171"], taskArray: [{ tId: "t2", isDone: false}, { tId: "t5", isDone: false}, { tId: "t6", isDone: false}, { tId: "t11", isDone: false }, { tId: "t12", isDone: false}, { tId: "t13", isDone: false}] },
    { id: "216390171", name: "שרי ונדרולדה", userName: "Rachel$123", password: "RachelLevi99#", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false}, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "216290172", name: "אסתי הוכמן", userName: "RivkiM$123", password: "RivkiSecure2026!", role: "student", principalId: ["216960171"], taskArray: [{ tId: "t2", isDone: false}, { tId: "t5", isDone: false}, { tId: "t6", isDone: false}, { tId: "t11", isDone:false  }, { tId: "t12", isDone: false}, { tId: "t13", isDone: false }] },
    { id: "256290171", name: "אלישבע שנדורפי", userName: "YaelZ$123", password: "YaelZer1234%", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false}, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "216280171", name: "שושי קליינמן", userName: "RuthS$123", password: "RuthSwidAdmin88!", role: "admin" },
    { id: "217290171", name: "שושי ברמן", userName: "AhuvyS$123", password: "AhuvyPassSecure!", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false}, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "316290171", name: "פניני רוזנטל", userName: "SaraS$123", password: "SaraS12345678$", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false}, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "416290171", name: "אילה קופמן", userName: "DavidS$123", password: "DavidSwidMaster!", role: "admin" },
    { id: "216390173", name: "דבורי כהן", userName: "ShevyS$123", password: "ShevySPass77#", role: "student", principalId: ["416290171"], taskArray: [{ tId: "t1", isDone: false }, { tId: "t7", isDone: false}, { tId: "t10", isDone: false}, { tId: "t14", isDone: false}, { tId: "t15", isDone: false}] },
    { id: "216990171", name: "חיהלה ברמן", userName: "MalyS$123", password: "MalyAdmin12345$", role: "admin" },
    { id: "222290171", name: "נחמי ברנשטיין", userName: "EstyM$123", password: "EstyManSecret!1", role: "student", principalId:[ "216960171"], taskArray: [{ tId: "t2", isDone: false }, { tId: "t5", isDone: false}, { tId: "t6", isDone: false}, { tId: "t11", isDone: false}, { tId: "t12", isDone: false}, { tId: "t13", isDone: false}] },
    { id: "289290171", name: "יהודית שטיינהויז", userName: "ChanieL$123", password: "ChanieLeviAdmin!1", role: "admin" },
    { id: "556290171", name: "שושי אנסבכר", userName: "RikiL$123", password: "RikiLeviPassword%1", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "216290174", name: "מירי מרגלית", userName: "RuthT$123", password: "RuthToledano2026!", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "256290175", name: "ריקי ילין", userName: "AviS$123", password: "AviSwidPass55$", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "216212171", name: "שולמית אלפא", userName: "NinaF$123", password: "NinaFellerSecret!1", role: "student", principalId: ["216960171"], taskArray: [{ tId: "t2", isDone: false }, { tId: "t5", isDone: false}, { tId: "t6", isDone: false}, { tId: "t11", isDone: false }, { tId: "t12", isDone: false}, { tId: "t13", isDone: false}] },
    { id: "216960171", name: "אלישבע דוידוביץ", userName: "IdanF$123", password: "IdanFellerAdmin99!", role: "admin" },
    { id: "256290171", name: "ללי פרוכטר", userName: "AviS$1234", password: "AviSwidPass55$1", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "256290172", name: "תמר לנגלב", userName: "AviS$1235", password: "AviSwidPass55$2", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "256290173", name: "מוריה יעקובוב", userName: "AviS$1236", password: "AviSwidPass55$3", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "256290174", name: "אסתי ברנר", userName: "AviS$1237", password: "AviSwidPass55$4", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "256290176", name: "רחלי קלרמן", userName: "AviS$1238", password: "AviSwidPass55$5", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },
    { id: "256290177", name: "אתי אדלשטיין", userName: "AviS$1239", password: "AviSwidPass55$6", role: "student", principalId: ["216990171"], taskArray: [{ tId: "t3", isDone: false }, { tId: "t4", isDone: false}, { tId: "t8", isDone: false}, { tId: "t9", isDone: false}] },

];

const tasks = [
    // --- נושא: שפת C ---
    { id: "t1", title: "מימוש רשימה מקושרת חד-כיוונית וניהול זיכרון דינמי עם malloc",  category: "C", deadline: "2026-06-12", principalId: "416290171", priority: "low" },
    { id: "t2", title: "מציאת באגים והדלפות זיכרון בעבודה עם מצביעים כפולים (Pointers)",  category: "C", deadline: "2026-06-15", principalId: "216960171", priority: "medium" },
    { id: "t3", title: "כתיבת פונקציה רקורסיבית למציאת המסלול הקצר ביותר במטריצה",  category: "C", deadline: "2026-06-19", principalId: "216990171", priority: "high" },

    // --- נושא: C# ---
    { id: "t4", title: "בניית מערכת ניהול חנויות מבוססת קבצים (FileStream)",  category: "C#", deadline: "2026-06-11", principalId: "216990171", priority: "low" },
    { id: "t5", title: "מימוש ממשק משתמש בסיסי באמצעות Windows Forms או WPF",  category: "C#", deadline: "2026-06-16", principalId: "216960171", priority: "medium" },
    { id: "t6", title: "עבודה עם גנריקס (Generics) ויצירת אוספים מותאמים אישית",  category: "C#", deadline: "2026-06-22", principalId: "216960171", priority: "high" },
    
    // --- נושא: OOP (תכנות מונחה עצמים) ---
    { id: "t7", title: "תכנון היררכיית מחלקות למערכת בנקאית תוך שימוש בירושה ופולימורפיזם",  category: "OOP", deadline: "2026-06-10", principalId: "416290171", priority: "low" },
    { id: "t8", title: "מימוש מחלקות מופשטות (Abstract Classes) וממשקים (Interfaces)",  category: "OOP", deadline: "2026-06-14", principalId: "216990171", priority: "medium" },
    { id: "t9", title: "מניעת דריסת פונקציות לא מורשית ושימוש נכון ב-Encapsulation", category: "OOP", deadline: "2026-06-20", principalId: "216990171", priority: "high" },

    // --- נושא: אסמבלר (Assembly) ---
    { id: "t10", title: "כתיבת קוד המבצע פעולות מתמטיות מורכבות באמצעות אוגרים (Registers)",  category: "אסמבלר", deadline: "2026-06-13", principalId: "416290171", priority: "low" },
    { id: "t11", title: "מימוש לולאות ותנאים באסמבלר באמצעות פקודות JMP ו-CMP",  category: "אסמבלר", deadline: "2026-06-17", principalId: "216960171", priority: "medium" },
    { id: "t12", title: "עבודה עם המחסנית (Stack) וקריאה לפונקציות פנימיות באסמבלר x86",  category: "אסמבלר", deadline: "2026-06-24", principalId: "216960171", priority: "high" },
    
    // --- נושא: מערכות הפעלה (מע"ח) ---
    { id: "t13", title: "סימולציה של ניהול תהליכים ומעברי מצבים (Ready, Running, Blocked)",  category: "מע' הפעלה", deadline: "2026-06-09", principalId: "216960171", priority: "low" },
    { id: "t14", title: "פתרון בעיית 'הפילוסופים הסועדים' למניעת קיפאון (Deadlock) במערכת",  category: "מע' הפעלה", deadline: "2026-06-18", principalId: "416290171", priority: "low" },
    { id: "t15", title: "מימוש אלגוריתמי החלפת דפים בזיכרון הווירטואלי (LRU ו-FIFO)",  category: "מע' הפעלה", deadline: "2026-06-26", principalId: "416290171", priority: "low" }
];