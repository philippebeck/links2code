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
        <img
          :src="'/img/' + users[slotProps.index].image"
          :alt="'Photo de ' + users[slotProps.index].name"
          :title="users[slotProps.index].image"
          width="40"
          class="bord bord-sm bord-blue bord-round">
        <br>
        {{ slotProps.index + 1 }}
      </template>

      <template #cell-name="slotProps">
        <FieldElt
          :id="'name-' + users[slotProps.index]._id"
          v-model:value="getUsers()[slotProps.index].name"
          info="Modifier le nom de l'utilisateur"
          required>
        </FieldElt>
      </template>

      <template #cell-email="slotProps">
        <FieldElt
          :id="'email-' + users[slotProps.index]._id"
          v-model:value="getUsers()[slotProps.index].email"
          info="Modifier l'email de l'utilisateur"
          type="email"
          required>
        </FieldElt>
      </template>

      <template #cell-image="slotProps">
        <FieldElt
          :id="'image-' + users[slotProps.index]._id"
          v-model:value="image"
          info="Modifier l'image de l'utilisateur"
          type="file"
          required>
        </FieldElt>
      </template>

      <template #cell-pass="slotProps">
        <FieldElt
          :id="'pass-' + users[slotProps.index]._id"
          v-model:value="pass"
          info="Modifier le password de l'utilisateur"
          type="password"
          min="8"
          max="50"
          required>
        </FieldElt>
      </template>

      <template #body="slotProps">
        <BtnElt
          type="button"
          @click="updateUser(users[slotProps.index]._id)" 
          class="sky"
          title="Modifier">
          <template #btn>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

        <BtnElt
          type="button"
          @click="deleteUser(users[slotProps.index]._id)" 
          class="red"
          title="Supprimer">
          <template #btn>
            <i class="fa-solid fa-trash-alt"></i>
          </template>
        </BtnElt>
      </template>
    </TableElt>
  </form>
</template>

<script>
import TableElt from "@/components/data/TableElt"
import BtnElt from "@/components/base/BtnElt"
import FieldElt from "@/components/base/FieldElt"

export default {
  name: "ListUsers",
  components: {
    TableElt,
    BtnElt,
    FieldElt
  },

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

          if (this.$serve.checkEmail(this.users[i].email) && this.$serve.checkPass(this.pass)) {

            image = document.getElementById('image-' + this.users[i]._id).files[0];

            if (typeof image === "undefined") {
              image = this.users[i].image;
            }

            user.append("id", id);
            user.append("name", this.users[i].name);
            user.append("email", this.users[i].email);
            user.append("image", image);
            user.append("pass", this.pass);

            this.$serve.putData(`/api/users/${id}`, user)
              .then(() => {
                alert(user.get("name") + " mis à jour !");
                this.$router.go();
              });
          }
        }
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
