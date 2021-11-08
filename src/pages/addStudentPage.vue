<template>
  <div class="addstudent">
    {{ this.$route.params.id }}
    <select v-model="depart" @change="getReqCompany">
      <option value="">Выберите департамент</option>
      <option v-for="(item, index) in departments" :key="index">
        {{ item }}
      </option>
    </select>
    <select v-model="company">
      <option value="">Выберите компанию</option>
      <option v-for="(item, index) in companies" :key="index">
        {{ item }}
      </option>
    </select>
    <input type="text" v-model="stuName" />
    <button @click="searchUser">ПОИСК</button>
    <button @click="cleanFilter">Сбросить Фильтр</button>

    <div class="searchstudent__table">
      <h3>Результаты Поиска</h3>
      <div class="searchstudent__table_item">
        <div class="searchstudent__table_rawitem">ФИО</div>
        <div class="searchstudent__table_rawitem">Департамент</div>
        <div class="searchstudent__table_rawitem">Предприятие</div>
        <div class="searchstudent__table_rawitem">Выбрать</div>
      </div>
      <div
        class="searchstudent__table_item"
        v-for="(item, index) in filteredList"
        :key="index"
      >
        <div class="searchstudent__table_rawitem">{{ item.fullName }}</div>
        <div class="searchstudent__table_rawitem">
          {{ item.data.department }}
        </div>
        <div class="searchstudent__table_rawitem">{{ item.data.company }}</div>
        <div class="searchstudent__table_rawitem">
          <input type="checkbox" :value="item" v-model="checkedStudents" />
        </div>
      </div>
    </div>

    <div class="searchstudent__table">
      <h3>Будут Записаны</h3>
      <div class="searchstudent__table_item">
        <div class="searchstudent__table_rawitem">ФИО</div>
        <div class="searchstudent__table_rawitem">Департамент</div>
        <div class="searchstudent__table_rawitem">Предприятие</div>
        <div class="searchstudent__table_rawitem">Выбрать</div>
      </div>
      <div
        class="searchstudent__table_item"
        v-for="(item, index) in checkedStudents"
        :key="index"
      >
        <div class="searchstudent__table_rawitem">{{ item.fullName }}</div>
        <div class="searchstudent__table_rawitem">
          {{ item.data.department }}
        </div>
        <div class="searchstudent__table_rawitem">{{ item.data.company }}</div>
        <div class="searchstudent__table_rawitem">
          <input type="checkbox" :value="item" v-model="checkedStudents" />
        </div>
      </div>
      <button @click="addStudentOnTrack"> Записать на курс </button>
    </div>
  </div>
</template>

<script>
import searchApi from "@/api/SearchUser";
import { mapState } from "vuex";

export default {
  data() {
    return {
      depart: "",
      company: "",
      stuName: "",
      departments: [],
      companies: [],
      filteredList: [],
      checkedStudents: [],
    };
  },
  created() {
    searchApi.getReq(`${this.$store.state.getDep}`).then((data) => {
      this.departments = data.data.data;
    });
  },
  computed: {
    ...mapState(["getDep"]),
  },
  methods: {
    searchUser() {
      let req = "";
      if (this.stuName) {
        req += `q=${this.stuName}`;
      }
      if (this.depart) {
        if (!req) {
          req += `department=${this.depart}`;
        } else {
          req += `&department=${this.depart}`;
        }
      }
      if (this.company) {
        if (!req) {
          req += `company=${this.company}`;
        } else {
          req += `&company=${this.company}`;
        }
      }
      if (req) {
        searchApi
          .getReq(`${this.$store.state.searchUser}?${req}`)
          .then((data) => {
            this.filteredList = data.data;
          });
      }
    },
    cleanFilter() {
      this.depart = "";
      this.company = "";
      this.stuName = "";
      this.filteredList = [];
    },
    getReqCompany() {
      searchApi
        .getReq(`${this.$store.state.getComp}?department=${this.depart}`)
        .then((data) => {
          this.companies = data.data;
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.addstudent
    display: flex
    flex-direction: column
    align-items: flex-start

.searchstudent__table
        align-self: center
        margin: 24px
        border: 1px solid #000
        width: 1024px
        min-height: 100px
        &_item
            display: grid
            grid-template-columns: 2fr 2fr 3fr 1fr
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
            // margin: 2px
</style>
