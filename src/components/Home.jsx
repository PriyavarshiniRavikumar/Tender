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
    //  getfromApi();
    // console.log('initialtasks',initialtasks)
    async function getfromApi() {
        try{
            const response = await callapi();
            // console.log('responsevalue',responsevalue)
            //  console.log('restype',typeof( responsevalue.data))
             let data = response.data;
            settasks(data)
// return 0;
        }catch (error){
            console.log(error)
        }  
    }
    function handledelete(id){
        console.log(id, "id in Home")
    //    let updatetasks = Object.entries(initialtasks).filter(i=>i.id!==id);
    let updatetasks = Object.entries(initialtasks)
        .filter(([key, task]) => task.id !== id)
        .slice(0,arraySize)
        .map(([key, task]) => task);
           
    settasks(updatetasks);
    }

    function handleDrop(event, status) {
        event.preventDefault();
        // const taskId = event.dataTransfer.getData("taskId");
        const taskId = parseInt(event.dataTransfer.getData("taskId"));
        console.log('taskId',taskId);
        let updatedTasks = initialtasks.map(task =>
            task.id === taskId ? { ...task, completed: status } : task
        );
        // let updatedTasks = Object.entries(initialtasks).reduce((obj, [key, task]) => {
        //     if (task.id === parseInt(taskId)) {
        //         obj[key] = { ...task, completed: status };
        //     } else {
        //         obj[key] = task;
        //     }
        //     return obj;
        // }, {});

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
               
               {/* {
               initialtasks?Object.entries(initialtasks).filter(task => !task.completed).map(([key, task]) => (
                    <Card tasks={task} />)) : <p>....</p>
               } */}
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
                        // .filter(i=>i.id!==id)
                    
                        .filter(([key, task]) =>task.completed===true)
                        .slice(0,arraySize)
                        .map(([key, task]) => (
                            <Card key={task.id} task={task} delfunc={handledelete} />
                        )): <p></p>}
            </div>
        </div>
        {/* <Card /> */}
        </>
    )
}
export default Home;