<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{stock.name}}
          <small>(Price: {{stock.price}} | Quantity: {{stock.quantity}})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            v-model="quantity"
            min="0"
            step="1"
            pattern="[0-9]"
            class="form-control"
            placeholder="Quantity"
            :class="{danger: insufficientQuantity}"
          />
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            @click="sellStock"
            :disabled="cannotSell"
          >{{insufficientQuantity ? 'Not enough' : 'Sell'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.danger {
  border: 1px solid red;
}
</style>
<script>
import { mapActions } from "vuex";

export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0
    };
  },
  methods: {
    ...mapActions({
      placeSellOrder: "sellStock"
    }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.placeSellOrder(order);
      this.quantity = 0;
    }
  },
  computed: {
    cannotSell() {
      return (
        this.insufficientQuantity ||
        this.quantity <= 0 ||
        isNaN(Number(this.quantity))
      );
    },
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  }
};
</script>