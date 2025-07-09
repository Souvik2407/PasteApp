import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'
import toast from 'react-hot-toast';
const initialState = {
   pastes : localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[] 
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      const Index = state.pastes.findIndex((item)=>item.title === paste.title)
      if (Index !== -1) {
    toast.error("This title is already registered");
  }
      else{

        state.pastes.push(paste);
        localStorage.setItem("pastes" , JSON.stringify(state.pastes))
        toast.success("Item added successfully")
      }
    },
    updateToPaste: (state, action) => {
     const paste = action.payload;
     const Index = state.pastes.findIndex((item)=> item._id === paste._id)

     if(Index>=0){
        state.pastes[Index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes))

        toast.success("Paste updated successfully")
     }
    
    },
    resetAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const Index = state.pastes.findIndex((item)=>item._id===pasteId)

      if(Index>=0){
        state.pastes.splice(Index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste deleted successfully")

      }
    },

  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer