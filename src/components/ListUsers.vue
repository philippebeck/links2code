<template>
  <form
    method="post"
    enctype="multipart/form-data">
    <TableElt 
      :items="getUsers()"
      id="users">

      <template #head>
        crud
      </template>

      <template #cell-_id="slotProps">
        {{ slotProps.index + 1 }}
      </template>

      <template #cell-name="slotProps">
        <FieldElt
          id="name"
          v-model:value="getUsers()[slotProps.index].name"
          info="Modifier le nom de l'utilisateur"
          required>
        </FieldElt>
      </template>

      <template #cell-email="slotProps">
        <FieldElt
          id="email"
          v-model:value="getUsers()[slotProps.index].email"
          info="Modifier l'email de l'utilisateur"
          type="email"
          required>
        </FieldElt>
      </template>

      <template #cell-image="slotProps">
        <img
          :src="'http://localhost:3000/img/' + getUsers()[slotProps.index].image"
          :alt="'Photo de ' + getUsers()[slotProps.index].name"
          :title="getUsers()[slotProps.index].image"
          width="50">
        <output></output>
        <FieldElt
          id="image"
          v-model:value="image"
          info="Modifier l'image de l'utilisateur"
          type="file"
          required>
        </FieldElt>
      </template>

      <template #cell-pass>
        <FieldElt
          id="pass"
          v-model:value="pass"
          info="Modifier le password de l'utilisateur"
          type="password"
          min="8"
          required>
        </FieldElt>
      </template>

      <template #body="slotProps">
        <BtnElt
          type="button"
          @click="updateUser(users[slotProps.index]._id)" 
          class="blue"
          title="Modifier">
          <template #button>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

        <BtnElt
          type="button"
          @click="deleteUser(users[slotProps.index]._id)" 
          class="red"
          title="Supprimer">
          <template #button>
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
    getUsers() {
      return this.users;
    },

    updateUser(id) {
      let user = {};
      for (let i = 0; i < this.users.length; i++ ) {
        if (this.users[i]._id === id) {
          user = {
            id: id,
            name: this.users[i].name,
            email: this.users[i].email,
            pass: this.pass
          }
        }
      }
      if (this.$serve.checkString(user.name, "name") === true && 
        this.$serve.checkString(user.email, "email") === true &&
        this.$serve.checkString(user.pass, "pass") === true) {

        user.name   = this.$serve.rewriteString(user.name, "name");
        user.email  = this.$serve.rewriteString(user.email, "email");

          this.$serve.putData(`/api/users/${id}`, user)
            .then(() => {
              alert(user.name + " mis à jour !");
              this.$router.go();
            });
      }
    },

    deleteUser(id) {
      let userName = "";

      for (let i = 0; i < this.users.length; i++ ) {
        if (this.users[i]._id === id) {
          userName = this.users[i].name;
        }
      }
      
      if (confirm(`Supprimer ${userName} ?`) === true) {
        this.$serve.deleteData(`/api/users/${id}`)
          .then(() => {
            alert(userName + " supprimé !");
            this.$router.go();
          });
      }
    }
  }
}
</script>
