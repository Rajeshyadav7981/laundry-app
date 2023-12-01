import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products:[]
}

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addproduct:(state,action)=>{
        const item=action.payload
        const data=state.products.find((itemarray,index)=>itemarray.id===item.id)
        if (data){
            data.quantity+=1
        }
        else{
            const temp={...item,quantity:0}
            state.products.push(temp)
        }
    },
    increaseproduct:(state,action)=>{
        const item=action.payload
        const data=state.products.find((itemarray,index)=>itemarray.id===item.id)
        data.quantity+=1
    },
    decreaseproducts:(state,action)=>{
        const item=action.payload
        const data=state.products.find((itemarray,index)=>itemarray.id===item.id)
        if (data.quantity<=1){
            data.quantity=0
        }
        else{
            data.quantity-=1
        }
    },
    clearproduct:(state,action)=>{
       for(i of state.products){
        i.quantity=0
       }
    }
  }
});

export const {addproduct,increaseproduct,decreaseproducts,addproductqu,clearproduct} = ProductSlice.actions

export default ProductSlice.reducer