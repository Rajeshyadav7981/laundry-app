import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart:[]

}

const Cartslice = createSlice({
  name:'cart',
  initialState,
  reducers: {
    add:(state,action)=>{
        const item=action.payload
        const data=state.cart.find((itemarray,index)=>itemarray.id===item.id)
        if (data){
            data.quantity+=1
        }
        else{
            const temp={...item,quantity:1}
            state.cart.push(temp)
        }
    },
    remove:(state,action)=>{
        const item=action.payload
        const temp=state.cart.filter((itemarray,index)=>itemarray.id!==item.id)
        state.cart=temp
    },
    increase:(state,action)=>{
        const item=action.payload
        const data=state.cart.find((itemarray,index)=>itemarray.id===item.id)
        data.quantity+=1
    },
    decrease:(state,action)=>{
        const item=action.payload
        const data=state.cart.find((itemarray,index)=>itemarray.id===item.id)
        if (data.quantity<=1){
            const temp=state.cart.filter((itemarray,index)=>itemarray.id!==item.id)
            state.cart=temp
        }
        else{
            data.quantity-=1
        }
    },
    clearcart:(state,action)=>{
        state.cart=[]

    },
  }
});

export const {add,increase,decrease,remove,clearcart} = Cartslice.actions

export default Cartslice.reducer