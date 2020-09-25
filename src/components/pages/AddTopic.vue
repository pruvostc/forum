<template>
  <div>
    <section class="row panel-body">
      <div class="col-md-12">
        <form method="post" v-on:submit.prevent="addTopic">
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
        return this.$store.state.topic.title;
      },
      set(value) {
        this.$store.commit("setTopicTitle", value);
      },
    },
    content: {
      get() {
        return this.$store.state.topic.content;
      },
      set(value) {
        this.$store.commit("setTopicContent", value);
      },
    },
  },
  methods: {
    addTopic() {
      this.errors = [];

      var self = this;

      if (this.$store.state.topic.title == "") {
        this.errors.push("Title required");
      }

      if (this.$store.state.topic.content == "") {
        this.errors.push("Content required");
      }

      if (this.errors.length > 0) {
        return false;
      }

      this.isLoading = true;

      // else save topic
      api.addTopic(
        this.$store.state.topic.title,
        this.$store.state.topic.content,
        this.$route.params.id,
        this.$store.state.currentUser.id
      );

      setTimeout(() => {
        self.isLoading = false;

        self.msg = "Topic saved successfully!";

        self.$store.commit("setTopicTitle", "");
        self.$store.commit("setTopicContent", "");

        self.$router.push("/forum-topics/" + self.$route.params.id);
      }, 2500);
    },
  },
  created() {
    document.getElementById("loading").style.display = "none";
  },
};
</script>