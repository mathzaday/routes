<template>
  <header>
    <h2>{{ decodeToken().user }}</h2>
    <nav>
      <ul class="nav-list">
        <li class="nav-item">
          <a href="#" @click="router.push({name: 'products'})">Listagem de Produtos</a>
        </li>
        <li class="nav-item">
          <a href="#" @click="router.push({name: 'newProduct'})">Cadastro de Produtos</a>
        </li>
        <li>
          <button class="logout-btn" @click.prevent="logoutFunction">Sair</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">

import router from "@/router";
import {useToken} from "@/stores/useToken.ts";

const {clearToken, decodeToken} = useToken();
const logoutFunction = () => {
  clearToken();
  router.push({name: 'login'});
}
</script>