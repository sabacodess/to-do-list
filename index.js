document.addEventListener('DOMContentLoaded',()=>{
    const inputtext =document.getElementById('input-text');
    const addtaskbtn=document.getElementById('add-btn');
    const tasklist=document.getElementById('task-li');
    let listtask=[];

     const gettodolistinls=()=>{
        const todolist=localStorage.getItem('todolist');
        if(todolist===null){
            return[];
        } 
        try{
            return JSON.parse(todolist);
        }catch(e){
            console.error("error parsing json from local storage:",e);
            return[]
        }
        // return todolist ? JSON.parse(todolist):[];
    }

    const settodolistinlocalstorage=(todo)=>{
         return localStorage.setItem('todolist',JSON.stringify(todo))
     }

      const loadTasks = () => {
        listtask = gettodolistinls();
        listtask.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" class="checkbox">
                <span>${task}</span>
                <div class="buttons">
                    <button class="del-btn"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            li.querySelector('.del-btn').addEventListener('click', () => {
                listtask = gettodolistinls();
                listtask = listtask.filter(t => t !== task);
                settodolistinlocalstorage(listtask);
                li.remove();
            });
            tasklist.appendChild(li);
        });

    };



    const addtask= (event)=>{
       event.preventDefault()
       const tasktext = inputtext.value.trim()

      if(!tasktext){
        inputtext.classList.add('shake')
        // inputtext.classList.add('redborder')
        setTimeout(()=>{
            inputtext.classList.remove('shake')   
        },600)
        inputtext.focus()


        return;
      }

        listtask = gettodolistinls();
        listtask.push(tasktext); 
        settodolistinlocalstorage(listtask); 


  
   const li = document.createElement('li')
   li.innerHTML=`<input type="checkbox" class="checkbox" >
   <span>${inputtext.value.trim()}</span>
   <div class="buttons">
      <button class="del-btn"><i class="fa-solid fa-trash"></i></button>
   </div>
   `  
     li.querySelector('.del-btn').addEventListener('click',()=>{
        listtask = gettodolistinls();
        listtask = listtask.filter(t => t !== task);
        settodolistinlocalstorage(listtask);
        li.remove()
     })
     tasklist.appendChild(li);
     inputtext.value="";
}

   addtaskbtn.addEventListener('click',addtask)
   inputtext.addEventListener('keypress',(e)=>{
    if(e.key==="Enter"){
        addtask(e)
    }
 })
 loadTasks()
});