<template>
  <div>
    <div>
      <form @submit.prevent="login">
        <h1>ログイン</h1>
        <div v-if="error.login.auth || error.login.email || error.login.password">
          <div v-for="message in error.login" v-bind:key="message.id">
            <p class="alert alert-danger" v-if="message">{{message}}</p>
          </div>
        </div>
        <p>メールアドレス: <input type="email" v-model="loginForm.email"></p>
        <p>パスワード: <input type="password" v-model="loginForm.password"></p>
        <button type="submit" class="btn btn-primary">ログイン</button>
      </form>
    </div>

    <hr class="mt-4 mb-4">

    <div>
      <h1>新規登録</h1>
      <form @submit.prevent="register">
        <div v-if="error.register.auth || error.register.name || error.register.email || error.register.password || error.register.confirmation">
          <div v-for="message in error.register" v-bind:key="message.id">
            <p class="alert alert-danger" v-if="message">{{message}}</p>
          </div>
        </div>
        <p>名前: <input type="text" v-model="registerForm.name"></p>
        <p>メールアドレス: <input type="text" v-model="registerForm.email"></p>
        <p>パスワード: <input type="password" v-model="registerForm.password"></p>
        <p>パスワード確認: <input type="password" v-model="registerForm.password_confirmation"></p>
        <button type="submit" class="btn btn-primary">新規登録</button>
      </form>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        confirmation: '',
      },
      error: {
        login: {
          auth: false,
          email: false,
          password: false,
        },
        register: {
          auth: false,
          name: false,
          email: false,
          password: false,
          password_confirmation: false,
          confirmation: false,
        }
      }
    }
  },

  mounted () {
    if (this.$store.getters['auth/check']) {
      this.$router.push('/user')
    }
  },

  methods: {
    errorReset () {
      Object.keys(this.error).forEach(key => {
        Object.keys(this.error[key]).forEach(val => {
          this.error[key][val] = false
        })
      })
    },

    register() {
      this.errorReset()
      if (this.registerForm.name && this.registerForm.email &&
        this.registerForm.password && this.registerForm.password_confirmation) {
          if (this.registerForm.password === this.registerForm.password_confirmation) {
            axios.post('api/register', this.registerForm)
              .then(res => {
                this.$store.dispatch('auth/setToken', res.data.access_token)
                this.$router.push('/user')
              })
              .catch(err => {
                this.error.register.auth = "登録に失敗しました。"
              })
          } else {
            this.error.register.confirmation = "パスワードが一致しません。"
          }
        } else {
          if (this.registerForm.name === '') {
            this.error.register.name = "名前を入力してください。"
          }
          if (this.registerForm.email === '') {
          this.error.register.email = "メールアドレスを入力してください。"
          }
          if (this.registerForm.password === '') {
            this.error.register.password = "パスワードを入力してください。"
          }
          if (this.registerForm.password_confirmation === '') {
            this.error.register.password_confirmation = "パスワード確認を入力してください。"
          }
        }
    },

    login() {
      this.errorReset()
      if (this.loginForm.email && this.loginForm.password) {
        const response = this.$store.dispatch('auth/login', this.loginForm)
        if (response.status === 401) {
          this.error.login.auth = "メールアドレスかパスワードが間違っています。"
        }
        this.$router.push('/user')
      } else {
        if (this.loginForm.email === '') {
          this.error.login.email = "メールアドレスを入力してください。"
        }
        if (this.loginForm.password === '') {
          this.error.login.password = "パスワードを入力してください。"
        }
      }
    }
  }
}
</script>
