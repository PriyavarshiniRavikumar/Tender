import React from "react";
const Card = ({tasks,delfunc}) =>{
        function handleDel(id){
            delfunc(id);
    }
    function handleDragStart(event) {
        event.dataTransfer.setData("taskId",tasks.id);
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
       </div>
      
        </>
    )
}
export default Card;