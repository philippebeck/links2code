<template>
  <form method="post"
    enctype="multipart/form-data">
    <TableElt :items="users"
      id="users">

      <template #head>
        up/del
      </template>

      <template #cell-_id="slotProps">
        <MediaElt :src="'/img/users/' + users[slotProps.index].image"
          :alt="'Photo de ' + users[slotProps.index].name"
          :title="users[slotProps.index].image">
        </MediaElt>
      </template>

      <template #cell-name="slotProps">
        <FieldElt :id="'name-' + users[slotProps.index]._id"
          v-model:value="getUsers()[slotProps.index].name"
          info="Update the user name"
          @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)">
        </FieldElt>
      </template>

      <template #cell-email="slotProps">
        <FieldElt :id="'email-' + users[slotProps.index]._id"
          type="email"
          v-model:value="getUsers()[slotProps.index].email"
          info="Update the user email"
          @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)">
        </FieldElt>
      </template>

      <template #cell-image="slotProps">
        <FieldElt :id="'image-' + users[slotProps.index]._id"
          type="file"
          info="Update the user image">
        </FieldElt>
      </template>

      <template #cell-pass="slotProps">
        <FieldElt :id="'pass-' + users[slotProps.index]._id"
          type="password"
          v-model:value="pass"
          info="Update the user password"
          @keyup.enter="validateUpdatedUser(users[slotProps.index]._id)">
        </FieldElt>
      </template>

      <template #body="slotProps">
        <BtnElt type="button"
          @click="validateUpdatedUser(users[slotProps.index]._id)" 
          class="btn-sky"
          :title="'Update ' + users[slotProps.index].name">
          <template #btn>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

        <BtnElt type="button"
          @click="deleteUser(users[slotProps.index]._id)" 
          class="btn-red"
          :title="'Delete ' + users[slotProps.index].name">
          <template #btn>
            <i class="fa-solid fa-trash-alt"></i>
          </template>
        </BtnElt>
      </template>
    </TableElt>
  </form>
</template>

<script>
export default {
  name: "ListUsers",
  props: ["users"],

  data() {
    return {
      pass: ""
    }
  },

  methods: {
    /**
     * GET ALL USERS
     */
    getUsers() {
      return this.users;
    },

    validateUpdatedUser(id) {
      for (let i = 0; i < this.users.length; i++ ) {
        if (this.users[i]._id === id) {

          if (this.$serve.checkName(this.users[i].name) && 
            this.$serve.checkEmail(this.users[i].email) && 
            this.$serve.checkPass(this.pass)) {

            this.checkUpdatedUser(i);
          }
        }
      }
    },

    /**
     * CHECK UPDATED USER IF NAME | EMAIL ARE REFERENCED
     * @param {number} i 
     */
    checkUpdatedUser(i) {
      this.$serve.getData("/api/users")
        .then((users) => {
          let isReferenced = false;

          for (let j = 0; j < users.length; j++) {
            if (users[j]._id === this.users[i]._id) {
              users.splice(j, 1);
            }

            if (users[j] && users[j].name === this.users[i].name) {
              alert(this.users[i].name + " is not available !");
              isReferenced = true;
            }

            if (users[j] && users[j].email === this.users[i].email) {
              alert(this.users[i].email+ " is already referenced !");
              isReferenced = true;
            }
          }

          this.updateUser(isReferenced, i);
        })
        .catch(err => { console.log(err) });
    },

    /**
     * UPDATE USER IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     * @param {number} i 
     */
    updateUser(isReferenced, i) {
      if (!isReferenced) {

        let user  = new FormData();
        let image = document.getElementById('image-' + this.users[i]._id).files[0];

        if (typeof image === "undefined") {
          image = this.users[i].image;
        }

        user.append("id", this.users[i]._id);
        user.append("name", this.users[i].name);
        user.append("email", this.users[i].email);
        user.append("image", image);
        user.append("pass", this.pass);

        this.$serve.putData(`/api/users/${user.get("id")}`, user)
          .then(() => {
            alert(user.get("name") + " updated !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    },

    /**
     * DELETE USER
     * @param {string} id 
     */
    deleteUser(id) {
      let userName = "";

      for (let i = 0; i < this.users.length; i++ ) {
        if (this.users[i]._id === id) {
          userName = this.users[i].name;
        }
      }
      
      if (confirm(`Delete ${userName} ?`) === true) {
        this.$serve.deleteData(`/api/users/${id}`)
          .then(() => {
            alert(userName + " deleted !");
            this.$router.go();
          })
          .catch(err => { console.log(err) });
      }
    }
  }
}
</script>
