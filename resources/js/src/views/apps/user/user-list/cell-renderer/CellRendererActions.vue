<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-2 hover:text-primary cursor-pointer" @click="editRecord()" />
        <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-2 hover:text-danger cursor-pointer" @click="viewRecord()" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord()" />
    </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    viewRecord () {
        this.$router.push(`/apps/user/user-view/${this.params.data.id}`).catch(() => {})
    },
    editRecord () {
      this.$router.push(`/apps/user/user-edit/${this.params.data.id}`).catch(() => {})

      /*
              Below line will be for actual product
              Currently it's commented due to demo purpose - Above url is for demo purpose

              this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
            */
    },
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar Remoção',
        text: `Você tem certeza que quer deletar o usuário "${this.params.data.name}?"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({name:'app-user-list'})
      this.$store.dispatch('userManagement/delete', this.params.data.id)
          .then(res => { this.showDeleteSuccess() })
          .catch(err => {
              this.$vs.notify({
                  color: 'error',
                  title: 'Usuário não removido',
                  text: 'O usuário selecionado não pode ser removido'
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
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    }
  }
}
</script>
