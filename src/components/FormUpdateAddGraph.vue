<template>
  <div id="app">
    <form
      class="formContainer"
      action="http://localhost:8081/graph"
      method="POST"
    >
    <h1 class="title">Adicionar grafos e rotas</h1>
      <h2>ID</h2>
      <input type="number" v-model="graphID" class="inputNumber" name="graphID" min="1" step="1" />
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
      <h2>Distancia</h2>
      <input
        type="number"
        class="dist"
        min="1"
        step="1"
        name="distance"
        v-model="distance"
        placeholder="Informe a distancia"
      />
      <button
        type="submit"
        class="formSelect"
        @click.prevent="sendData(source, target, distance, graphID)"
      >
        Adicionar nova rota
      </button>
<h4>Criar novo grafo com o ID: {{graphID}} ?</h4>
      <button type="submit" class="formSelect" @click.prevent="addGraph(graphID)">Criar novo registro</button>
    </form>
    
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "FormGraphs",
  data() {
    return {
      alphabet: [..."abcdefghijklmnopqrstuvxwyz"],
      target: "A",
      source: "A",
      distance: "",
      graphID: "1"

    };
  },
  props: {},
  components: {},

  created() {},
  methods: {
    async sendData(source, target, distance, graphId) {
      axios
        .post("http://localhost:8081/graph/", {
          source,
          target,
          distance,
          graphId
        })
        .then((response) => alert(response.data));
    },

    async addGraph() {
      axios
        .post()
    }
  },
  watch: {
    target(novoValor) {
      console.log(novoValor);
    },
    immediate: true,
  },
};
</script>

<style>
* {
  font-family: monospace;
  font-size: 20px;
}

select {
  font-size: 15px;
}

.formContainer {
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  border: 3px green solid;
  border-radius: 10px;
  
  max-width: 300px;
}

.dist {
  font-size: 1rem;
  text-align: center;
  border-radius: 10px;
  max-width: 300px;
}

input.inputNumber {
  text-align: center;
  width: 50px;
  border-radius: 10px;
}

.title{
  color: rgb(25, 187, 52);
}
</style>