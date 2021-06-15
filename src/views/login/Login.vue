<template>
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-4-widescreen ">
          <form @submit="onSubmit" class="box">
            <div class="container-fluid ">

      <div class="col-md-6">
        <label
          class="visually-hidden"
          for="inlineFormInputGroupUsername"
        ></label>
        <div class="input-group">
          <div class="input-group-text"><i class="fas fa-user"></i></div>
          <input v-model="login" type="text" class="form-control form-control-sm" placeholder="Login" />
        </div>
      </div>

      <div class="col-md-6">
        <label
          class="visually-hidden"
          for="inlineFormInputGroupUsername"
        ></label>
        <div class="input-group">
          <div class="input-group-text"><i class="fas fa-key"></i></div>
          <input v-model="password" type="password" class="form-control form-control-sm" placeholder="Senha" />
        </div>
      </div>

      <input type="submit" value="Logar" class="button btn btn-success" />

    </div>
  </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createHttp from '@/services/axiosConfig'
export default {
  data() {
    return {
      login: '',
      password: '',
      loginError: false
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const bodyData = new FormData();
      bodyData.append('grant_type', 'password')
      bodyData.append('username', this.login)
      bodyData.append('password', this.password)
      try {
        const http = createHttp()
        const res = await http.post('/oauth/token', bodyData, {
          auth: {
            username: 'elms-web',
            password: 'esp12345'
          }
        })
        console.log(res);
        console.log(res.data.access_token);
        console.log(JSON.parse(atob(res.data.access_token.split('.')[1])));
        if (res.status === 200) {
          
          localStorage.setItem('elms_token', res.data.access_token)
          this.$router.push('/usuarios')
        } 
        
      } catch(err) {
        console.log(err);
        this.loginError = true
        // delete this.$http.defaults.headers.common['Authorization']
        localStorage.removeItem('elms_token')
      } 
      
    }
  }
}
</script>

<style>
</style>