<template>
    <table class="table table table-striped table-hover m-4">
      <thead class="text-center">
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
    </table>
</template>

<script>

export default {
  
}
</script>

<style>
</style>