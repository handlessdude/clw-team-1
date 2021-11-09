<template>
  <form @submit.prevent="onSubmit" class="flex-form">
    <pre>{{canSubmit}}</pre>
    <pre class="my-pre">{{tdForm}}</pre>

    <div>
      <span>Тип мероприятия: {{ tdForm.type.value==='course'? "Курс" : "Мероприятие" }}</span>
      <select v-model="tdForm.type.value">
        <option disabled value="">Выберите тип детали</option>
        <option>course</option>
        <option>event</option>
      </select>
    </div>

    <div>
      <label>Название:</label>
      <my-input
          v-focus
          v-model.trim="tdForm.entityName.value"
          type="text"
          placeholder="Введите название..."
      />
    </div>

<!--    <div>
      <label>Дата начала</label>
      <datepicker v-model="start"
                  :locale="dateLocale"
                  inputFormat="dd.MM.yyyy"
                  placeholder="Выберите дату..."/>
    </div>-->

    <div>
      <label>Продолжительность:</label>
<!--      <input v-model.number="td.entityDurationNum" type="number" />-->
      <my-input
          v-focus
          v-model.trim="tdForm.entityDuration.value"
          type="text"
          placeholder="Введите название..."
      />
    </div>

<!--    <div>
      <label>Место проведения:</label>
      <my-input
          v-focus
          v-model.trim="td.entityName"
          type="text"
          placeholder="Введите название..."
      />
    </div>-->

    <div class="my-checkbox">
      <input type="checkbox" id="checkbox" v-model="tdForm.required.value">
      <span>прохождение пользователями данного элемента будет невозможно до завершения предшествующего элемента</span>
    </div>

    <my-button
        type="submit"
        style="align-self: flex-end; margin-top: 15px"
        :disabled="!(canSubmit)"
    >
      Подтвердить
    </my-button>

  </form>
</template>

<script>
import { useVModel } from "@/hooks/useVModel"

export default {
  name: "track-detail-form",
  props: ['modelValue',
          'canSubmit',
          'onSubmit'],

  setup (props) {

    /*const {
      tdForm,
      tdSubmit,
      tdSubmitted,
      tdError
    } = useTrackDetailForm()

    const createTrackDetail = () => {
      emit('create', {
        "type": tdForm.value.type.value,
        "entityId": 0,
        "sortIndex": 0,
        "required": tdForm.value.required.value
      })

      tdForm.value.type.value = ""
      tdForm.value.entityName.value = ""
      tdForm.value.entityDuration.value = ""
      tdForm.value.required.value = false
    }

    return {
      tdForm,
      tdSubmit,
      tdSubmitted,
      tdError,
      createTrackDetail
    }*/

    return {
      tdForm: useVModel(props, 'modelValue'),
    }
  }
}
</script>

<style>
.my-pre {
  min-width: 400px;
}
.disabled {
  color: black;
}
</style>
