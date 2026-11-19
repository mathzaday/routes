<template>
  <form @submit.prevent="loginAction">
    <div class="username-wrapper">
      <label for="name-id">Nome: </label>
      <input type="text" id="name-id" required v-model="formData.username">
    </div>
    <div class="password-wrapper">
      <label for="password-id">Senha: </label>
      <input type="password" id="password-id" required v-model="formData.password">
    </div>
    <button type="submit">Entrar</button>
  </form>
  <p v-if="message">{{ message }}</p>
</template>
<script setup lang="ts">
import {useAuth} from "@/composables/useAuth.ts";
import {reactive} from "vue";
import router from "@/router";

const {login, loading, message} = useAuth();
const formData = reactive({
  'username': <string>'',
  'password': <string>''
});
const loginAction = async (): Promise<void> => {
  await login(formData);
  await router.push({name: 'products'});
}
</script>

<style scoped>

</style>