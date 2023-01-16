<template>
  <main v-if="isLogin">
    <header class="violet anima-grow">
      <i class="fa-solid fa-sign-in-alt fa-2x"></i>
      <h1 class="mar-none">Login</h1>
    </header>

    <form class="form">
      <ul>
        <li>
          <FieldElt
            id="email"
            v-model:value="email"
            info="Indicate your Email"
            @keyup.enter="login()"
            type="email"
            required>
            <template #legend>
              Email
            </template>
            <template #label>
              This email must have been registered before
            </template>
          </FieldElt>
        </li>
        <li>
          <FieldElt
            id="pass"
            v-model:value="pass"
            info="Indicate your Password"
            @keyup.enter="login()"
            type="password"
            required>
            <template #legend>
              Password
            </template>
            <template #label>
              You can use the Forgot Password feature if needed
            </template>
          </FieldElt>
        </li>
      </ul>
      <ul>
        <li>
          <div 
            id="recaptcha"
            class="g-recaptcha"
            data-sitekey="6LdTBtoZAAAAADITfTTXpjsctFXZqKXZc-seM9ZL">
          </div>
        </li>
        <li>
          <BtnElt
            type="button"
            content="Login"
            @click="login()"
            class="green"/>
          <BtnElt
            type="button"
            content="Forgot Password"
            @click="toggleFormType()"
            class="orange"/>
        </li>
      </ul>
    </form>
  </main>

  <main v-else>
    <header class="violet anima-grow">
      <i class="fa-solid fa-key fa-2x"></i>
      <h1 class="mar-none">Forgot Password</h1>
    </header>

    <form>
      <FieldElt
        id="email"
        v-model:value="email"
        info="Indicate your Email"
        @keyup.enter="forgotPass()"
        type="email"
        required>
        <template #legend>
          Email
        </template>
        <template #label>
          This email must have been registered before
        </template>
      </FieldElt>
      <ul>
        <li>
          <div 
            id="recaptcha"
            class="g-recaptcha"
            data-sitekey="6LdTBtoZAAAAADITfTTXpjsctFXZqKXZc-seM9ZL">
          </div>
        </li>
        <li>
          <BtnElt
            type="button"
            content="Send"
            @click="forgotPass()"
            class="orange"/>
          <BtnElt
            type="button"
            content="Login"
            @click="toggleFormType()"
            class="green"/>
        </li>
      </ul>
    </form>
  </main>
</template>

<script>
import BtnElt from "@/components/base/BtnElt"
import FieldElt from "@/components/base/FieldElt"

export default {
  name: "LoginView",
  components: {
    BtnElt,
    FieldElt
  },
  data() {
    return {
      email: "",
      pass: "",
    }
  },

    beforeMount() {
    if (localStorage.userId) {
      this.$router.push("/admin");
    }
  },

  methods: {
    /**
     * USER LOGIN
     */
    login() {
      let auth = new FormData();

      auth.append("email", this.email);
      auth.append("pass", this.pass);

      this.$serve.postData("/api/users/login", auth)
        .then((res) => {
          let token   = JSON.stringify(res.token);
          let userId  = JSON.stringify(res.userId);

          localStorage.setItem("userToken", token);
          localStorage.setItem("userId", userId);

          this.$router.go("/");
        });
    }
  }
}
</script>
