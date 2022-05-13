<template>
  <div>
    <h2>{{ texto }}</h2>
    <select >
      <option v-for="letra in alphabet" name="cidade" :key="letra">{{letra.toUpperCase()}}</option>
    </select>

    
  </div>
</template>

<script>
export default {
  name: "ComboBox",
  data() {
      return {
          alphabet : [..."abcdefghijklmnopqrstuvwxyz"]
      }
  },

  props: {
    texto: String,
    source: String,
    destiny: String,
    bInicial: Boolean,
    bDestino: Boolean,
  },
};
</script>

<style>
</style>