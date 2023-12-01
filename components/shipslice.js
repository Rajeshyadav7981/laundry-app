import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    date:null,
    address:null,
    time:null,
    deliverydays:null


}

const shipslice = createSlice({
  name:'ship',
  initialState,
  reducers: {
    settdate:(state,action)=>{
        state.date=action.payload

    },
    setaddress:(state,action)=>{
        state.address=action.payload

    }, settime:(state,action)=>{
        state.time=action.payload

    },
    setdeliverydays:(state,action)=>{
        state.deliverydays=action.payload

    },


  }
});

export const {setaddress,setdeliverydays,settdate,settime} = shipslice.actions
export const date=((state)=>state.ship.date)
export const time=((state)=>state.ship.time)
export const days=((state)=>state.ship.deliverydays)
export const address=((state)=>state.ship.address)

export default shipslice.reducer