<template>
  <div class="formContainer">
    <h1 class="title">Consulta de grafos</h1>
    <form class="formSelect" action="http://localhost:8081/graph/" method="GET">
      <button class="formSelect">Exibir grafos salvos</button>
    </form>

      <input type="number" name="id" class="formSelect" min="1" v-model="id" />
      <button class="formSelect" @click="gotoGraph(id)">Exibir grafo selecionado</button>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "FormGraphSelect",
  data() {
    return {
      id: "1",
    };
  },

  methods: {
    sendData() {
      axios
        .get("http://localhost:8081/graph/", {"id":"id"})
        .then((response) => alert(response.data));
    },
    gotoGraph(id){
        window.location.href = "http://localhost:8081/graph/"+id
    }
  },
};
</script>

<style>
.formSelect {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin: 5px;
  
  max-width: 300px;
}
</style>