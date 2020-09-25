<template>
  <div>
    <section class="row panel-body">
      <section class="col-md-12">
        <h3>
          <i class="glyphicon glyphicon-th-list"></i> Forum Topics
        </h3>
        <hr />
      </section>
    </section>
    <hr />

    <div class="alert alert-success" v-if="this.msg != ''">{{ this.msg}}</div>

    <div class="container-fluid">
      <table class="table table-responsive">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key, index) in this.topics" :key="index">
            <td>{{ value.title }}</td>
            <td>{{ value.content }}</td>
            <td>
              <router-link :to="'/edit-topic/' + forum_id + '/' + key" class="btn btn-success">Edit</router-link>
            </td>
            <td>
              <a href="javascript:void(0);" class="btn btn-danger" @click="remove(key)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center" v-if="!this.topics">
        No topics in this forum!
        <router-link :to="'/add-topic/' + this.$route.params.id">Add new topic</router-link>
      </div>
    </div>
  </div>
</template>
 
<script>
import api from "../../helper/api";

export default {
  data() {
    return {
      msg: "",
    };
  },
  computed: {
    topics: {
      get() {
        return this.$store.state.userTopics;
      },
    },
    forum_id: {
      get() {
        return this.$route.params.id;
      },
    },
  },
  methods: {
    remove(key) {
      if (confirm("Are you sure?")) {
        // delete
        api.deleteTopic(key);

        // reload user forums
        setTimeout(() => {
          this.msg = "Topic deleted successfully!";

          api.getMyTopics(
            this.$route.params.id,
            this.$store.state.currentUser.id,
            function (response) {
              self.$store.commit("setUserTopics", response);
            }
          );
        }, 1500);
      }
    },
  },
  mounted() {
    var self = this;

    setTimeout(() => {
      api.getMyTopics(
        self.$route.params.id,
        self.$store.state.currentUser.id,
        function (response) {
          self.$store.commit("setUserTopics", response);
        }
      );
    }, 2000);
  },
  created() {
    document.getElementById("loading").style.display = "none";
  },
};
</script>