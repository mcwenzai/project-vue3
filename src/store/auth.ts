import { defineStore } from 'pinia';

interface AuthState {
  token: string | null;
  projectItem: object;
  contractAndVisa: object;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    projectItem: {},
    contractAndVisa: {}
  }),

  actions: {
    setToken(token: string): void {
      this.token = token;
      try {
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Failed to set token in localStorage:', error);
      }
    },
    removeToken(): void {
      this.token = null;
      try {
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Failed to remove token from localStorage:', error);
      }
    },
    setProjectItem(projectItem: string | null): void {
      this.projectItem = projectItem;
    },
    setContractAndVisa(contractAndVisa: object): void {
      this.contractAndVisa = contractAndVisa;
    },
  },

  getters: {
    getToken(state: AuthState): string | null {
      return state.token;
    },
    getProjectItem(state: AuthState): object {
      return state.projectItem;
    },
    getContractAndVisa(state: AuthState): object {
      return state.contractAndVisa;
    }

  }
});