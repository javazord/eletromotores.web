<template>
  <Topo/>
  <div class="container-fluid">
    <router-view/>
  </div>
  
</template>

<script>
import Topo from '@/components/Topo'

export default {
  components: {
    Topo
  }
}
</script>


<style>

</style>
