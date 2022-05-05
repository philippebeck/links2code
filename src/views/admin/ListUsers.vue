<template>
  <form>
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
          info="Indiquer le nom de l'utilisateur"
          required>
        </FieldElt>
      </template>

      <template #cell-email="slotProps">
        <FieldElt
          id="email"
          v-model:value="getUsers()[slotProps.index].email"
          info="Indiquer l'email de l'utilisateur"
          type="email"
          required>
        </FieldElt>
      </template>

      <template #cell-pass>
        <FieldElt
          id="pass"
          v-model:value="pass"
          info="********"
          type="password"
          min="8"
          required>
        </FieldElt>
      </template>

      <template #body="slotProps">
        <BtnElt
          type="button"
          @click="updateUser(users[slotProps.index]._id)" 
          class="btn-blue"
          title="Modifier">
          <template #button>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

        <BtnElt
          type="button"
          @click="deleteUser(users[slotProps.index]._id)" 
          class="btn-red"
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
import BtnElt from '@/components/base/BtnElt';
import FieldElt from '@/components/base/FieldElt';
import TableElt from "@/components/data/TableElt.vue";
import { checkString, rewriteString, putData, deleteData } from "@/script/services";

export default {
  name: "ListUsers",
  props: ["users"],
  components: {
    BtnElt,
    FieldElt,
    TableElt
  },

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
      if (checkString(user.name, "name") === true && 
        checkString(user.email, "email") === true &&
        checkString(user.pass, "pass") === true) {
        user.name   = rewriteString(user.name, "name");
        user.email  = rewriteString(user.email, "email");

          putData(`/api/users/${id}`, user)
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
        deleteData(`/api/users/${id}`)
          .then(() => {
            alert(userName + " supprimé !");
            this.$router.go();
          });
      }
    }
  }
}
</script>
