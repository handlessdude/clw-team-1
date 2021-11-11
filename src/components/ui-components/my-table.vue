<template>
    <div class="searchstudent__table">
      <h3>{{tableName}}</h3>
      <div class="searchstudent__table_item tableheader">
        <div class="searchstudent__table_rawitem">ФИО</div>
        <div class="searchstudent__table_rawitem">Департамент</div>
        <div class="searchstudent__table_rawitem">Предприятие</div>
        <div class="searchstudent__table_rawitem" v-if="tableName === 'Результаты Поиска'">Выбрать</div>
        <div class="searchstudent__table_rawitem" v-else>Трэк</div>
        <div class="searchstudent__table_rawitem"> Уже Назначен</div>


      </div>
      <div
        class="searchstudent__table_item"
        v-for="(item, index) in actualArray"
        :key="index"
      >
        <div class="searchstudent__table_rawitem">{{ item.fullName }}</div>
        <div class="searchstudent__table_rawitem">
          {{ item.data.department }}
        </div>
        <div class="searchstudent__table_rawitem">{{ item.data.company }}</div>
        <div class="searchstudent__table_rawitem" v-if="tableName === 'Результаты Поиска'">
          <input type="checkbox" :value="item" v-model="checkedStudents" />
        </div>
        <div class="searchstudent__table_rawitem" v-else>{{ this.$route.params.id  }}</div>
        <div class="searchstudent__table_rawitem" >{{ item.assign  }}</div>


      </div>
    </div>
</template>

<script>
export default {
  name: "my-table",
  props: {
    tableName: [String, Number],
    actualArray: [Object, Array] 
  },
  data() {
      return {
          checkedStudents: [],
      }
  },
  watch: {
      checkedStudents: function() {
          this.$emit('updChecked', this.checkedStudents)
      }
  },
}
</script>

<style lang="sass" scoped>
.searchstudent__table
        align-self: center
        margin: 24px
        border: 1px solid #000
        width: 1024px
        min-height: 100px
        &_item
            display: grid
            grid-template-columns: 2fr 2fr 3fr 1fr 1fr
            min-height: 40px
            max-height: 60px
            margin: 6px
            box-sizing: border-box
            overflow: scroll
        &_rawitem
            display: flex
            justify-content: center
            align-items: center
            border: 1px solid green
.tableheader
    border: 2px solid #000     
    font-weight: 600   

</style>