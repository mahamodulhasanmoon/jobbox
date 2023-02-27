import apiSlice from "../api/apiSlice";


const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        job : builder.mutation({
            query : (data)=> ({
                method : 'POST',
                url :'/job',
                body : data
            }),

        }),
        apply : builder.mutation({
            query : (data)=> ({
                method : 'PATCH',
                url :'/apply',
                body : data
            }),

        }),
        getJobs : builder.query({
            query : ()=> ({
               url : '/jobs',
               
            }),

        }),
        getJobById : builder.query({
            query : (id)=> ({
                
               url : `/job/${id}`,
               
            }),

        })
    })

   
})

export const {useJobMutation , useGetJobsQuery, useGetJobByIdQuery, useApplyMutation} = jobApi