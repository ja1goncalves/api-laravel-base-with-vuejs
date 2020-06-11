<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="page-module-edit">

        <vs-alert color="danger" title="Module Not Found" :active.sync="module_not_found">
            <span>User record with id: {{ $route.params.moduleId }} not found. </span>
            <span>
                <span>Check </span><router-link :to="{name:'page-module-list'}" class="text-inherit underline">All modules</router-link>
            </span>
        </vs-alert>
        <vx-card v-if="module_data" title="Módulo" class="mb-base">
            <div slot="footer" class="px-6">
                <!-- Content Row -->
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full mt-4" label="Nome" v-model="module_data.name" v-validate="'required|min:8|alpha_spaces'" name="name" />
                        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

                        <vs-input class="w-full mt-4" label="Rota" v-model="module_data.route" type="text" v-validate="'required'" name="route" />
                        <span class="text-danger text-sm"  v-show="errors.has('route')">{{ errors.first('route') }}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <div class="mt-4">
                            <label class="vs-input--label">Status</label>
                            <v-select v-model="module_data.status" :clearable="false" :options="statusOptions" v-validate="'required'" name="status" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                            <span class="text-danger text-sm"  v-show="errors.has('status')">{{ errors.first('status') }}</span>
                        </div>

                        <div class="mt-4">
                            <vs-input class="w-full mt-4" label="Ícone" v-model="module_data.icon" type="text" v-validate="'required|alpha_spaces'" name="icon" />
                            <span class="text-danger text-sm"  v-show="errors.has('icon')">{{ errors.first('icon') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </vx-card>

        <!-- Save & Reset Button -->
        <div class="vx-col w-full">
            <div class="mt-8 flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Salvar</vs-button>
                <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Resetar</vs-button>
            </div>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select'
    import moduleUserManagement from "../../../store/user-management/moduleUserManagement";

    export default {
        components: {
            vSelect
        },
        data () {
            return {
                module_data: null,
                module: null,
                module_not_found: false,
                statusOptions: [
                    { label: 'Ativo',  value: 1 },
                    { label: 'Inativo',  value: 0 }
                ],
            }
        },
        created () {
            this.$store.dispatch('modulesManagement/fetchModule', this.$route.params.moduleId)
                .then(res => {
                    this.module_data = this.module = res.data.data
                    this.module_data.status = this.getNameStatus(this.module_data.status)
                    this.module_data.route = this.module_data.route === "--" ? '' : this.module_data.route
                }).catch(err => {
                if (err.response.status === 404) {
                    this.module_not_found = true
                    return
                }
                console.error(err)
            })
        },
        methods: {
            getNameStatus (value) {
                return value ? 'Ativo' : 'Inativo'
            },
            capitalize (str) {
                return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
            },
            save_changes () {
                if (!this.validateForm) return

                const payload = {
                    id: this.module_data.id,
                    name: this.module_data.name,
                    route: this.module_data.route,
                    status: this.module_data.status.value,
                    icon: this.module_data.icon,
                }

                if (payload.status === undefined) delete payload.status
                if (payload.route === "") payload.route = null

                this.$store.dispatch('modulesManagement/update', payload)
                    .then(response => {
                        this.$vs.notify({
                            title: 'Modulo atualizado',
                            text: `Modulo '${response.data.data.name}' foi atualizado com sucesso`,
                            iconPack: 'feather',
                            icon: 'icon-success-circle',
                            color: 'success'
                        })
                    }).catch(error => {
                    this.$vs.notify({
                        title: 'Modulo não atualizado',
                        text: error.message,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger',
                    })
                })
            },
            reset_data () {
                this.module_data = JSON.parse(JSON.stringify(this.module))
            },
        },
        computed: {
            status_local: {
                get () {
                    return { label: this.capitalize(this.module_data.status),  value: this.module_data.status  }
                },
                set (obj) {
                    this.module_data.status = obj.value
                }
            },
            validateForm () {
                return !this.errors.any()
            }
        },
    }

</script>
