<template>
  <div class="container mt-5">
    <form>
      <div class="row g-3">
        <div class="col-md-3">
          <label for="Marca" class="form-label">Marca</label>
          <input type="text" class="form-control" id="Marca" />
        </div>
        <div class="col-md-3">
          <label for="Modelo" class="form-label">Modelo</label>
          <input type="text" class="form-control" id="Modelo" />
        </div>
        <div class="col-md-3">
          <label for="Potencia" class="form-label">Potência</label>
          <input type="text" class="form-control" id="Potência" />
        </div>
        <div class="col-md-3">
          <label for="Rotacao" class="form-label">Rotação</label>
          <input type="text" class="form-control" id="Rotacao" />
        </div>
        <div class="col-md-2">
          <label for="Voltagem1" class="form-label"
            >Voltagem
            <input class="form-check-input m-1" type="checkbox" id="Voltagem1"
          /></label>
          <input
            type="text"
            class="form-control"
            id="Voltagem1"
            placeholder="110"
            disabled
          />
        </div>
        <div class="col-md-2">
          <label for="Voltagem2" class="form-label"
            >Voltagem
            <input class="form-check-input m-1" type="checkbox" id="Voltagem2"
          /></label>
          <input
            type="text"
            class="form-control"
            id="Voltagem2"
            placeholder="220"
            disabled
          />
        </div>
        <div class="col-md-2">
          <label for="Voltagem3" class="form-label"
            >Voltagem
            <input class="form-check-input m-1" type="checkbox" id="Voltagem3"
          /></label>
          <input
            type="text"
            class="form-control"
            id="Voltagem3"
            placeholder="380"
            disabled
          />
        </div>
        <div class="col-md-2">
          <label for="Voltagem4" class="form-label"
            >Voltagem
            <input class="form-check-input m-1" type="checkbox" id="Voltagem4"
          /></label>
          <input
            type="text"
            class="form-control"
            id="Voltagem4"
            placeholder="440"
            disabled
          />
        </div>
        <div class="col-md-4">
          <label for="Tensao" class="form-label">Tensão</label>
          <select id="Tensao" class="form-select">
            <option selected>Trifásico</option>
            <option>Monofásico</option>
            <option>Bifásico</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="Amperagem1" class="form-label">Amperagem</label>
          <input type="text" class="form-control" id="Amperagem1" />
        </div>
        <div class="col-md-2">
          <label for="Amperagem2" class="form-label">Amperagem</label>
          <input type="text" class="form-control" id="Amperagem2" />
        </div>
        <div class="col-md-2">
          <label for="Amperagem3" class="form-label">Amperagem</label>
          <input type="text" class="form-control" id="Amperagem3" />
        </div>
        <div class="col-md-2">
          <label for="Amperagem4" class="form-label">Amperagem</label>
          <input type="text" class="form-control" id="Amperagem4" />
        </div>
        <div class="col-md-4">
          <label for="Peso" class="form-label">Peso</label>
          <input type="text" class="form-control" id="Peso" />
        </div>
      </div>

      <div class="row g-3">
        <div class="col-4">
          <label for="Fio1" class="form-label">Fio</label>
          <input type="text" class="form-control" id="Fio1" />
        </div>
        <div class="col-4">
          <label for="Quantidade1" class="form-label">Quantidade</label>
          <input type="text" class="form-control" id="Quantidade1" />
        </div>
        <div class="col-4">
          <label for="Espiras1" class="form-label">Espiras</label>
          <input type="text" class="form-control" id="Espiras1" />
        </div>
        <div class="col-4">
          <label for="Fio2" class="form-label">Fio</label>
          <input type="text" class="form-control" id="Fio2" />
        </div>
        <div class="col-4">
          <label for="Quantidade2" class="form-label">Quantidade</label>
          <input type="text" class="form-control" id="Quantidade2" />
        </div>
        <div class="col-4">
          <label for="Espiras2" class="form-label">Espiras</label>
          <input type="text" class="form-control" id="Espiras2" />
        </div>

        <div class="col-4">
          <label for="Fio3" class="form-label">Fio</label>
          <input type="text" class="form-control" id="Fio3" />
        </div>
        <div class="col-4">
          <label for="Quantidade3" class="form-label">Quantidade</label>
          <input type="text" class="form-control" id="Quantidade3" />
        </div>
        <div class="col-4">
          <label for="Espiras3" class="form-label">Espiras</label>
          <input type="text" class="form-control" id="Espiras3" />
        </div>
      </div>

      <div class="row g-3">
        <div class="col-md-4">
          <label for="Ligacao" class="form-label">Ligação</label>
          <input type="text" class="form-control" id="Ligacao" />
        </div>
        <div class="col-md-2">
          <label for="Ranhuras" class="form-label">Ranhuras</label>
          <input type="text" class="form-control" id="Ranhuras" />
        </div>
        <div class="col-md-3">
          <label for="MedidaInterna" class="form-label">Medida Interna</label>
          <input type="text" class="form-control" id="MedidaInterna" />
        </div>
        <div class="col-md-3">
          <label for="MedidaExterna" class="form-label">Medida Externa</label>
          <input type="text" class="form-control" id="MedidaExterna" />
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
export default {
  methods:{
  }
};
</script>

<style>
</style>