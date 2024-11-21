import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set, onValue, remove, update } from "firebase/database";

const Todo = () => {

  let [task, setTask]= useState('')
  let [Updatetask, setUpdateTask]= useState('')
  let [tasklist, setTasklist]= useState([])
  let [editid, seteditid] = useState()
  let [editModal, seteditModal]= useState(false)
  const db = getDatabase();

  let handleTask =(e)=>{
    setTask (e.target.value)
  }
  let handleTaskSubmit=() =>{
    set(push (ref(db, 'bazarlist/')), {
      name: task
    }). then(()=>{
      setTask('')
    }).catch((error)=>{
    })
    setTask('')
  }
  useEffect(()=>{
    const bazarlistref = ref(db, 'bazarlist/');
    onValue(bazarlistref, (snapshot) => {
      let array = []
      snapshot.forEach((item)=>{
      array.push({...item.val(), id:item.key })
    }) 
      setTasklist(array)
    });
  },[])

  let handleDelete=(id)=>{
    remove (ref(db, 'bazarlist/' + id ))
  }

  let handleEditModal=(id)=>{
    seteditid(id)
    seteditModal(true)
  }

  let handleUpdateTask=(id)=>{
    update (ref(db, 'bazarlist/' + editid ),{
      name : Updatetask 
    }).then(()=>{
      seteditModal(false)
    })
  }

  return (
    <div>
      <div className="container mx-auto my-10">
  <h1 className="text-center text-3xl font-semibold mb-4">To Do List</h1>
  <div className="md:w-1/2 mx-auto">
    <div className="bg-white shadow-md rounded-lg p-6">
      <div id="todo-form">
        <div className="flex mb-4">
          <input onChange={handleTask}
            type="text"
            className="w-full px-4 py-2 mr-2 rounded-lg
                       border-gray-300 focus:outline-none
                        focus:border-blue-500"
            id="todo-input"
            placeholder="Add New Task"
            required=""
            value={task}
          />
          <button onClick={handleTaskSubmit}
            className="bg-blue-500 hover:bg-blue-700 
                      text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>
      <ul id="todo-list">
        {tasklist.map((item)=>(
          <>
            <li className='font-semibold text-lg flex justify-between mt-2'>{item.name}
              <div>
                <button onClick={()=>handleEditModal(item.id)}className='bg-teal-500 text-white rounded-md py-1 px-1'>Edit</button>
                <button onClick={()=>handleDelete(item.id)} className='bg-red-500 text-white rounded-md py-1 px-1 ml-1'>Delete</button>
              </div> 
            </li> 
          </>
        ))}
      </ul>
    </div>
  </div>
  {/* Edit Modal */}
  {editModal &&
    <div className="container mx-auto my-10">
    <h1 className="text-center text-3xl font-semibold mb-4">Update Task</h1>
    <div className="md:w-1/2 mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div id="todo-form">
          <div className="flex mb-4">
            <input onChange={(e)=>{
                setUpdateTask(e.target.value)
            }}
              type="text"
              className="w-full px-4 py-2 mr-2 rounded-lg
                         border-gray-300 focus:outline-none
                          focus:border-blue-500"
              id="todo-input"
              placeholder="Update Task"
              required=""
            />
            <button onClick={handleUpdateTask}
              className="bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  }

  {/* Edit Modal */}
</div>
    </div>
  )
}

export default Todo