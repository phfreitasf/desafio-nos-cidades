<template>
  <div class="graphs">
    <form-update-add-graph />
    <form-grap-select />
    <form-routes />
  </div>
</template>

<script>
import FormUpdateAddGraph from "./components/FormUpdateAddGraph.vue";
import FormGrapSelect from "./components/FormGraphSelect.vue"
import FormRoutes from "./components/FormRoutes.vue"

export default {
  name: "App",
  components: {
    FormUpdateAddGraph,FormGrapSelect,FormRoutes
  },

  methods: {},
};
</script>

<style>

* {
  font-family: monospace;
  font-size: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  
}

body {
background: #232526;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to left, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.graphs {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-top: 100px;
  
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
