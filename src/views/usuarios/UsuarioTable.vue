<template>
  <div class="container ">
    <table class="table table table-striped table-hover mt-5">
    <thead class="table-dark text-center">
      <tr>
        <th>Login</th>
        <th>Condição</th>
        <th>Privilégio</th>
        <th>Ação</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="usuario in allUsers" :key="usuario.id">
        <td>{{ usuario.login }}</td>

        <td v-if="usuario.condition">Ativo</td>
        <td v-else>Inativo</td>

        <td v-if="usuario.role == 'ROLE_ADMIN'">Administrador</td>
        <td v-else>Usuário</td>

        <td>
          <i class="fas fa-user-edit"></i>
        </td>
      </tr>
    </tbody>
    <tfoot>
        
    </tfoot>
  </table>
  </div>
  

</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["allUsers"]),
  methods: {
    ...mapActions(["getAll"]),
  },
  mounted() {
    this.getAll();
  },
}
</script>

<style>
</style>