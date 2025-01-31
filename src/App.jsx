import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskText = newData.trim();

    if (!taskText) {
      alert("Please enter a Task");
      return;
    }

    if (data.some((task) => task.text === taskText)) {
      alert("Task Already Exists");
      return;
    }

    const newTask = { text: taskText, checked: false };
    const updatedData = [newTask, ...data];
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setNewData("");
  };

  const handleInputChange = (e) => {
    const list = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setNewData(list);
  };

  const handleDeleteData = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
  };

  const handleCheckboxChange = (index) => {
    const updatedData = data.map((data, i) =>
      i === index ? { ...data, checked: !data.checked } : data
    );
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <section className='wrapper'>
      <div className='list'>
        <div className='input-box'>
          <form onSubmit={handleSubmit}>
            <div className='input-form'>
              <input
                type="text"
                placeholder='Add your task'
                value={newData}
                onChange={handleInputChange}
              />
              <button className='btn' type="submit"> ADD </button>
            </div>
          </form>
          {
            data.length > 0 && (
              <ul className='items'>
                {data.map((item, index) => (
                  <li key={index} className='item-list'>
                    <span>
                      <input
                        type="checkbox"
                        id={`item${index}`}
                        className='checkbox'
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <label
                        htmlFor={`item${index}`}
                        style={{
                          textDecoration: item.checked ? 'line-through' : 'none',
                          color: item.checked ? '#6666664D' : 'inherit',
                        }}
                      >
                        {item.text}
                      </label>
                    </span>
                    <button className='btn-delete' onClick={() => handleDeleteData(index)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 7L17 17M7 17L17 7" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )
          }
        </div>
      </div>
      <div className='head'>
        <h1><span>To-Do </span> List </h1>
        <p>with JavaScript</p>
      </div>
    </section>
  );
}

export default App;