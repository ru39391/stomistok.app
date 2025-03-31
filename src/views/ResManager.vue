<template>
  <Form />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from '../components/Form.vue';

export default defineComponent({
  name: 'ResManager',

  components: {
    Form
  },
});
</script>
