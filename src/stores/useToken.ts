import {ref} from "vue";

const token = ref<string>(localStorage.getItem('token') || '');

export function useToken() {
    const saveToken = (tokenString: string): void => {
        token.value = tokenString;
        localStorage.setItem('token', token.value);
    }
    const clearToken = (): void => {
        token.value = '';
        localStorage.removeItem('token');
    }
    const decodeToken = (): string => {
        try {
            const base64Url = <string>token.value.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            return 'User';
        }
    }
    return {token, saveToken, clearToken, decodeToken};
}