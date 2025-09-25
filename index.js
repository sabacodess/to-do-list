document.addEventListener('DOMContentLoaded',()=>{
    const inputtext =document.getElementById('input-text');
    const addtaskbtn=document.getElementById('add-btn');
    const tasklist=document.getElementById('task-li');
    // const emptyimage=document.querySelector('.empty-image');
    

    //  const toggleimage=()=>{
    //     emptyimage.style.display=tasklist.children.length===0 ? 'block' :'none';
    //  }

 

const addtask= (event)=>{
    event.preventDefault()
    const tasktext = inputtext.value.trim()
    if(!tasktext){
        return;
    }

   const li = document.createElement('li')
   li.textContent=tasktext;
   tasklist.appendChild(li);
   inputtext.value="";
//    toggleimage();
}
   addtaskbtn.addEventListener('click',addtask)
   inputtext.addEventListener('keypress',(e)=>{
    if(e.key==="Enter"){
        addtask(e)
    }
 })
//  toggleimage()
});