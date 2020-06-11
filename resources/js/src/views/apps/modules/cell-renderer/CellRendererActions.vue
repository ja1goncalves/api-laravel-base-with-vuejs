<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-2 hover:text-primary cursor-pointer" @click="editRecord()" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord()" />
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
    editRecord () {
      this.$router.push(`/apps/modules/module-edit/${this.params.data.id}`).catch(() => {})
    },
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar Remoção',
        text: `Você tem certeza que quer deletar o módulo "${this.params.data.name}"?`,
        accept: this.deleteRecord,
        acceptText: 'Remover'
      })
    },
    deleteRecord () {
      this.$router.push({name:'app-modules-list'})
      this.$store.dispatch('modulesManagement/delete', this.params.data.id)
        .then(res => {
          res.data.error ? this.showFailedDelete() : this.showDeleteSuccess()
        }).catch(err => {
            this.showFailedDelete()
        })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'Módulo deletelado',
        text: 'O módulo selecionado foi removida'
      })
    },
    showFailedDelete () {
      this.$vs.notify({
        color: 'error',
        title: 'Módulo não removida',
        text: 'O módulo selecionado não pode ser removido'
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
