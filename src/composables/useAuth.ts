import {onUnmounted, ref} from "vue";
import {useToken} from "@/stores/useToken.ts";

const {saveToken} = useToken();

export function useAuth() {
    const loading = ref<boolean>();
    const message = ref<string>('');
    let isActive = <boolean>true;
    const login = async (credentials: object): Promise<void> => {
        try {
            loading.value = true;
            const res = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            if (res.status === 401) {
                message.value = 'Credenciais Inválidas ou Incorretas';
                return
            }
            if (res.status === 201) {
                const data = await res.json();
                saveToken(data.token);
                message.value = 'Login Realizado com Sucesso!';
                return;
            }
        } finally {
            loading.value = false;
        }
    }
    onUnmounted(() => {
        isActive = false;
    });
    return {login, loading, message}
}