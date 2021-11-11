import { ref, watch } from 'vue'
import SearchApi from "@/api/Search"
import useDebouncedRef from '@/hooks/useDebouncedRef'

export function useSearch(entityType) {
    const items = ref([])
    const isItemsLoading = ref(true)
    const searchQueryString = useDebouncedRef('', 400)

    const fetchItems = async (query) => {
        try {
            if(!query)
            {
                items.value = []
                return
            }
            isItemsLoading.value = true
            const response = await SearchApi.search(entityType, query)
            items.value = response.data
            console.log(items)
        } catch (e) {
            alert(e)
        } finally {
            isItemsLoading.value = false
        }
    }

    watch(searchQueryString, fetchItems)

    return {
        items,
        isItemsLoading,
        searchQueryString,
        fetchItems,
        /*debouncedFetchItems,*/
    }
}
