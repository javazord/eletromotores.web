<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="rendered()" >
    <div class="container-fluid">
      <a class="navbar-brand">ELETROMOTORES</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"  
      >
        <span class="navbar-toggler-icon" ></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" >

        <ul class="navbar-nav text-right">
          <!--Motores-->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="Motores" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Motores
            </a>
          <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="Motores">
            <li><router-link to="/motores/novo" class="nav-link">Novo</router-link></li>
            <li><router-link to="/motores" class="nav-link">Buscar</router-link></li>
          </ul>
        </li>

        <!--Usuario-->
        <li class="nav-item dropdown" >
            <a class="nav-link dropdown-toggle" href="#" id="Usuario" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Usuários
            </a>
          <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="Usuario">
            <li><router-link to="/usuarios/novo" class="nav-link">Novo</router-link></li>
            <li><router-link to="/usuarios" class="nav-link">Buscar</router-link></li>
          </ul>
        </li>
          
        </ul>
        
        <ul class="navbar-nav ">
          <div class="nav-item text-right">
            <button @click="onLogout" class="btn btn-outline-danger" >Logout</button>
        </div>
        </ul>
          
      </div>
      
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    onLogout() {
      localStorage.removeItem('elms_token')
      this.$router.push('/login')
      this.$forceUpdate();
    },
    rendered(){
      const token = localStorage.getItem('elms_token')
      if (token) {
        return true
      } else {
        return false
      }
    }
  }
};
</script>

<style>
</style>