const inputtext=document.querySelector("#input-text")
const addtaskbtn=document.querySelector('#add-btn')
 const tasklist=document.querySelector('#task-li')
 let newtodo=[]

 const getitemfromLs=()=>{
    return JSON.parse( localStorage.getItem('todoli'))||[];
 }

 const setiteminLs=(todo)=>{
    return localStorage.setItem('todoli',JSON.stringify(todo))
 }

 const attachCheckboxListener = (checkbox, taskObject) => {
        checkbox.addEventListener('change', (e) => {
        taskObject.completed = e.target.checked;
        setiteminLs(todolistvalue);
    });
};

 const loadtask = ()=>{
   todolistvalue=getitemfromLs()
   todolistvalue.forEach((curvalue) => {
      const liElement =document.createElement('li')
      liElement.innerHTML=`<input type="checkbox" class="checkbox" ${curvalue.completed ? 'checked' : ''}>
   <span>${curvalue.text}</span>
   <div class="buttons">
      <button class="del-btn"><i class="fa-solid fa-trash"></i></button>
   </div>
   `

      attachCheckboxListener(liElement.querySelector('.checkbox'), curvalue);


      liElement.querySelector('.del-btn').addEventListener('click',()=>{
        todolistvalue=getitemfromLs()
        todolistvalue=todolistvalue.filter(t =>t.text!==curvalue.text)
        setiteminLs(todolistvalue)
        liElement.remove()
      })
        tasklist.appendChild(liElement);
        inputtext.value=''
      })
   };

 
 const addtasklist=(e)=>{
    e.preventDefault()
    todolistvalue=getitemfromLs()
    let newtodo=inputtext.value.trim()
    if(!newtodo){
        inputtext.classList.add('shake')
        setTimeout(()=>{
            inputtext.classList.remove('shake')   
        },600)
        inputtext.focus()
        return;
      }

      const newTask = { text: newtodo, completed: false };
      todolistvalue.push(newTask)
      setiteminLs(todolistvalue)


    const liElement =document.createElement('li')
    liElement.innerHTML=`<input type="checkbox" class="checkbox" >
   <span>${newTask.text}</span>
   <div class="buttons">
      <button class="del-btn"><i class="fa-solid fa-trash"></i></button>
   </div>
   `
    attachCheckboxListener(liElement.querySelector('.checkbox'), newTask);


    liElement.querySelector('.del-btn').addEventListener('click',()=>{
        todolistvalue=getitemfromLs()
        todolistvalue=todolistvalue.filter(t=>t.text!==newTask.text)
        setiteminLs(todolistvalue)
        liElement.remove()
      })
        tasklist.appendChild(liElement);
        inputtext.value=''
 }

 loadtask();


    addtaskbtn.addEventListener('click',(e)=>{
    addtasklist(e)
 })