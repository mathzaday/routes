<template>
  <NavBar/>
  <p v-if="loading">Carregando...</p>
  <div class="products-container" v-else>
    <h2>Catálogo de Produtos</h2>
    <div class="search-container">
      <input class="search-input" type="text" placeholder="Busque o produto pelo nome"
             v-model="searchTerm">
      <button class="search-btn" @click.prevent="searchProduct">Pesquisar</button>
    </div>

    <ul class="cards-container" v-if="filteredProducts.length > 0">
      <li class="product-card" v-for="product in filteredProducts" :key="product.id">
        <strong>{{ product.title }}</strong>
        <p>R${{ product.price }}</p>
        <img :src="product.image" alt="Imagem do Produto">
      </li>
    </ul>
    <p v-else>Nenhum Produto Encontrado</p>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useProducts} from "@/composables/useProducts.ts";
import type {Product} from "@/interfaces/Product.ts";
import NavBar from "@/components/NavBar.vue";

const {getProducts, products, loading} = useProducts();
const filteredProducts = ref<Array<Product>>([]);
const searchTerm = ref<string>('');
onMounted(async () => {
  await getProducts();
  filteredProducts.value = products.value;
});
const searchProduct = async () => {
  const trimmedSearchTerm = searchTerm.value.trim();
  if (trimmedSearchTerm === '') {
    filteredProducts.value = products.value;
    return;
  }
  filteredProducts.value = products.value.filter((product) => product.title.toLowerCase().includes(trimmedSearchTerm.toLowerCase()));
}
</script>
<style scoped>

</style>