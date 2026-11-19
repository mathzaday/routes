import {onUnmounted, ref} from "vue";
import type {Product} from "@/interfaces/Product.ts";
import type {NewProductInterface} from "@/interfaces/NewProductInterface.ts";

export function useProducts() {
    const loading = ref<boolean>(false);
    const message = ref<string>('');
    let isActive = <boolean>true;
    const baseUrl = <string>'https://fakestoreapi.com/products';
    const products = ref<Array<Product>>([]);
    const getProducts = async (): Promise<void> => {
        try {
            loading.value = true;
            const res = await fetch(baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (res.status !== 200) {
                message.value = 'Erro ao buscar dados na API';
                return;
            }
            products.value = await res.json();
        } finally {
            loading.value = false;
        }
    }
    const createProduct = async (data: NewProductInterface) => {
        try {
            loading.value = true;
            const res = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (res.status !== 201) {
                message.value = 'Erro ao Cadastrar Produto';
                return;
            }
            message.value = 'Produto Cadastrado com sucesso!';
        } finally {
            loading.value = false;
        }
    }
    onUnmounted(() => {
        isActive = false;
    });
    return {getProducts, loading, message, products, createProduct};
}