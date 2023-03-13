<template>
  <div class="container">
    <el-form
    :model="form"
    :rules="rules"
    @submit.prevent="submitForm"
  >
    <el-form-item prop="name">
      <el-input v-model="form.name" :disabled="isDataLoading" type="text" placeholder="Name" :change="validateName()" clearable/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">
        OK
      </el-button>
      <el-button @click="nextDay()">Go to next day</el-button>
    </el-form-item>
  </el-form>
  <div class="winner-list" v-if="this.$store.state.todayWinnerList.length">
    <h3>
      Winner list:
    </h3>
    <ul>
      <li v-for="name in this.$store.state.todayWinnerList" :key="name">
        {{name}}
      </li>
    </ul>
  </div>
  <name-search-response :nameMember="form.name" :action="action" @win="validateMember"></name-search-response>
  </div>
</template>

<script>
import NameSearchResponse from '@/components/NameSearchResponse.vue'
import { getAll } from '@/api/peopleApi'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'NameSearcher',

  components: {
    NameSearchResponse,
  },

  data() {
    return {
      isDataLoading: false,
      peopleArray: [],
      nameMember: '',
      action: null,
      form: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please write your name', trigger: 'blur' },
          { min: 2, max: 20, message: 'Length should be 2 to 20', trigger: 'blur' },
        ]
      }
    }
  },

  created() {
    this.getNames();
  },

  methods: {

    submitForm() {
      const store = this.$store.state
      if (this.form.name.length >= 2 && this.form.name.length <= 20) {
        if (!store.todayWinnerList.includes(this.form.name)) {
          if(store.todayWinnerList.length < store.maxWinners) {
            this.findName(this.form.name) ? this.action = 'win' : this.action = 'lose'
          } else {
            ElMessage({
              title: 'Error',
              message: `Choose next day, 10 luckiest name had already received their prize today`,
              type: 'error',
            })
          }
        } else {
          ElMessage({
            title: 'Warning',
            message: `I'm sorry, ${this.form.name} has already received their prize today!`,
            type: 'warning',
          })
        }
      }
    },

    nextDay() {
      ElMessageBox.confirm(
        "By clicking this you can't go back",
        "Are you sure?",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }
      )
        .then(() => {
          localStorage.removeItem('winnersArray')
          this.$router.go(0);
        })
        .catch(() => {

        })
    },

    getNames() {
      getAll().then(value => {
        this.peopleArray = value;
      }, reason => {

      });
      if (localStorage.getItem('winnersArray')) {
        this.$store.dispatch('setWinnerList', localStorage.getItem('winnersArray').split(','))
      }
    },

    validateName() {
      this.form.name = this.form.name.replace(/[^a-zа-яё]/gi, '');
      this.form.name = this.form.name.charAt(0).toUpperCase() + this.form.name.slice(1);
    },

    findName(luckyName) {
      return this.peopleArray.find(({ name }) => name == luckyName);
    },

    validateMember(value) {
      this.action = null
      if (value) {
        this.$store.commit('addWinner', this.form.name)
        localStorage.setItem('winnersArray', this.$store.state.todayWinnerList)
        this.form.name = ''
      }
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 50%;
}
</style>
