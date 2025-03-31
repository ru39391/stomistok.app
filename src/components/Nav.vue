<template>
  <nav class="bg-gray-800 p-4">
    <div class="flex items-center text-white gap-5">
      <router-link
        class="hover:text-blue-400"
        active-class="text-blue-400/100"
        to="/"
      >
        Ресурсы
      </router-link>
      <router-link
        class="hover:text-blue-400"
        active-class="text-blue-400/100"
        to="/form"
      >
        Сохранить элементы
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Nav',
});
</script>

