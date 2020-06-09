<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-2 hover:text-primary cursor-pointer" @click="openModalEdit()" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord()" />

      <vs-popup class="popup-add-category" title="Editar Categoria" name="modal" :active.sync="showModal" @close="showModal = false">
        <vs-input class="input-group"
                  v-validate="'required|min:1|max:50|alpha_spaces'"
                  id="editCategory"
                  name="editCategory"
                  v-model="editCategory"/>
        <span class="text-danger text-sm">{{ errors.first('editCategory') }}</span>
        <vs-button @click="saveCategory()" color="success" type="filled" :disabled="!validateForm">Salvar</vs-button>
      </vs-popup>
    </div>

</template>
<script>
export default {
  name: 'CellRendererActions',
  data () {
    return {
        showModal: false,
        editCategory: ''
    }
  },
  methods: {
    openModalEdit () {
        this.showModal = true
        this.editCategory = this.params.data.name
    },
    saveCategory () {
        this.$store.dispatch('categories/update', {id: this.params.data.id, name: this.editCategory})
            .then(response => {
                this.$vs.notify({
                    title: 'Categoria salva',
                    text: `Categoria "${response.data.data.name}" foi editada com sucesso`,
                    iconPack: 'feather',
                    icon: 'icon-success-circle',
                    color: 'success'
                })
            }).catch(error => {
            this.$vs.notify({
                title: 'Categoria não editada',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            })
        })
    },
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar Remoção',
        text: `Você tem certeza que quer deletar a categoria "${this.params.data.name}"?`,
        accept: this.deleteRecord,
        acceptText: 'Remover'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({name:'app-categories-list'})
      this.$store.dispatch('categories/delete', this.params.data.id)
          .then(res => { this.showDeleteSuccess() })
          .catch(err => {
              this.$vs.notify({
                  color: 'error',
                  title: 'Categoria não removida',
                  text: 'A categoria selecionado não pode ser removido'
              })
          })

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
      //   .then(()   => { this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'Categoria deletelada',
        text: 'A categoria selecionada foi removida'
      })
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.newCategory !== ''
    }
  }
}
</script>
