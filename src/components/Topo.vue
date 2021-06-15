<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ELETROMOTORES</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation" v-if="rendered()" 
      >
        <span class="navbar-toggler-icon" ></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <!--Motores-->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Motores
            </a>
          <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><router-link to="" class="nav-link">Novo</router-link></li>
            <li><router-link to="/motores" class="nav-link">Buscar</router-link></li>
          </ul>
        </li>

        <!--Usuario-->
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Usuários
            </a>
          <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><router-link to="" class="nav-link">Novo</router-link></li>
            <router-link to="/usuarios" class="nav-link" v-if="rendered()">Buscar</router-link>
          </ul>
        </li>

          <!-- <li class="nav-item">
            <router-link to="/motores" class="nav-link" v-if="rendered()">Motores</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/usuarios" class="nav-link" v-if="rendered()">Usuarios</router-link>
          </li> -->
          <li class="nav-item">
            <button @click="onLogout" class="btn btn-outline-danger" v-if="rendered()">Logout</button>
          </li>
          
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
      location.reload()
    },
    rendered(){
      const token = localStorage.getItem('elms_token')
      if (token) {
        return true
      }else{
        return false
      }
    }
  }
};
</script>

<style>
</style>