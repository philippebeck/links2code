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
      let user  = new FormData();
      let image = "";

      for (let i = 0; i < this.users.length; i++ ) {
        if (this.users[i]._id === id) {

          if (document.getElementById('image').files[0]) {
            image = document.getElementById('image').files[0];
          } else {
            image = this.users[i].image;
          }

          console.log(image);

          user.append("id", id);
          user.append("name", this.users[i].name);
          user.append("email", this.users[i].email);
          user.append("image", image);
          user.append("pass", this.pass);
        }
      }

      if (this.$serve.checkString(user.get("name"), "name") === true && 
        this.$serve.checkString(user.get("email"), "email") === true &&
        this.$serve.checkString(user.get("pass"), "pass") === true) {

        user.set("name", this.$serve.rewriteString(user.get("name"), "name"));
        user.set("email", this.$serve.rewriteString(user.get("email"), "email"));

        console.log(user);

          this.$serve.putData(`/api/users/${id}`, user)
            .then(() => {
              alert(user.get("name") + " mis à jour !");
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
