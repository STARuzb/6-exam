import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [nameInputText, setNameInputText] = useState('');
  const [ageInputText, setAgeInputText] = useState('');
  const [emailInputText, setEmailInputText] = useState('');
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = localStorage.getItem('todoList');
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  }); 
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (inputText.trim() !== '' && nameInputText.trim() !== '' && emailInputText.trim() !== '' && ageInputText.trim() !== '') {
      setTodoList([...todoList, `Email:${emailInputText}, name:${nameInputText}, lastname:${inputText}, Age:${ageInputText}`]);
      setInputText(''); 
      setNameInputText('');
      setEmailInputText('');
      setAgeInputText('');
    }
  };

  // const handleEdit = (index) => {
  //   setEditIndex(index); 
  //   const todo = todoList[index];
  //   const email = todo.split(',')[0].split(':')[1].trim();
  //   const name = todo.split(',')[1].split(':')[1].trim();
  //   const lastname = todo.split(',')[2].split(':')[1].trim();
  //   const age = todo.split(',')[3].split(':')[1].trim();
  //   setInputText(lastname); 
  //   setNameInputText(name); 
  //   setEmailInputText(email); 
  //   setAgeInputText(age); 
  // };

  const handleDelete = (index) => {
    const newList = [...todoList]; 
    newList.splice(index, 1); 
    setTodoList(newList);
    if (editIndex === index) { 
      setEditIndex(null); 
      setInputText(''); 
    }
  };

  const handleUpdate = (index) => {
    const newTodo = `Ismi:${nameInputText},
     Email:${emailInputText},
     lastname:${inputText},
     Age:${ageInputText}`;
    const newList = [...todoList]; 
    newList[index] = newTodo;
    setTodoList(newList); 
    setInputText(''); 
    setNameInputText('');
    setEmailInputText('');
    setAgeInputText('');
    setEditIndex(null);
  };

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className='todos flex flex-col items-center'>
      <div className="todo__input flex">
        <span>
        <div>
          <label htmlFor="">Enter last name</label>
          <input
            className='border-2 border-black rounded-md p-1 mb-2'
            type="text"
            value={inputText}
            placeholder='Enter last name'
            onChange={(e) => setInputText(e.target.value)}
            />
        </div>
            </span>
            <span>
        <div className=''>
          <label htmlFor="">Enter a name</label>
          <input
            className='border-2 border-black rounded-md p-1 mb-2'
            type="text"
            value={nameInputText}
            placeholder='enter a name'
            onChange={(e) => setNameInputText(e.target.value)}
            />
        </div>
        <div className=''>
          <label htmlFor="">Enter email</label>
          <input
            className='border-2 border-black rounded-md p-1 mb-2'
            type="email"
            value={emailInputText}
            placeholder='Enter Email'
            onChange={(e) => setEmailInputText(e.target.value)}
            />
        </div>
            </span>
        <div className='mr-1'> 
          <label htmlFor="">Enter age</label>
          <input
            className='border-2 border-black rounded-md p-1 mb-2'
            type="number"
            value={ageInputText}
            placeholder='Enter age'
            onChange={(e) => setAgeInputText(e.target.value)}
            />
        </div>
        <button className='bg-yellow-300 text-white px-7 py-3 rounded-md mb-2' onClick={handleAdd}>ADD</button>
      </div>
      <div className='todo__list'>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index} className="mb-2">
              {editIndex === index ? (
                <>
                    <input
                      type="text"
                      value={nameInputText}
                      onChange={(e) => setNameInputText(e.target.value)}
                      className='border-2 border-black rounded-md p-1 mb-2'
                      />
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className='border-2 border-black rounded-md p-1 mb-2'
                    />
                  <input
                    type="email"
                    value={emailInputText}
                    onChange={(e) => setEmailInputText(e.target.value)}
                    className='border-2 border-black rounded-md p-1 mb-2'
                    />
                  <input
                    type="number"
                    value={ageInputText}
                    onChange={(e) => setAgeInputText(e.target.value)}
                    className='border-2 border-black rounded-md p-1 mb-2'
                    />
                  <button className='bg-green-500 text-white px-2 py-1 rounded-md mb-2' onClick={() => handleUpdate(index)}>Update</button>
                </>
              ) : (
                <>
                  {todo}
                  <button className='bg-red-700 text-white px-2 py-1 rounded-md ml-2' onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;