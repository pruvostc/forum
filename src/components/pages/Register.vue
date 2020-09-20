<template>
  <div>
    <section class="row panel-body">
      <div class="col-md-12">
        <form method="post" class="form-inline" v-on:submit.prevent="register">
          <div class="alert alert-danger" v-if="this.errors.length > 0">
            <ul>
              <li v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
            </ul>
          </div>

          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="displayName">Display name</label>
            <input
              type="text"
              class="form-control"
              id="displayName"
              placeholder="displayName"
              v-model="name"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
          </div>

          <button type="submit" class="btn btn-success">
            <i v-show="isLoading" class="fa fa-refresh fa-lg fa-spin btn-load-indicator"></i> Register
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
 
<script>
import api from "../../helper/api";

export default {
  data() {
    return {
      isLoading: false,
      errors: [],
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.auth.email;
      },
      set(value) {
        this.$store.commit("setAuthEmail", value);
      },
    },
    password: {
      get() {
        return this.$store.state.auth.password;
      },
      set(value) {
        this.$store.commit("setAuthPassword", value);
      },
    },
    name: {
      get() {
        return this.$store.state.auth.name;
      },
      set(value) {
        this.$store.commit("setAuthName", value);
      },
    },
  },
  methods: {
    register() {
      var self = this;

      this.errors = [];

      if (this.$store.state.auth.email == "") {
        this.errors.push("Email address required");
      }

      if (this.$store.state.auth.password == "") {
        this.errors.push("Password required");
      }

      if (this.$store.state.auth.name == "") {
        this.errors.push("Display name required");
      }

      if (
        this.$store.state.auth.email != "" &&
        !this.validateEmail(this.$store.state.auth.email)
      ) {
        this.errors.push("Invalid email address");
      }

      if (
        this.$store.state.auth.password != "" &&
        this.$store.state.auth.password.length < 6
      ) {
        this.errors.push("Password must be at least 6 characters long");
      }

      if (this.errors.length > 0) {
        return false;
      }

      this.isLoading = true;

      // if everthing ok authenticate
      api.register(
        self.$store.state.auth.email,
        self.$store.state.auth.password,
        function (user) {
          // update name
          api.updateUserDisplayname(self.$store.state.auth.name);

          setTimeout(() => {
            self.isLoading = false;

            // insert into firebase db
            const key = api.addUser(
              self.$store.state.auth.name,
              user.user.email,
              user.user.uid
            );

            // save these info into store
            self.$store.commit("setCurrUserId", key);

            self.$store.commit("setCurrUserName", self.$store.state.auth.name);
            self.$store.commit("setCurrUserEmail", user.user.email);
            self.$store.commit("setCurrUserUid", user.user.uid);
            self.$store.commit("setCurrUserStatus", 1);

            self.$router.push("/");
          }, 1500);
        },
        function (error) {
          alert(error.message);
        }
      );
    },
    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};
</script>