//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");




inputBox.onkeyup = ()=>{
    let userData = inputBox.value;//getting user entered value
    if(userData.trim() !=0 ){ //if user values aren't only spaces
        addBtn.classList.add("active");//active the add button

    }
    else{
        addBtn.classList.remove("active ")
    }
}
showTasks();//calling show task function

addBtn.onclick = () =>{
    let userData = inputBox.value;//taking task from the user
    let getLocalStorage = localStorage.getItem("New Task"); //getting acsess of localStorage
    if(getLocalStorage==null){
        listArr=[];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Task",JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove("active");
}

// adding tasks in the list
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Task");
    if(getLocalStorage==null){ //if localstorage is null
        listArr = []; //creating blank array
    }
    else{
        listArr=JSON.parse(getLocalStorage);//converting json string into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;//giving the length value in pending tasks;
    // if(listArr.length>0){//active clear all button 
    //     deleteAllBtn.classList.add("active");
    // }
    // else{
    //     deleteAllBtn.classList.remove("active");//unactive clear all button
    // }
    let newLiTag='';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element}<span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;//adding new list tag inside ul tag
    inputBox.value = "";//leave input field blank after adding task
}

//deleting the task
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Task");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("New Task",JSON.stringify(listArr));
    showTasks();
}
