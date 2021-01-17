<template>
  <v-container>
    <div>
      <VRow
        v-for="row in board.rows"
        :key="row.num"
        :row="row"
        @put="onPutEvent"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import VRow from '@/components/reversi/VRow.vue';

import { Board, Point } from '../../models/reversi';

@Component({
  components: {
    VRow,
  }
})
export default class VBoard extends Vue {

  @Prop({required: true})
  public board!: Board;

  public onPutEvent(p: Point) {
    this.board.put(p);
  }

}
</script>