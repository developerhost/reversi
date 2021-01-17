<template>
  <v-layout>
    <VCell
      v-for="(cell) in row.cells"
      :key="`${cell.x}-${cell.y}`"
      :cell="cell"
      @put="onPutEvent"
    />
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import VCell from '@/components/reversi/VCell.vue';

import { Row, Point } from '../../models/reversi';

@Component({
  components: {
    VCell,
  },
})
export default class VRow extends Vue {

  @Prop({required: true})
  public row!: Row;

  @Emit('put')
  public put(p: Point) {
    console.log(p)
  }

  public onPutEvent(p: Point) {
    this.put(p)
  }
}
</script>