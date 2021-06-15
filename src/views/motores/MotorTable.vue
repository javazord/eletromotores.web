<template>
    <table class="table table table-striped table-hover m-3">
      <thead class="text-center">
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Potencia</th>
          <th>Rotacao</th>
          <th>MedidaInterna</th>
          <th>MedidaExterna</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="motor in allMotors" :key="motor.id">
          <td>{{motor.marca}}</td>
          <td>{{motor.modelo}}</td>
          <td>{{motor.potencia}}</td>
          <td>{{motor.rotacao}}</td>
          <td>{{motor.medidaInterna}}</td>
          <td>{{motor.medidaExterna}}</td>
          <td>
            <i class="fas fa-edit"/>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters(['allMotors']),
  methods: {
    ...mapActions(['getAll'])
  },
  mounted() {
    this.getAll()
  }
}
</script>

<style>
</style>