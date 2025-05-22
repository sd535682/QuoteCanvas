import axios from 'axios';

export const gitAPI = axios.create({
  baseURL: 'https://api.github.com',
});

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export const getGitUser = async (): Promise<GitHubUser | null> => {
  try {
    const response = await gitAPI.get('/users/sd535682');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
};
