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

    isDarkMode: true,

    toggleDarkMode:(state)=>{
        set((state)=>({isDarkMode: !state.isDarkMode}));
        console.log(state.isDarkMode);
    },


    temp:true,

    checkAuth: async () => {
        console.log("checkAuth: Starting authentication check");
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/api/v1/user/check");
            console.log("checkAuth: Response:", res.data);
            if (res.data.success && res.data.user) {
                console.log("checkAuth: User authenticated, setting user data");
                set({Authuser: res.data.user, isCheckingAuth: false});
            } else {
                console.log("checkAuth: No user data, setting null");
                set({Authuser: null, isCheckingAuth: false});
            }
        } catch (error) {
            console.log("Auth check error:", error);
            // Always set isCheckingAuth to false on any error
            if (error.response && error.response.status === 401) {
                console.log("checkAuth: 401 error - user not authenticated");
                set({Authuser: null, isCheckingAuth: false});
            } else {
                console.log("checkAuth: Network or other error");
                set({isCheckingAuth: false});
            }
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
            return null; // Return null on error
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
            return null; // Return null on error
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
            // Redirect to Google OAuth endpoint
            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/auth/google`;
        } catch (error) {
            console.log(error);
            toast.error("Google authentication failed");
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
    },

    // Blog functions
    createBlog: async (data) => {
        try {
            const res = await axiosInstance.post("/api/v1/blog/create", data);
            return res.data;
        } catch (error) {
            console.log(error);
            if(error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
            return null;
        }
    },

    getAllBlogs: async () => {
        try {
            const res = await axiosInstance.get("/api/v1/blog/");
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    getUserBlogs: async () => {
        try {
            const res = await axiosInstance.get("/api/v1/blog/user/blogs");
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    deleteBlog: async (id) => {
        try {
            const res = await axiosInstance.delete(`/api/v1/blog/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
            if(error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
            return null;
        }
    },

    // Social Link functions
    createOrUpdateSocialLink: async (data) => {
        try {
            const res = await axiosInstance.post("/api/v1/social-links/", data);
            return res.data;
        } catch (error) {
            console.log(error);
            if(error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
            return null;
        }
    },

    getUserSocialLinks: async () => {
        try {
            const res = await axiosInstance.get("/api/v1/social-links/user");
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    deleteSocialLink: async (id) => {
        try {
            const res = await axiosInstance.delete(`/api/v1/social-links/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
            if(error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
            return null;
        }
    },

    resetAuthState: () => {
        set({
            Authuser: null,
            isCheckingAuth: false,
            isLogined: false,
            isSignedUp: false,
            isUpdateProfile: false
        });
    }

}), {
    name: 'user-auth-storage',
    partialize: (state) => ({ 
        Authuser: state.Authuser,
        isDarkMode: state.isDarkMode 
    })
}));
