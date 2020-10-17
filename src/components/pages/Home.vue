<template>
  <div>
    <!--h4>{{ this.$store.state }}</h4-->
    <div v-if="latestForums.length > 0">
      <section v-for="val in latestForums" :key="val.key" class="row panel-body">
        <section class="col-md-6">
          <h4>
            <router-link :to="'/forum-display/' + val.key"
              ><i class="glyphicon glyphicon-th-list"> </i>
              {{ val.title }}</router-link
            >
          </h4>
          <hr />
          <h6>{{ val.content }}</h6>
        </section>

        <section class="col-md-2">
          <ul id="post-topic">
            <li class="list-unstyled">Topics:{{ val.topics.length }}</li>
          </ul>
        </section>
        <section class="col-md-3" v-if="val.topics.length > 0">
          <h4>
            <router-link :to="'/topic-display/' + val.topics[0].key"
              ><i class="glyphicon glyphicon-link"> </i>
              {{ val.topics[0].title }}
            </router-link>
          </h4>
          <hr />
          <a href="#"
            ><i class="glyphicon glyphicon-user"></i>
            {{ val.topics[0].username }} </a
          ><br />
          <a href="#"
            ><i class="glyphicon glyphicon-calendar"></i>
            {{ val.topics[0].created_at }}
          </a>
        </section>
      </section>
    </div>
    <div v-else>
      <section class="row panel-body">
        <p class="text-center">
          No forums exit yet!
          <router-link to="/add-forum/">create new forum</router-link>
        </p>
      </section>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  
  computed: {
    latestForums() {
      return this.$store.state.homeForums;
    },
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    this.$store.dispatch("setHomeForumsOnLoad", function (response) { //response unsued
      setTimeout(
        () => (document.getElementById("loading").style.display = "none"),
        500
      );
    });
  },
};
</script>