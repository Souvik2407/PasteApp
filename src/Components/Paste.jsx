import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import {  
WhatsappShareButton
} from "react-share";
import { NavLink } from 'react-router-dom';
const Paste = () => {

    const pastes = useSelector((state)=> state.paste.pastes);
    const[searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filterData = pastes.filter(
        (paste)=> paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    function handleDelete(pasteId){
        dispatch(removeFromPaste(pasteId));
    }

  return (
    <div >
      <input type='search' value={searchTerm} placeholder='Search here...' onChange={(e)=>setSearchTerm(e.target.value)} className='p-2 rounded-2xl min-w-[600px] mt-5'>
      </input>

      <div className='flex flex-col gap-5 mt-5'>
      
        {filterData.length>0 && 
        filterData.map(
            (paste)=>{
                console.log("paste keys", filterData.map(p => p._id));

                return (
                <div className='border'key={paste?._id}>
                <div>
                {paste.title}
                </div>
                <div>
                {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                <button >
                <NavLink to={`/?pasteId=${paste?._id}`}>
                     Edit
                </NavLink>
                   
                </button>
                <button>
                    <NavLink to={`/pastes/${paste?._id}`}>
                        View
                    </NavLink>
                </button>
                <button onClick={()=>handleDelete(paste?._id)}>
                    Delete 
                </button>
                <button onClick={()=>{
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard successfully")
                }}>
                    Copy
                </button>
                <WhatsappShareButton url="https://yourwebsite.com/product/123"
                title={paste.title}
                >
  Share
</WhatsappShareButton>
                </div>
                <div>
                    {paste.createdAt}
                </div>

                </div>
                
                
                )
            }
        )}
      </div>
    </div>
  );
}

export default Paste;
