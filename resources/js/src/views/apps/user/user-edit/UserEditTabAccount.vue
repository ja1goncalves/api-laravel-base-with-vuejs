<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">

    <!-- Avatar Row -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img :src="data.avatar" class="mr-8 rounded h-24 w-24" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ data.name  }}</p>
            <input type="file" class="hidden" ref="update_avatar_input" accept="image/*">

            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
            <vs-button class="mr-4 mb-4" disabled="">Mudar Avatar</vs-button>
            <!-- <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button> -->

            <vs-button type="border" color="danger" disabled="">Remover Avatar</vs-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="Nome" v-model="data_local.name" v-validate="'required|min:8|alpha_spaces'" name="name" />
        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input class="w-full mt-4" label="E-mail" v-model="data_local.email" type="email" v-validate="'required|email'" name="email" />
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">

        <div class="mt-4">
          <label class="vs-input--label">Status</label>
          <v-select v-model="data_local.status" :clearable="false" :options="statusOptions" v-validate="'required'" name="status" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          <span class="text-danger text-sm"  v-show="errors.has('status')">{{ errors.first('status') }}</span>
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Grupo de permissão</label>
          <v-select v-model="data_local.role" :clearable="false" :options="roleOptions" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
        </div>

<!--        <vs-input class="w-full mt-4" label="Company" v-model="data_local.company" v-validate="'alpha_spaces'" name="company" />-->
<!--        <span class="text-danger text-sm"  v-show="errors.has('company')">{{ errors.first('company') }}</span>-->

      </div>
    </div>

    <!-- Permissions -->
    <vx-card class="mt-base" no-shadow card-border>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">Permissões</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="block overflow-x-auto" v-if="this.user_logged.userRole === 'admin'">
        <table class="w-full">
          <tr>
            <!--
              You can also use `Object.keys(Object.values(data_local.permissions)[0])` this logic if you consider,
              our data structure. You just have to loop over above variable to get table headers.
              Below we made it simple. So, everyone can understand.
             -->
            <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in ['', 'Módulo', 'Inicio', 'Ler', 'Adicionar', 'Atualizar', 'Remover']" :key="heading">{{ heading }}</th>
          </tr>

          <tr v-for="{ name, user_module, id } in data_local.modules" :key="name">
            <td class="px-3 py-2" :key="'check-module-'+id">
                <vs-checkbox v-model="user_module.auth" @change="update_user_module(user_module.id)" />
            </td>
            <td class="px-3 py-2" :key="name+id">{{ name }}</td>
            <td v-for="{ auth, id } in user_module.actions" class="px-3 py-2">
              <vs-checkbox v-model="auth" @change="update_action(id)" :disabled="!user_module.auth" />
            </td>
          </tr>
        </table>
      </div>

    </vx-card>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Salvar</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import moduleUserManagement from "../../../../store/user-management/moduleUserManagement";

export default {
  components: {
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

      data_local: JSON.parse(JSON.stringify(this.data)),
      user_logged: this.$store.state.AppActiveUser,

      statusOptions: [
        { label: 'Ativo',  value: 1 },
        { label: 'Inativo',  value: 0 },
        { label: 'Bloqueado',  value: 2 },
        { label: 'Suspenso',  value: 3 }
      ],
      roleOptions: [
        { label: 'Administrador',  value: 'admin' },
        { label: 'Editor',  value: 'editor' },
        { label: 'Público',  value: 'public' }
      ]
    }
  },
  computed: {
    status_local: {
      get () {
        return { label: this.capitalize(this.data_local.status),  value: this.data_local.status  }
      },
      set (obj) {
        this.data_local.status = obj.value
      }
    },
    role_local: {
      get () {
        return { label: this.capitalize(this.data_local.role),  value: this.data_local.role  }
      },
      set (obj) {
        this.data_local.role = obj.value
      }
    },
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    capitalize (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return

        const payload = {
            userDetails: {
                id: this.data_local.id,
                name: this.data_local.name,
                email: this.data_local.email,
                status: this.data_local.status.value,
                role: this.data_local.role.value,
            },
            notify: this.$vs.notify
        }
        if (payload.userDetails.status === undefined) delete payload.userDetails.status

        if (!moduleUserManagement.isRegistered) {
            this.$store.registerModule('userManagement', moduleUserManagement)
            moduleUserManagement.isRegistered = true
        }
        this.$store.dispatch('userManagement/update', payload)
            .then(response => {
                this.$vs.notify({
                    title: 'Usuário atualizado',
                    text: `Usuário ${response.data.data.name} foi atualizado com sucesso`,
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
      this.data_local = JSON.parse(JSON.stringify(this.data))
    },
    update_action (actionId) {
        this.$store.dispatch('userManagement/updateAction', actionId).then(response => {
            this.$vs.notify({
                title: 'Usuário atualizado',
                text: response.data.data ? 'Ação liberada' : 'Ação bloqueada',
                iconPack: 'feather',
                icon: 'icon-success-circle',
                color: 'success',
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
    update_user_module (userModuleId) {
        this.$store.dispatch('userManagement/updateUserModule', userModuleId).then(response => {
            this.data_local.modules = response.data.data.modules;
        }).catch(error => {
            this.$vs.notify({
                title: 'Usuário não atualizado',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
            })
        })
    }
  }
}
</script>
