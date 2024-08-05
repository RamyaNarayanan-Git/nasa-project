import Main from './components/Main'
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'

function App() {

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function toggleModal(){
    setShowModal(!showModal);
  }

  useEffect(() => {

    async function fetchData(){
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`;
      const today = (new Date()).toDateString();
      const localKey = `NASA-${today}`;
      if(localStorage.getItem(localKey)){
        const data1 = JSON.parse(localStorage.getItem(localKey));
        console.log("data from local storage",data1)
        setData(data1);
        return;
      }
      localStorage.clear();
      try {
        let response = await fetch(url);
        let data1 = await response.json();
        console.log(data);
        setData(data1);
        localStorage.setItem(localKey, JSON.stringify(data1));
        console.log("data from api",data1);
      } catch(err){
        console.log(err.message);
      }

    }
    fetchData();
  },[]);

  return (
    <>
    { data ? 
    (<Main data={data}/>) : 
    (<div className='loadingState'>
      <i className='fa-solid fa-gear'></i>
    </div>)}
    { showModal && (
       <SideBar data={data} toggleModal={toggleModal}/>
    )}
    {data && (<Footer data={data} toggleModal={toggleModal}/>)}
    </>
  )
}

export default App
