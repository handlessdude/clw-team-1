<template>

  <my-input
      v-focus
      v-model.trim="searchQueryString"
      type="text"
      placeholder="Поиск..."
  />
  <div>searchQueryString: {{searchQueryString}}</div>
  <div>isItemsLoading: {{isItemsLoading}}</div>
  <ul v-if="items&&(items.length > 0)">
    <li
        v-for="item in items"
        :key="item.id"
        @click="selectItem(item)"
    >
      {{item}}
    </li>
  </ul>

  <pre>You have selected: {{ selectedItem }}</pre>
</template>

<script>
import {ref} from 'vue'
//import { useVModel } from "@/hooks/useVModel"
import { useSearch } from "@/hooks/searchHooks/useSearch"
export default {
  name: "autocomplete",
  props: ['entityType'],
  emits: ['selectItem'],
 setup (props, { emit }) {
    //const selectedItem = useVModel(props, 'modelValue')
    const selectedItem = ref({})
    const {
      items,
      isItemsLoading,
      searchQueryString,
      fetchItems,
      debouncedFetchItems,
    } = useSearch(props.entityType)

    const selectItem = (item) => {
      selectedItem.value = item
      //searchQueryString.value = ''
      items.value = []
      emit('selectItem', item)
    }

    return {
      selectedItem,

      items,
      isItemsLoading,
      searchQueryString,
      fetchItems,
      debouncedFetchItems,
      selectItem
    }
  }
}
</script>

<style scoped>

</style>
