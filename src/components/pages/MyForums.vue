<template>
  <div>
    <section class="row panel-body">
      <section class="col-md-12">
        <h3>
          <i class="glyphicon glyphicon-th-list"></i> My Forums
        </h3>
        <hr />
        <h4>this.$store.state.</h4>
      </section>
    </section>
    <hr />

    <div class="alert alert-success" v-if="this.msg != ''">{{ this.msg}}</div>

    <div class="container-fluid">
      <table class="table table-responsive" v-if="this.$store.state.userForums">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Forum Topic</th>
            <th>Add Topic</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key, index) in this.$store.state.userForums" :key="index">
            <td>{{ value.title }}</td>
            <td>{{ value.content }}</td>
            <td>
              <router-link :to="'/forum-topics/' + key" class="btn btn-info">View</router-link>
            </td>
            <td>
              <router-link :to="'/add-topic/' + key" class="btn btn-info">Add Topic</router-link>
            </td>
            <td>
              <router-link :to="'/edit-forum/' + key" class="btn btn-success">Edit</router-link>
            </td>
            <td>
              <a href="javascript:void(0);" class="btn btn-danger" @click="remove(key)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center" v-if="!this.$store.state.userForums">
        You have no forums yet!
        <router-link to="/add-forum/">Add forum</router-link>
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
  methods: {
    remove(key) {
      if (confirm("Are you sure?")) {
        // delete
        api.deleteForum(key);

        // reload user forums
        setTimeout(() => {
          this.msg = "Forum deleted successfully!";

          this.$store.dispatch("getUserForums", this.$store.state.currentUser);
        }, 1500);
      }
    },
  },
  mounted() {
    document.getElementById("loading").style.display = "none";
  },
};
</script>