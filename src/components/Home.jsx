import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
const Home = () =>{
    const [initialtasks,settasks] =  useState();
    const arraySize = 10;
    async function callapi (){
        return axios.get("https://jsonplaceholder.typicode.com/todos")
    }
    useEffect(()=>{
         getfromApi();
    },[])
    
    async function getfromApi() {
        try{
            const response = await callapi();
             let data = response.data;
            settasks(data)
        }catch (error){
            console.log(error)
        }  
    }
    function handledelete(id){
        let updatetasks = Object.entries(initialtasks)
        .filter(([key, task]) => task.id !== id)
        .slice(0,arraySize)
        .map(([key, task]) => task);
        settasks(updatetasks);
    }

    function handleDrop(event, status) {
        event.preventDefault();
        const taskId = parseInt(event.dataTransfer.getData("taskId"));
        let updatedTasks =initialtasks.map(task =>
            task.id === taskId ? { ...task, completed: status } : task
        );
        settasks(updatedTasks);
    }


    return(
        <>
        <h1>Home ...</h1>
        <div className="container home">
            <div className="col1"
             onDragOver={(e) => e.preventDefault()}
             onDrop={(e) => handleDrop(e, false)}
            >
                <h1>Todo</h1>
                {
               initialtasks?Object.entries(initialtasks).slice(0,arraySize).map(([key, task]) => (
                <div key={task.id}>
                    <Card tasks={task} delfunc={handledelete}/>
                </div>    )) : <p>....</p>
               }
            </div>
            <div className="col2"
             onDragOver={(e) => e.preventDefault()}
             onDrop={(e) => handleDrop(e, true)}
            >
                <h1>Completed</h1>
                {
                initialtasks? Object.entries(initialtasks)
                        .filter(([key, task]) =>task.completed===true)
                        .slice(0,arraySize)
                        .map(([key, task]) => (
                            <Card key={task.id} task={task} delfunc={handledelete} />
                        )): <p></p>}
            </div>
        </div>
        </>
    )
}
export default Home;