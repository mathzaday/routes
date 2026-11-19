<template>
  <NavBar/>
  <div class="page"><h1>Cadastro de Produto</h1>
    <form class="new-product-form" @submit.prevent="createProductAction">
      <div class="input-container"><label for="title-id">Título</label>
        <input class="data-input" type="text" id="title-id" required v-model="formData.title"></div>

      <div class="input-container"><label for="category-id">Categoria</label>
        <input class="data-input" type="text" id="category-id" required v-model="formData.category"></div>

      <div class="input-container"><label for="price-id">Preço</label>
        <input class="data-input" type="number" id="price-id" required step="0.01" v-model="formData.price"></div>

      <div class="input-container"><label for="description-id">Descrição</label>
        <input class="data-input" type="text" id="description-id" required v-model="formData.description"></div>

      <div class="input-container"><label for="image-url">URL da Imagem</label>
        <input class="data-input" type="text" id="image-url" required v-model="formData.image"></div>

      <button type="submit" :disabled="loading">{{ loading ? 'Carregando...' : 'Cadastrar' }}</button>
    </form>
    <p v-if="loading">Carregando...</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import type {NewProductInterface} from "@/interfaces/NewProductInterface.ts";
import {useProducts} from "@/composables/useProducts.ts";
import NavBar from "@/components/NavBar.vue";

const {createProduct, loading, message} = useProducts();
const formData = ref<NewProductInterface>({
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
});
const createProductAction = async () => {
  await createProduct(formData.value);
  formData.value = {
    category: '',
    description: '',
    image: '',
    title: '',
    price: 0
  }
}
</script>
<style scoped>

</style>