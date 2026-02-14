import a from "axios";

const axios = a.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// axios.interceptors.request.use((config)=>{
//     const
// })

export { axios };
