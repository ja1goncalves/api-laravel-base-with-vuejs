<!-- =========================================================================================
  File Name: CategoriesList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

    <div id="page-user-list">

        <div class="vx-card p-6">

            <div class="flex flex-wrap items-center">

                <!-- ITEMS PER PAGE -->
                <div class="flex-grow">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ modulesData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : modulesData.length }} of {{ modulesData.length }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>
                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu>

                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                                <span>10</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                                <span>20</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                                <span>25</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                                <span>30</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>

                <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
                <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />
                <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

                <vs-button
                    disabled
                    color="primary"
                    icon-pack="feather"
                    icon="icon-user-plus"
                    type="filled"
                    title="Adição de módulo suspenso"
                    @click="showModal = true">  Adicionar Módulo
                </vs-button>

            </div>


            <!-- AgGrid Table -->
            <ag-grid-vue
                ref="agGridTable"
                :components="components"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="modulesData"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                :floatingFilter="true"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true"
                :enableRtl="$vs.rtl">
            </ag-grid-vue>

            <vs-pagination
                :total="totalPages"
                :max="7"
                v-model="currentPage" />

        </div>
    </div>

</template>

<script>
    import { AgGridVue } from 'ag-grid-vue'
    import '@sass/vuexy/extraComponents/agGridStyleOverride.scss'
    import vSelect from 'vue-select'

    import CellRendererStatus from "./cell-renderer/CellRendererStatus";
    import CellRendererActions from "./cell-renderer/CellRendererActions";

    export default {
        components: {
            AgGridVue,
            vSelect,
            CellRendererStatus,
            CellRendererActions
        },
        data () {
            return {
                searchQuery: '',
                showModal: false,
                newCategory: '',

                // AgGrid
                gridApi: null,
                gridOptions: {},
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'ID',
                        field: 'id',
                        width: 115,
                        filter: true,
                        checkboxSelection: true,
                        headerCheckboxSelectionFilteredOnly: true,
                        headerCheckboxSelection: true
                    },
                    {
                        headerName: 'Nome',
                        field: 'name',
                        filter: true,
                        width: 250
                    },
                    {
                        headerName: 'Rota',
                        field: 'route',
                        filter: true,
                        width: 200,
                        nullable: '--'
                    },
                    {
                        headerName: 'Status',
                        field: 'status',
                        filter: true,
                        width: 150,
                        cellRendererFramework: 'CellRendererStatus'
                    },
                    {
                        headerName: 'Ícone',
                        field: 'icon',
                        filter: true,
                        width: 150,
                    },
                    {
                        headerName: 'Ações',
                        field: 'transactions',
                        width: 120,
                        cellRendererFramework: 'CellRendererActions'
                    }
                ],
                // Cell Renderer Components
                components: {
                    CellRendererStatus,
                    CellRendererActions
                }
            }
        },
        computed: {
            modulesData () {
                return this.$store.state.modulesManagement.modules
            },
            paginationPageSize () {
                if (this.gridApi) return this.gridApi.paginationGetPageSize()
                else return 10
            },
            totalPages () {
                if (this.gridApi) return this.gridApi.paginationGetTotalPages()
                else return 0
            },
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.gridApi.paginationGoToPage(val - 1)
                }
            }
        },
        methods: {
            updateSearchQuery (val) {
                this.gridApi.setQuickFilter(val)
            }
        },
        mounted () {
            this.gridApi = this.gridOptions.api

            /* =================================================================
              NOTE:
              Header is not aligned properly in RTL version of agGrid table.
              However, we given fix to this issue. If you want more robust solution please contact them at gitHub
            ================================================================= */
            if (this.$vs.rtl) {
                const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
                header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
            }
        },
        created () {
            this.$store.dispatch('modulesManagement/allModules').catch(err => { console.error(err) })
        }
    }

</script>

<style lang="scss">
    #page-user-list {
        .user-list-filters {
            .vs__actions {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-58%);
            }
        }
    }
    .popup-add-category {
        .vs-input {
            width: 100%;
        }
        .vs-button {
            float: right;
            margin-top: 5px;
        }
    }
</style>
