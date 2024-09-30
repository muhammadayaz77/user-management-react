import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
let API_URL = 'https://user-management-ex-react.vercel.app/api/data';
function App() {
  let [users,setUsers] = useState([]);
 const [updateUser, setUpdateUser] = useState({ id: '', name: '',email : '' });
  let name = useRef();
  let email = useRef();
  let fetchedData = () => {
    axios.get(API_URL)
  .then(function (response) {
    // handle success
    setUsers(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  useEffect(() => {
    fetchedData();
  },[])
  console.log(users)
  let handleAddBtn = () => {
    axios.post(API_URL, { name : name.current.value, email : email.current.value })
  .then(function (response) {
    // handle success
    setUsers(prevUsers => [...prevUsers, response.data]);
    name.current.value = '';
    email.current.value = '' // Reset input
    fetchedData()
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  let handleDeleteBtn = (id) => {
    axios.delete(`${API_URL}/${id}`)
  .then(function (response) {
    // handle success=
    setUsers(users.filter(user => user.id !== id));
 
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  const updateUserById = (id) => {
    axios.put(`${API_URL}/${id}`, { name: updateUser.name,email : updateUser.email })
      .then(response => {
        setUsers(users.map(user => (user.id === id ? response.data : user)));
        setUpdateUser({ id: '', name: '',email : '' }); // Reset input
        fetchedData();
      })
      .catch(err => console.error(err));
  };
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='w-[35%]'>
        <h1 className='text-center text-3xl font-semibold'>User Management</h1>
        <div className='flex justify-end'>
        <label htmlFor="my_modal_6" className='bg-blue-800 rounded-sm mt-3 text-white px-3 py-2 text-base'>ADD USER</label>
        </div>
<div className="relative overflow-x-auto mt-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              users.map(item => (
                <tr className="bg-white dark:bg-gray-800 items-center">
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                    {item.name}
                </th>
                <td className="px-6 py-4">
                    {item.email}
                </td>
                <td className="px-6 py-4">
                <label
                htmlFor="my_modal_7"
            onClick={() => setUpdateUser({ id: item.id, name: item.name,email : item.email })}
                className='bg-purple-800 rounded-sm text-white px-2 py-1 text-base'>EDIT</label>
                <button className='bg-red-700 ml-3 rounded-sm text-white px-2 py-1 text-base'
                onClick={() => handleDeleteBtn(item.id)}>DELETE</button>
                </td>
            </tr>
              ))
            }
        </tbody>
    </table>
</div>

      </div>
      {/* Model */}
      {/* The button to open modal */}
{/* <label  className="btn">open modal</label> */}

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h2 className='text-center text-xl font-bold'>ADD Details</h2>
    <input
    ref={name}
    type="text" placeholder='Enter Your Name...' 
    className='border-2 px-4 py-3 w-full mt-3'/>
    <input
    ref={email}
    type="text" placeholder='Enter Your Email...' 
    className='border-2 px-4 py-3 w-full mt-3'
    />
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn bg-blue-600 text-white"
      onClick={handleAddBtn}
      >ADD</label>
    </div>
  </div>
</div>

<input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h2 className='text-center text-xl font-bold'>Update Details</h2>
    <input
    value={updateUser.name}
    onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
    // ref={name}
    type="text" placeholder='Enter Your Name...' 
    className='border-2 px-4 py-3 w-full mt-3'/>
    <input
    onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
    value={updateUser.email}
    // ref={email}
    type="text" placeholder='Enter Your Email...' 
    className='border-2 px-4 py-3 w-full mt-3'
    />
    <div className="modal-action">
      <label htmlFor="my_modal_7" className="btn bg-blue-600 text-white"
      // onClick={handleAddBtn}
      onClick={() => updateUserById(updateUser.id)}
      >UPDATE</label>
    </div>
  </div>
</div>


    </div>
  )
}

export default App