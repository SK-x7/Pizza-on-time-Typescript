import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { builders } from "prettier/doc";
import {getAddress} from "../../apis/apiGeocoding"


function getPosition():Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress',async function() {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
  
    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  
    // 3) Then we return an object with the data that we are interested in
    return { position, address };
})

interface user{
  readonly createdAt?:Date;
  readonly id?:number;
  readonly user_id?:string;
  readonly username?:string;  
}

export interface initialUserState{
    user?:user;
    username?: string;
    status?: string;
    position?:{
      latitude?:number;
      longitude?:number;
    };
    address:string;
    error:string;
    isAuthenticated:boolean;
}

const initialState:initialUserState ={
  user:{},
  username:'',
  status:'idle',
  position:{},
  address:"",
  error:"",
  isAuthenticated:false
}

const userSlice = createSlice({
   name:'user',
   initialState,
   reducers:{
    handleUserAuthentication(state){
      state.isAuthenticated = true
    },
    updateName(state,action){
      state.username = action.payload;
      state.isAuthenticated = true
    },updateUser(state,action){
      state.user=action.payload;
      state.isAuthenticated = true
    },
    handleLoggedOutUser(state){
      state.user={};
      state.isAuthenticated = false;
    }
  },
  extraReducers:(builder)=>builder.addCase(fetchAddress.pending,(state)=>{state.status='loading'}).addCase(fetchAddress.fulfilled,(state,action)=>{
    state.position=action.payload.position;
    state.address=action.payload.address;
    state.status='idle'
    
  }).addCase(fetchAddress.rejected,(state)=>{
    state.status='error';
    state.error='There was an error getting your address. Make sure to fill this field';
  })
})

export const {updateName,updateUser,handleUserAuthentication,handleLoggedOutUser} = userSlice.actions;

export default userSlice.reducer;

export const getUserName = (state:{user:initialUserState})=>state.user.user?.username;
export const getUser = (state:{user:initialUserState})=>state.user.user;
export const getUserId = (state:{user:initialUserState})=>state.user.user?.user_id;
export const isUserAuthenticated = (state:{user:initialUserState})=>state.user.isAuthenticated;










