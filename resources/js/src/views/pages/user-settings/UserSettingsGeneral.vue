<template>
  <vx-card no-shadow>

    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="activeUserInfo.photoURL" size="70px" class="mr-4 mb-4" />
      <div>
        <vs-button class="mr-4 sm:mb-0 mb-2" disabled="">Upload photo</vs-button>
        <vs-button type="border" color="danger" disabled="">Remove</vs-button>
        <p class="text-sm mt-2">Allowed JPG, GIF or PNG. Max size of 800kB</p>
      </div>
    </div>

    <!-- Info -->
    <vs-input class="w-full mb-base mt-4" label-placeholder="Username" v-model="username" disabled=""></vs-input>
    <vs-input class="w-full mb-base mt-4" label-placeholder="Name" v-model="name" v-validate="'required|min:5|alpha_spaces'" name="name" />
    <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

    <vs-input class="w-full mt-4" label-placeholder="Email" v-model="email" v-validate="'required|email'" name="email" />
    <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

<!--    <vs-alert icon-pack="feather" icon="icon-info" class="h-full my-4" color="warning">-->
<!--      <span>Your account is not verified. <a href="#" class="hover:underline">Resend Confirmation</a></span>-->
<!--    </vs-alert>-->

    <vs-input class="w-full my-base" label-placeholder="Company" v-model="company"></vs-input>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Salvar</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
import moduleUserManagement from "../../../store/user-management/moduleUserManagement";

export default {
  data () {
    return {
      id: this.$store.state.AppActiveUser.id,
      username: this.$store.state.AppActiveUser.email.split('@')[0],
      name: this.$store.state.AppActiveUser.name,
      email: this.$store.state.AppActiveUser.email,
      company: 'Vamoz | Safari Studio'
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
                  id: this.id,
                  name: this.name,
                  email: this.email,
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
