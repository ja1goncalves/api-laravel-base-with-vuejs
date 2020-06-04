<template>
  <vx-card no-shadow>

    <vs-input class="w-full mb-base" type="password" name="old_password" label-placeholder="Senha antiga" v-model="old_password" />

    <vs-input ref="new_password" class="w-full mb-base" type="text" name="new_password" label-placeholder="Nova senha" v-model="new_password" v-validate="'required|min:8'"/>
      <span class="text-danger text-sm">{{ errors.first('password') }}</span>
    <vs-input class="w-full mb-base" type="text" name="confirm_new_password" label-placeholder="Confirmar nova senha" v-model="confirm_new_password" v-validate="'min:8|confirmed:new_password'" />
      <span class="text-danger text-sm">{{ errors.first('confirm_new_password') }}</span>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Salvar</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
import moduleUserManagement from "../../../store/user-management/moduleUserManagement";

export default {
  data () {
    return {
      old_password: '',
      confirm_old_password: '',
      new_password: '',
      confirm_new_password: ''
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    validateForm () {
        return !this.errors.any()
    }
  },
  methods: {
      save_changes () {
          const payload = {
              userDetails: {
                  id: this.$store.state.AppActiveUser.id,
                  name: this.$store.state.AppActiveUser.name,
                  email: this.$store.state.AppActiveUser.email,
                  password: this.new_password,
                  password_confirmation: this.confirm_new_password
              },
         }

          if (!moduleUserManagement.isRegistered) {
              this.$store.registerModule('userManagement', moduleUserManagement)
              moduleUserManagement.isRegistered = true
          }
          this.$store.dispatch('userManagement/update', payload)
              .then(response => {
                  this.data = response.data
                  this.$vs.notify({
                      title: 'Usuário atualizado',
                      text: `Usuário ${response.data.name} foi atualizado com sucesso`,
                      iconPack: 'feather',
                      icon: 'icon-success-circle',
                      color: 'success'
                  })
              }).catch(error => {
              this.$vs.notify({
                  title: 'Usuário não atualizado',
                  text: error.message,
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger',
              })
          })
      },
      reset_data () {
          return {
              username: this.$store.state.AppActiveUser.email.split('@')[0],
              name: this.$store.state.AppActiveUser.name,
              email: this.$store.state.AppActiveUser.email,
              company: 'Vamoz | Safari Studio'
          }
      }
  }
}
</script>
