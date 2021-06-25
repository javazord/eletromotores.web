<template>

    <section class="ftco-section">
		<div class="container">

      <!-- <div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">ELETROMOTORES</h2>
				</div>
			</div> -->

			<div class="row justify-content-center">
			</div>
			<div class="row justify-content-center">
				<div class="col-md-7 col-lg-5">
					<div class="wrap">
						<div class="img" style="background-image: url(images/bg-1.jpg);"></div>
						<div class="login-wrap p-4 p-md-5">

							<form @submit="onSubmit" class="signin-form">

								<div class="form-group mt-3">
									<input v-model="login" type="text" class="form-control">
									<label class="form-control-placeholder" for="username">Login</label>
								</div>
								<div class="form-group">
									<input v-model="password" id="password-field" type="password" class="form-control" >
									<label class="form-control-placeholder" for="password">Senha</label>
									<span toggle="#password-field"
										class="fa fa-fw fa-eye field-icon toggle-password"></span>
								</div>
								<div class="form-group">
									<button type="submit" class="form-control btn btn-primary rounded submit px-3">Logar</button>
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

</template>

<script>
import createHttp from "@/services/axiosConfig"

export default {
  data() {
    return {
      login: "",
      password: "",
      loginError: false,
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const bodyData = new FormData();
      bodyData.append("grant_type", "password");
      bodyData.append("username", this.login);
      bodyData.append("password", this.password);
      try {
        const http = createHttp();
        const res = await http.post("/oauth/token", bodyData, {
          auth: {
            username: "elms-web",
            password: "esp12345",
          },
        })
        
        if (res.status === 200) {
          localStorage.setItem("elms_token", res.data.access_token)
          sessionStorage.setItem("login", this.login)
          this.$router.push("/usuarios")
        }
        

      } catch (err) {
        console.log(err);
        this.loginError = true;
        localStorage.removeItem("elms_token");
      }
    },
  },
};
</script>

<style>
</style>