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

export const {useJobMutation , useGetJobsQuery, useGetJobByIdQuery} = jobApi