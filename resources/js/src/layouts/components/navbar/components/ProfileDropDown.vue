<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.name">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.name }}</p>
      <small>Available</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img v-if="activeUserInfo.photoURL" key="onlineImg" :src="activeUserInfo.photoURL" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/profile').catch(() => {})">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/email').catch(() => {})">
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Inbox</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/user-settings').catch(() => {})">
            <feather-icon icon="SettingsIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Configurações</span>
          </li>

<!--          <li-->
<!--            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
<!--            @click="$router.push('/apps/chat').catch(() => {})">-->
<!--            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />-->
<!--            <span class="ml-2">Chat</span>-->
<!--          </li>-->

<!--          <li-->
<!--            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
<!--            @click="$router.push('/apps/eCommerce/wish-list').catch(() => {})">-->
<!--            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />-->
<!--            <span class="ml-2">Wish List</span>-->
<!--          </li>-->

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {

    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    logout () {

      // if user is logged in via auth0
      // if (this.$auth.profile) this.$auth.logOut()

      // if user is logged in via firebase
      // const firebaseCurrentUser = firebase.auth().currentUser

      // if (firebaseCurrentUser) {
      //   firebase.auth().signOut().then(() => {
      //     this.$router.push('/pages/login').catch(() => {})
      //   })
      // }

      // If Passport login
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$store.dispatch('auth/logOutPassport')
          .then(() => { this.$vs.loading.close() })
          .catch(error => {
              this.$vs.loading.close()
              this.$vs.notify({
                  title: 'Error',
                  text: error.message,
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger'
              })
          })
      }

      // Change role on logout. Same value as initialRole of acj.js
      this.$acl.change('admin')
      localStorage.removeItem('userInfo')

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/pages/login').catch(() => {})
    }
  }
}
</script>
