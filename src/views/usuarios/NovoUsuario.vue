<template>
  <div class="container mt-5">
    <form @submit="onSubmit" class="row g-3 justify-content-center">
      <div class="col-md-5">
        <label for="exampleInputEmail1" class="form-label">Login</label>
        <input v-model="usuario.login"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>

      <div class="col-md-5">
        <label for="exampleInputPassword1" class="form-label">Senha</label>
        <input v-model="usuario.password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      

    <div class="row m-2 justify-content-center">
        <button type="submit" class="col-md-6 btn btn-primary">Registrar</button>
    </div>
      
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: mapGetters(['usuario']),
  methods: {
    ...mapActions(['create']),
    onSubmit(){
      this.create(this.usuario)
      this.$router.push('/usuarios')
    }
  }
};
</script>

<style>
</style>