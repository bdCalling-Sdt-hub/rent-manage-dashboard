import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: "/users/all-users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    userProfile: builder.query({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }

        return {
          url: "/users/my-profile",
          method: "GET",
          body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["profile"],
    }),
    editProfile: builder.mutation({
      query: (formData) => {
        console.log(formData);
        const accessToken = localStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/users/update-my-profile",
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["profile"],
    }),
    allLandlord: builder.query({
      query: () => ({
        url: "/users/all-landlord-with-property",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    addPeople: builder.mutation({
      query: (formData) => {
        console.log(formData);
        const accessToken = localStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/users/create-admin",
          method: "post",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useUserProfileQuery,
  useEditProfileMutation,
  useAllLandlordQuery,
  useAddPeopleMutation,
} = userApi;
