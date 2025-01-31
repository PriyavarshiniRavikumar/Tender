import React from "react";
const Card = ({tasks,delfunc}) =>{
    
        console.log("tasks in card",tasks)
    function handleDel(id){
        console.log("hi")
        console.log(id,"id");
        delfunc(id);
    }
    function handleDragStart(event) {
        event.dataTransfer.setData("taskId", tasks.id);
    }
    return(
        <>
       <div className="draggCard"   
        draggable 
        onDragStart={handleDragStart}
       >
        {tasks?
       ( <div className="card">
        <p>{tasks.title}</p>
        <div className="delbtndiv">
        <button className="delbtn" onClick={()=>handleDel(tasks.id)}>X</button>
        </div>
    </div>):
    (<p></p>)}
            {/* // <div className="card">
            //     <p>{tasks.title}</p>
            //     <div className="delbtndiv">
            //     <button className="delbtn" onClick={()=>handleDel(tasks.id)}>X</button>
            //     </div>
            // </div> */}
       </div>
      
        </>
    )
}
export default Card;