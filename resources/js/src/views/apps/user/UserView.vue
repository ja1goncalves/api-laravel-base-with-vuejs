<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-view">

    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'page-user-list'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <div id="user-data" v-if="user_data">

      <vx-card title="Usuário" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
<!--          <div class="vx-col" id="avatar-col">-->
<!--            <div class="img-container mb-4">-->
<!--              <img :src="user_data.avatar" class="rounded w-full" />-->
<!--            </div>-->
<!--          </div>-->

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Nome</td>
                <td>{{ user_data.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">E-mail</td>
                <td>{{ user_data.email }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Status</td>
                <td>{{ user_data.status }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Grupo</td>
                <td>{{ user_data.role ? this.getName(user_data.role) : 'ADMIN' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Empresa</td>
                <td>{{ user_data.company ? user_data.company : 'VMZ' }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'app-user-edit', params: { userId: $route.params.userId }}">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
          </div>

        </div>

      </vx-card>

      <div class="vx-row">
        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Dt. de nascimento</td>
                <td>{{ user_data.dob ? user_data.dob : '04/06/08' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Celular</td>
                <td>{{ user_data.mobile ? user_data.mobile : '(81) 9.9898-8989' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Website</td>
                <td>{{ user_data.website ? user_data.website : 'www.vamoz.com.br' }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Sexo</td>
                <td>{{ user_data.gender ? user_data.gender : 'CIS' }}</td>
              </tr>
            </table>
          </vx-card>
        </div>

<!--        <div class="vx-col lg:w-1/2 w-full">-->
<!--          <vx-card title="Social Links" class="mb-base">-->
<!--            <table>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Twitter</td>-->
<!--                <td>{{ user_data.social_links.twitter }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Facebook</td>-->
<!--                <td>{{ user_data.social_links.facebook }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Instagram</td>-->
<!--                <td>{{ user_data.social_links.instagram }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Github</td>-->
<!--                <td>{{ user_data.social_links.github }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td class="font-semibold">CodePen</td>-->
<!--                <td>{{ user_data.social_links.codepen }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Slack</td>-->
<!--                <td>{{ user_data.social_links.slack }}</td>-->
<!--              </tr>-->
<!--            </table>-->
<!--          </vx-card>-->
<!--        </div>-->
      </div>

      <!-- Permissions -->
      <vx-card>

        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="flex items-end px-3">
              <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
              <span class="font-medium text-lg leading-none">Permissões</span>
            </div>
            <vs-divider />
          </div>
        </div>

        <div class="block overflow-x-auto">
          <table class="w-full permissions-table">
            <tr>
              <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in ['', 'Módulo', 'Inicio', 'Ler', 'Adicionar', 'Atualizar', 'Remover']" :key="heading">{{ heading }}</th>
            </tr>

            <tr v-for="{ name, user_module } in user_data.modules" :key="name" disabled="true">
              <td class="px-3 py-2">
                  <vs-checkbox v-model="user_module.auth" class="pointer-events-none" />
              </td>
              <td class="px-3 py-2">{{ name }}</td>
              <td v-for="{ auth, name } in user_module.actions" class="px-3 py-2" :key="name+auth">
                <vs-checkbox v-model="auth" class="pointer-events-none" />
              </td>
            </tr>
          </table>
        </div>

      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

export default {
  data () {
    return {
      user_data: null,
      user_not_found: false
    }
  },
  computed: {
    userAddress () {
      let str = ''
      for (const field in this.user_data.location) {
        str += `${field  } `
      }
      return str
    }
  },
  methods: {
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.user_data.name}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({name:'app-user-list'})
      const userId = this.$route.params.userId
      this.$store.dispatch('userManagement/delete', userId)
          .then(res => { this.showDeleteSuccess() })
          .catch(err => {
              this.$vs.notify({
                  color: 'error',
                  title: 'Usuário não removido',
                  text: 'O usuário selecionado não pode ser removido'
              })
          })

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.user_data.id)
      //   .then(()   => { this.$router.push({name:'app-user-list'}); this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    },
    getName(value) {
        if (value === 'admin') return 'Administração'
        else if (value === 'editor') return 'Editor'
        else if (value === 'public') return 'Público'
        else return '--'
    }
  },
  created () {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }

    const userId = this.$route.params.userId
    this.$store.dispatch('userManagement/fetchUser', userId)
      .then(res => { this.user_data = res.data.data })
      .catch(err => {
        if (err.response.status === 404) {
          this.user_not_found = true
          return
        }
        console.error(err)
      })
  }
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>
