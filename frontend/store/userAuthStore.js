import {create} from "zustand";
import {toast} from "react-toastify";
import { axiosInstance } from "../lib/axios.js";

export const userAuthStore = create((set) => ({
    Authuser: null,
    isLogined: false,
    isSignedUp: false,
    isUpdateProfile:false,


    isCheckingAuth:true,


    checkAuth:async ()=>{
        try {
            
            const res = await axiosInstance.get("/api/v1/user/check");
            set({Authuser:res.data});
    

        } catch (error) {
            console.log(error);
            set({Authuser:null});

        }
        finally{
            set({isCheckingAuth:false});

        }

    },


    signup:async (data)=>{
        let res;
        set({isSignedUp:true});

        try {
            res = await axiosInstance.post("/api/v1/user/signup",data);
            set({Authuser:res.data});
            console.log(res);
            toast.success("Signup successful");
            
        } catch (error) {
            
            console.log(error);

            if(error.responce){
                toast.error(error.responce.data.message);
            }
            else{
                toast.error("Something went wrong ");
            }
        }
        finally{
            set({isSignedUp:false});

        }


    },



    signin: async (data)=>{
        let res;

        try {
            res = await axiosInstance.post("/api/v1/user/signin",data);
            
            console.log(res);
            toast.success("Signin successfully");
            set({Authuser:res.data});

            
        } catch (error) {
            console.log(error);
            toast.error(error.responce.data.message);

        }
        finally{
            set({isLogined:false});
        }


    },


    logout: async ()=>{
        let res;
        try {
            res = await axiosInstance.post("/api/v1/user/logout");
            set({Authuser:null});
            toast.success("Logout Successfully");

            
        } catch (error) {
            console.log(error);
            toast.error(error.responce.data.message);
        }

    },


    updateProfile:async ()=>{
        try {
            const res = await axiosInstance.post("/api/v1/user/")



        } catch (error) {
           console.log(error);
           toast.error(error.responce.data.message);
            
        }
        finally{
            set({isUpdateProfile:false});

        }

    }





}));

