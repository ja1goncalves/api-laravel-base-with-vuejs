<!-- =========================================================================================
File Name: RegisterPassport.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|min:5|alpha_spaces'"
      data-vv-validate-on="blur"
      label="Nome"
      name="name"
      icon-pack="feather" icon="icon-user"
      v-model="name"
      class="w-full" />
    <span class="text-danger text-sm">{{ errors.first('name') }}</span>

    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      label="E-mail"
      icon-pack="feather" icon="icon-mail"
      v-model="email"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
      ref="password"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:8'"
      name="password"
      label="Senha"
      icon-pack="feather" icon="icon-lock"
      v-model="password"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <vs-input
      type="password"
      v-validate="'min:8|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="password_confirmation"
      label="Confirmar Senha"
      icon-pack="feather" icon="icon-check"
      v-model="password_confirmation"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('password_confirmation') }}</span>

    <div class="mt-4">
        <label class="vs-input--label">Grupo de permissão</label>
        <v-select
            v-model="role"
            :clearable="false"
            :options="roleOptions"
            v-validate="'required'"
            name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
    </div>

    <vs-checkbox v-model="status" class="mt-6">Ativo</vs-checkbox>
    <vs-button class="float-right" @click="registerUser" :disabled="!validateForm">Adicionar</vs-button>
  </div>
</template>

<script>
import moduleUserManagement from "../../../store/user-management/moduleUserManagement";
import vSelect from 'vue-select'

export default {
  components: {
      vSelect
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      status: true,
      role: 'Público',
      roleOptions: [
          { label: 'Administrador',  value: 'admin' },
          { label: 'Editor',  value: 'editor' },
          { label: 'Público',  value: 'public' }
      ]
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.name !== '' && this.email !== '' && this.password !== '' && this.password_confirmation !== '' && this.role !== ''
    }
  },
  methods: {
    checkLogin () {
      // If user is already logged in notify
      if (!this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    registerUser () {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return

      const payload = {
        userDetails: {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          status: this.status,
          role: this.role.value
        },
        notify: this.$vs.notify
      }
      if (!moduleUserManagement.isRegistered) {
          this.$store.registerModule('userManagement', moduleUserManagement)
          moduleUserManagement.isRegistered = true
      }
      this.$store.dispatch('userManagement/create', payload)
        .then(response => {
            this.$vs.notify({
                title: 'Usuário adicionado',
                text: `Usuário ${response.data.data.name} foi adicionado com sucesso`,
                iconPack: 'feather',
                icon: 'icon-success-circle',
                color: 'success'
            })
        }).catch(error => {
          this.$vs.notify({
              title: 'Usuário não adicionado',
              text: error.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
          })
      })
    }
  }
}
</script>
