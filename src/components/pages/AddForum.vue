<template>
  <div>
    <section class="row panel-body">
      <div class="col-md-12">
        <form method="post" v-on:submit.prevent="addForum">
          <div class="alert alert-danger" v-if="this.errors.length > 0">
            <ul>
              <li v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
            </ul>
          </div>

          <div class="alert alert-success" v-if="this.msg != ''">{{ this.msg}}</div>

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" placeholder="Title" v-model="title" />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea name="content" class="form-control" placeholder="Content" v-model="content"></textarea>
          </div>

          <button type="submit" class="btn btn-success">
            <i v-show="isLoading" class="fa fa-refresh fa-lg fa-spin btn-load-indicator"></i> Save
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
      errors: [],
      msg: "",
      isLoading: false,
    };
  },
  computed: {
    title: {
      get() {
        return this.$store.state.forum.title;
      },
      set(value) {
        this.$store.commit("setForumTitle", value);
      },
    },
    content: {
      get() {
        return this.$store.state.forum.content;
      },
      set(value) {
        this.$store.commit("setForumContent", value);
      },
    },
  },
  methods: {
    addForum() {
      this.errors = [];

      var self = this;

      if (this.$store.state.forum.title == "") {
        this.errors.push("Title required");
      }

      if (this.$store.state.forum.content == "") {
        this.errors.push("Content required");
      }

      if (this.errors.length > 0) {
        return false;
      }

      this.isLoading = true;

      // else save forum
      api.addForum(
        this.$store.state.forum.title,
        this.$store.state.forum.content,
        this.$store.state.currentUser.id
      );

      setTimeout(() => {
        self.isLoading = false;

        self.msg = "Forum saved successfully!";

        self.$store.commit("setForumTitle", "");
        self.$store.commit("setForumContent", "");

        self.$store.dispatch("getUserForums", self.$store.state.currentUser);

        self.$router.push("/my-forums/");
      }, 2500);
    },
  },
  created() {
    if (this.$store.state.currentUser.status != 1) {
      this.$router.push("/login/");
    }
  },
};
</script>