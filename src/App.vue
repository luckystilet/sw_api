<template>
  <div id="app">
      <SWAPI/>
  </div>
</template>

<script>
import SWAPI from '@/components/SWAPI'
export default {
  name: 'app',
  components: { SWAPI }
}
</script>

<style scoped>
#app {
    height: 100%;
}
</style>
