<template>
  <div class="formContainer">
    <form class="formSelect" action="http://localhost:8081/" method="POST">
      <h1 class="title">Calcular rotas</h1>
      <h2>Cidade Origem</h2>
      <select v-model="source">
        <option v-for="letra in alphabet" name="source" :key="letra">
          {{ letra.toUpperCase() }}
        </option>
      </select>
      <h2>Cidade Destino</h2>
      <select v-model="target">
        <option v-for="letra in alphabet" name="target" :key="letra">
          {{ letra.toUpperCase() }}
        </option>
      </select>
    </form>

    <input
      type="number"
      name="graphId"
      class="formSelect"
      min="1"
      v-model="graphID"
    />
    <button class="formSelect" @click="gotoGraph(graphId)">
      Calcular paradas
    </button>
    <button class="formSelect" @click="getStops(graphId,source,target)">
      Calcular distancia
    </button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'FormRoutes',
      data() {
    return {
      alphabet: [..."abcdefghijklmnopqrstuvxwyz"],
      target: "A",
      source: "A",
      graphID: "1"

    };
  },

  methods: {
      async getStops (graphId,source,target)
      {
          axios
            .post('/routes/:graphId/from/:source/to/:target',
            { "id": graphId,
              "source": source,
              "target": target})
              .then(response => console.log(response))
              .catch(error => console.log(error))
      }
  },
}
</script>

<style>
</style>