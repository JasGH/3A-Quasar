<template>
  <div>
    <q-badge color="secondary">
      {{ label }}: از {{ inputData.min }} تا {{ inputData.max }} ({{ min }} تا {{ max }})
    </q-badge>
    <q-range
      v-model="inputData"
      :min="min"
      :max="max"
      :disable="disable"
      @input="change($event)"
    />
  </div>
</template>

<script>
import inputMixin from 'components/FormBuilder/inputMixin'
export default {
  name: 'FormBuilderRangeSlider',
  mixins: [inputMixin],
  props: {
    value: {
      default: () => {
        return { min: 9, max: 35 }
      },
      type: Object
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
