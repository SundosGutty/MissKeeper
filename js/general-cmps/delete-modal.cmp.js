export const deleteModal = {
  name: 'delete-modal',
  template: `
    <div class="modal">
      <div class="modal-content flex column">
        <div class="modal-header flex space-between">
            <h1>Delete this item?</h1>
            <i class="fas fa-times" @click="approveRemove(false)"></i>
        </div>
         <div class="modal-body flex justify-end">
          <button @click="approveRemove(false)" class="btn-cancel">Cancel</button>
          <button @click="approveRemove(true)" class="btn-delete">Delete</button>
        </div> 
        </div>

      </div>
    </div>`,

  methods: {
    approveRemove(status) {
      this.$emit("approveRemove", status)
    },
  }
}

