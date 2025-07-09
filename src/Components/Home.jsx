import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {

    const[title, setTitle] = useState('');
    const[searchParams, setSearchParams] = useSearchParams();
    const[value,setValue] = useState('');
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPaste = useSelector((state)=>state.paste.pastes);


    useEffect(() => {
      if(pasteId){
        const paste = allPaste.find((p)=>p._id===pasteId)
        setTitle(paste.title)
        setValue(paste.content)
      }
    }, [pasteId])
    

    function pasteClick(){
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(20),
            createdAt: new Date().toISOString(),

    }
    if(pasteId){
        //update
        dispatch(updateToPaste(paste));
    }
    else{
        //create
        dispatch(addToPaste(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});

    }
  return (
    <div className='mt-8'>
    <div className='flex flex-row gap-7' >
      <input type='text' placeholder='Enter text here' value={title} onChange={(e)=> setTitle(e.target.value)} className='p-4 rounded-2xl min-w-[320px]'/>

    <button onClick={pasteClick}>
        {
            pasteId ? "Update My Paste" : "Create My Paste"
        }
    </button>
    
    </div>
    <div className='mt-8'>
        <textarea value={value} placeholder='Enter text here...' onChange={(e)=>setValue(e.target.value)} rows={20}
        className='rounded-2xl mt-4 min-w-[500px] p-4'
        >

        </textarea>
    </div>
    </div>
  );
}

export default Home;
