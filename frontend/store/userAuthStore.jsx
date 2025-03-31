import {create} from "zustand";
import {persist} from "zustand/middleware";
import {toast} from "react-toastify";
import { axiosInstance } from "../lib/axios.jsx";

export const userAuthStore = create(persist((set) => ({
    Authuser: null,
    isLogined: false,
    isSignedUp: false,
    isUpdateProfile: false,
    isCheckingAuth: true,

    isDarkMode:true,

    toggleDarkMode:(state)=>{
        set((state)=>({isDarkMode: !state.isDarkMode}));
        console.log(state.isDarkMode);
    },


    temp:true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/api/v1/user/check");
            set({Authuser: res.data});
        } catch (error) {
            console.log(error);
            set({Authuser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        let res;
        set({isSignedUp: true});

        try {
            res = await axiosInstance.post("/api/v1/user/signup", data);
            set({Authuser: res.data});
            return res;
        } catch (error) {
            console.log(error);
            // Fixed typo in error.response
            if(error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            set({isSignedUp: false});
        }
    },

    signin: async (data) => {
        let res;
        // Should set isLogined to true at start
        set({isLogined: true});

        try {

            console.log("console form userAuth for signin data");
            console.log(data);

            res = await axiosInstance.post("/api/v1/user/signin", data);
            console.log(res);
            set({Authuser: res.data});
            toast.success("Signin successfully");
            return res;

        } catch (error) {
            console.log(error);
            // Fixed typo in error.response
            if(error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            set({isLogined: false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/api/v1/user/logout");
            set({Authuser: null});
            toast.success("Logout Successfully");
        } catch (error) {
            console.log(error);
            // Fixed typo in error.response
            if(error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    },

    updateProfile: async (data) => {
        set({isUpdateProfile: true}); // Should set to true at start
        try {
            await axiosInstance.post("/api/v1/user/", data);
            toast.success("Profile updated successfully"); // Added success message
        } catch (error) {
            console.log(error);
            // Fixed typo in error.response
            if(error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            set({isUpdateProfile: false});
        }
    },

    googleAuth: async () => {
        try {
            const res = await axiosInstance.get("/api/v1/user/auth/google");
            window.location.href = res.data.url;
        } catch (error) {
            console.log(error);
        }
    },

    createContent:async (data)=>{
        try {
            const res = await axiosInstance.post("/api/v1/content/create",data);
            console.log(res);
            return res.data;

        } catch (error) {
            console.log(error);
            
        }

    },

    getAllContent:async()=>{
        try {
            const res = await axiosInstance.get("/api/v1/content/");
            console.log(`State getAllContent all data :`);
            console.log(res.data);
            return res.data;
            
        } catch (error) {
            console.log(error);
        
        }

    },

    updateContent:async(id,data)=>{
        try {

            console.log(`Content id from userAuth : ${id}`);

            const res = await axiosInstance.put(`/api/v1/content/${id}`,data);
            console.log(res);
            return res.data;

            
        } catch (error) {
            console.log(error);
        }

    },

    deleteContent:async(id)=>{
        try {
            const res = await axiosInstance.delete(`/api/v1/content/${id}`);
            console.log(res);
            return res.data;
            
        } catch (error) {
            console.log(error);
        }
    }

})));
