<template>
  <my-modal
    class="modalWindow"
    :class="{ activeModal: activeModalWindow }"
    :mainText="'Succeful!'"
    :infoText="modalMes"
  />
  <div class="addstudent">
    <div class="addstudent__searchform">
      <div class="addstudent__searchform_filter">
        <select
          class="addstudent__searchform_input"
          v-model="depart"
          @change="getReqCompany"
        >
          <option value="">Выберите департамент</option>
          <option v-for="(item, index) in departments" :key="index">
            {{ item }}
          </option>
        </select>
        <select class="addstudent__searchform_input" v-model="company">
          <option value="">Выберите компанию</option>
          <option v-for="(item, index) in companies" :key="index">
            {{ item }}
          </option>
        </select>
        <my-button @click="cleanFilter">Сбросить Фильтр</my-button>
      </div>
      <div class="addstudent__searchform_search">
        <input
          class="addstudent__searchform_input"
          type="text"
          v-model="stuName"
        />
        <my-button @click="searchUser">ПОИСК</my-button>
      </div>
    </div>
    <my-table
      @updChecked="updChecked"
      :actualArray="filteredList"
      :tableName="'Результаты Поиска'"
    />
    <my-table
      :actualArray="checkedStudents"
      :tableName="'Будут Записаны / Удалены'"
    />
    <div>
      <my-button @click="addStudentOnTrack">Записать на трек</my-button>
      <my-button @click="delStudentOnTrack">Удалить с трека</my-button>
      <!-- Не успел доделать логику обновления второй таблицы, Если забыть снять галочку 
      и заного вызвать поиск, То элемент с неснятой галочкой остается во 2 таблице навсегда))
      ,до перезагрузки -->

      <my-button
        class="backbtn"
        @click="this.$router.push({ path: `/tracks/${$route.params.id}` })"
        >Назад</my-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import searchApi from "@/api/SearchUser";
import MyButton from "../components/ui-components/my-button.vue";
import MyTable from "../components/ui-components/my-table.vue";
import MyModal from "../components/ui-components/my-modal.vue";

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
      modalMes: "",
      assigned: [],
    };
  },
  components: {
    MyButton,
    MyTable,
    MyModal,
  },
  created() {
    searchApi.getReq(`${this.$store.state.getDep}`).then((data) => {
      this.departments = data.data.data;
    });
    this.getAssign();
  },

  computed: {
    ...mapState(["activeModalWindow"]),
  },
  methods: {
    ...mapMutations(["setModalWindow"]),
    updChecked(upd) {
      this.checkedStudents = upd;
    },
    searchUser() {
      this.filteredList = [];
      this.checkedStudents = [];

      this.getAssign();
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
            data.data.forEach((el) => {
              this.assigned.forEach((elem) => {
                if (el.id == elem.data.userId) {
                  el.assign = true;
                  el.itemId = elem.id;
                }
              });
              this.filteredList.push(el);
            });
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

    // Отрефакторить Эти 2 метода(Сделать 1)
    addStudentOnTrack() {
      let data = [];
      let currentUrl = `${this.$store.state.trackUrl}/${this.$route.params.id}/trackAssigns`;
      this.checkedStudents.forEach((el) => {
        data.push({ userId: el.id });
      });
      if (data.length > 0) {
        searchApi.postReq(currentUrl, data).then((data) => {
          this.modalMes = data.data.message;
        });
      }
      if (this.checkedStudents.length > 0) {
        this.$store.commit("setModalWindow", true);
      }
      this.checkedStudents = [];
    },
    delStudentOnTrack() {
      let data = [];
      let currentUrl = `${this.$store.state.trackUrl}/${this.$route.params.id}/trackAssigns`;
      this.checkedStudents.forEach((el) => {
        data.push(el.itemId);
      });
      if (data.length > 0) {
        searchApi.delete(currentUrl, data).then((data) => {
          this.modalMes = data.data.message;
        });
      }
      if (this.checkedStudents.length > 0) {
        this.$store.commit("setModalWindow", true);
      }
      this.checkedStudents = [];
    },
    getAssign() {
      searchApi
        .getReq(
          `${this.$store.state.trackUrl}/${this.$route.params.id}/trackAssigns`
        )
        .then((data) => {
          this.assigned = data.data.data;
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.backbtn
    margin: 8px
.addstudent
    display: flex
    flex-direction: column
    align-items: center
    &__searchform
        width: 1024px
        display: flex
        flex-direction: column
        align-items: flex-start
        &_input
            width: 400px
            height: 40px
            padding-left: 12px
            padding-right: 12px
            border-radius: 50px
            outline: none
            border: 1px solid #000
            margin: 16px 8px
.modalWindow
    display: none
.activeModal
  display: block
</style>
