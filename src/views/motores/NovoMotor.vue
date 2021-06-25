<template>
  <div class="container mt-5">
    <form @submit="onSubmit">
      <div class="row g-3">
        <div class="col-md-3">
          <label for="Marca" class="form-label">Marca</label>
          <input
            v-model="motor.marca"
            type="text"
            class="form-control"
            id="Marca"
          />
        </div>
        <div class="col-md-3">
          <label for="Modelo" class="form-label">Modelo</label>
          <input
            v-model="motor.modelo"
            type="text"
            class="form-control"
            id="Modelo"
          />
        </div>
        <div class="col-md-3">
          <label for="Potencia" class="form-label">Potência</label>
          <input
            v-model="motor.potencia"
            type="number"
            class="form-control"
            id="Potência"
          />
        </div>
        <div class="col-md-3">
          <label for="Rotacao" class="form-label">Rotação</label>
          <input
            v-model="motor.rotacao"
            type="number"
            class="form-control"
            id="Rotacao"
          />
        </div>


        <div class="col-md-2">
          <label for="Voltagem1" class="form-label"
            >Voltagem
            <input
              class="form-check-input m-1"
              type="checkbox"
              id="voltagem"
              value="110"
              v-model="voltagens"
          /></label>
          <input
            type="number"
            class="form-control"
            id="voltagem"
            placeholder="110"
            disabled
          />
        </div>
        <div class="col-md-2">
          <label for="Voltagem2" class="form-label"
            >Voltagem
            <input
              class="form-check-input m-1"
              type="checkbox"
              id="voltagem"
              value="220"
              v-model="voltagens"
          /></label>
          <input
            type="number"
            class="form-control"
            id="voltagem"
            placeholder="220"
            disabled
          />
        </div>
        <div class="col-md-2">
          <label for="Voltagem3" class="form-label"
            >Voltagem
            <input
              class="form-check-input m-1"
              type="checkbox"
              id="voltagem"
              value="380"
              v-model="voltagens"
          /></label>
          <input
            type="number"
            class="form-control"
            id="voltagem"
            placeholder="380"
            disabled
          />
        </div>
        <div class="col-md-2">
          <label for="Voltagem4" class="form-label"
            >Voltagem
            <input
              class="form-check-input m-1"
              type="checkbox"
              id="voltagem"
              value="440"
              v-model="voltagens"
          /></label>
          <input
            type="number"
            class="form-control"
            id="voltagem"
            placeholder="440"
            disabled
          />
        </div>
        <div class="col-md-2">
          <label for="Voltagem5" class="form-label"
            >Voltagem
            <input
              class="form-check-input m-1"
              type="checkbox"
              id="voltagem"
              value="760"
              v-model="voltagens"
          /></label>
          <input
            type="number"
            class="form-control"
            id="voltagem"
            placeholder="760"
            disabled
          />
        </div>

        <div class="col-md-2"  >
          <label for="Amperagem1" class="form-label">Amperagem</label>
          <input
            v-model="amperagens.amp1"
            type="number"
            class="form-control"
            id="amperagem"
          />
        </div>
        <div class="col-md-2">
          <label for="Amperagem2" class="form-label">Amperagem</label>
          <input
            v-model="amperagens.amp2"
            type="number"
            class="form-control"
            id="amperagem"
          />
        </div>
        <div class="col-md-2">
          <label for="Amperagem3" class="form-label">Amperagem</label>
          <input
            v-model="amperagens.amp3"
            type="number"
            class="form-control"
            id="amperagem"
          />
        </div>
        <div class="col-md-2">
          <label for="Amperagem4" class="form-label">Amperagem</label>
          <input
            v-model="amperagens.amp4"
            type="number"
            class="form-control"
            id="amperagem"
          />
        </div>
        <div class="col-md-2">
          <label for="Amperagem5" class="form-label">Amperagem</label>
          <input
            v-model="amperagens.amp5"
            type="number"
            class="form-control"
            id="amperagem"
          />
        </div>
        <div class="col-md-4">
          <label for="Peso" class="form-label">Peso</label>
          <input
            
            type="number"
            class="form-control"
            id="Peso"
          />
        </div>
      </div>

      <div class="row g-3">
        <div class="col-4">
          <label for="Fio1" class="form-label">Fio</label>
          <input
            
            type="number"
            class="form-control"
            id="Fio1"
          />
        </div>
        <div class="col-4">
          <label for="Quantidade1" class="form-label">Quantidade</label>
          <input
            
            type="number"
            class="form-control"
            id="Quantidade1"
          />
        </div>
        <div class="col-4">
          <label for="Espiras1" class="form-label">Espiras</label>
          <input
            
            type="number"
            class="form-control"
            id="Espiras1"
          />
        </div>
        <div class="col-4">
          <label for="Fio2" class="form-label">Fio</label>
          <input
            
            type="number"
            class="form-control"
            id="Fio2"
          />
        </div>
        <div class="col-4">
          <label for="Quantidade2" class="form-label">Quantidade</label>
          <input
            
            type="number"
            class="form-control"
            id="Quantidade2"
          />
        </div>
        <div class="col-4">
          <label for="Espiras2" class="form-label">Espiras</label>
          <input
            
            type="number"
            class="form-control"
            id="Espiras2"
          />
        </div>

        <div class="col-4">
          <label for="Fio3" class="form-label">Fio</label>
          <input
            
            type="number"
            class="form-control"
            id="Fio3"
          />
        </div>
        <div class="col-4">
          <label for="Quantidade3" class="form-label">Quantidade</label>
          <input
            
            type="number"
            class="form-control"
            id="Quantidade3"
          />
        </div>
        <div class="col-4">
          <label for="Espiras3" class="form-label">Espiras</label>
          <input
            
            type="number"
            class="form-control"
            id="Espiras3"
          />
        </div>
      </div>

      <div class="row g-3">
        <div class="col-md-4">
          <label for="Ligacao" class="form-label">Ligação</label>
          <input
            v-model="motor.ligacao"
            type="text"
            class="form-control"
            id="Ligacao"
          />
        </div>
        <div class="col-md-2">
          <label for="Ranhuras" class="form-label">Ranhuras</label>
          <input
            v-model="motor.ranhuras"
            type="number"
            class="form-control"
            id="Ranhuras"
          />
        </div>
        <div class="col-md-3">
          <label for="MedidaInterna" class="form-label">Medida Interna</label>
          <input
            v-model="motor.medidaInterna"
            type="number"
            class="form-control"
            id="MedidaInterna"
          />
        </div>
        <div class="col-md-3">
          <label for="MedidaExterna" class="form-label">Medida Externa</label>
          <input
            v-model="motor.medidaExterna"
            type="number"
            class="form-control"
            id="MedidaExterna"
          />
        </div>
      </div>

      <div class="row g-3 mt-1">
        <div class="col-12 text-end">
          <button type="submit" class="btn btn-success">Registrar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
    return {
      voltagens: [],
      amperagens: [
        {amp1: 0.0},
        {amp2: 0.0},
        {amp3: 0.0},
        {amp4: 0.0},
        {amp5: 0.0}
      ]
      }
  },
  computed: mapGetters(["motor"]),
  methods: {
    ...mapActions(["create"]),
    onSubmit() {
      const user = sessionStorage.getItem('login')
      this.create(this.motor, this.voltagens, parseFloat(this.amperagens), user)
      this.$router.push("/motores")
    }
  },
};
</script>

<style>
</style>