import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRepo, IUser, ServerResponse } from '../../models/models';

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], { search: string; page: number }>({
      query: ({ search, page }) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10,
          page,
        },
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
    searchRepos: build.query<IRepo[], { search: string; page: number }>({
      query: ({ search, page }) => ({
        url: 'search/repositories',
        params: {
          q: search,
          per_page: 10,
          page,
        },
      }),
      transformResponse: (response: ServerResponse<IRepo>) => response.items,
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
    getUserInfo: build.query<IUser, string>({
      query: (username: string) => ({
        url: `users/${username}`,
      }),
    }),
  }),
});

export const {
  useSearchUsersQuery,
  useSearchReposQuery,
  useLazyGetUserReposQuery,
  useLazyGetUserInfoQuery,
} = githubApi;
