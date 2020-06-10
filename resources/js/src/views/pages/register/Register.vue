<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col w-full sm:m-0">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/3 mx-auto self-center">
                            <img src="@assets/images/pages/register.jpg" alt="register" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-2/3 mx-auto self-center  d-theme-dark-bg">
                            <div class="px-8 pt-8 register-tabs-container">
                                <div class="vx-card__title mb-4">
                                    <h4 class="mb-4">Criar nova conta</h4>
                                </div>
<!--                                <vs-tabs>-->
<!--                                  <vs-tab label="JWT">-->
                                    <register-passport></register-passport>
<!--                                  </vs-tab>-->

<!--                                  <vs-tab label="Firebase">-->
<!--                                    <register-firebase></register-firebase>-->
<!--                                  </vs-tab>-->

<!--                                  <vs-tab label="Auth0">-->
<!--                                    <register-auth0></register-auth0>-->
<!--                                  </vs-tab>-->
<!--                                </vs-tabs>-->
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import RegisterPassport from './RegisterPassport.vue'
// import RegisterFirebase from './RegisterFirebase.vue'
// import RegisterAuth0 from './RegisterAuth0.vue'

export default {
  components: {
      RegisterPassport,
    // RegisterFirebase,
    // RegisterAuth0
  }
}
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 550px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
