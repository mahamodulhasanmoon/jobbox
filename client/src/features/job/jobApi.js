import apiSlice from "../api/apiSlice";


const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        job : builder.mutation({
            query : (data)=> ({
                method : 'POST',
                url :'/job',
                body : data
            }),

        })
    })

   
})

export const {useJobMutation} = jobApi