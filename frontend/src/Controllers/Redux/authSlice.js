import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

const BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER;

const BUG_TRACKER_SERVER = process.env.BUG_TRACKER_SERVER; 
const slice = createSlice({
    name:"auth",
    initialState:{
        admin:false,
        LoggedIn:false,
    },
    reducers:{
        signIn:(state,action)=>{
        let isLoggedIn = () => axios({
				method: 'post',
				url: BUG_TRACKER_SERVER + '/api/login',
				data: qs.stringify(action.payload),
				headers: {
				  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
              })
        .then(res =>
         {
            console.log(res.data);
            // state.LoggedIn = true;
            // state.admin = true;
            return true;
          })
          .catch((err) => {
            console.log(err);
          });
      if (isLoggedIn()) {
        state.LoggedIn = true;
        state.admin = true;
      }

      // const {name,password} = action.payload;
      // console.log(state);
    },

        signOut:(state)=>{
        let isLoggedOut = () => axios.get(BUG_TRACKER_SERVER + "/api/logout")
        .then((response) => {
            console.log(response.data);
            return true;
          })
          .catch((err) => console.log(err));

      if (isLoggedOut()) {
        state.LoggedIn = false;
        state.admin = false;
      }
    },

        createUser:(state,action)=>{
        let isCreated = () => axios({
				method: 'post',
				url: BUG_TRACKER_SERVER + '/api/register',
				data: qs.stringify(action.payload),
				headers: {
				      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				      }
        })
          .then((res) => {
            console.log(res.data);
            return true;
          })
          .catch((err) => console.log(err));
      if (isCreated()) {
        state.LoggedIn = true;
        state.admin = true;
      }
    },
  },
});

export default slice.reducer;

export const { signIn, signOut, createUser } = slice.actions;
