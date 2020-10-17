<template>
    <div>
        <section class="row panel-body">
            <section class="col-md-12">
              <h2> <i class="glyphicon glyphicon-th-list"> </i> {{ forumDetails.title!=undefined?forumDetails.title:"" }}</h2> <hr>
              <h6>{{ forumDetails.content!=undefined?forumDetails.content:"" }} </h6>
              
            </section>
        </section>
        <hr/>
        <div class="container-fluid" v-if="forumTopics!='undefined' && forumTopics!=null">
            <h3>Topics</h3>
            <ul class="list-group">
                <forum-topics v-for="(value, key, index) in forumTopics" :key="index" :topic="value" :objKey="key"></forum-topics>
            </ul>
        </div>
    </div>
</template>
<script>
    import ForumTopics from '../partials/ForumTopics.vue'
    //import api from '../../helper/api'
    export default {
        data() {
            return {
            }
        },
        components: {
            ForumTopics
        },
        methods: {
        
        },
        computed: {
            forumDetails() {
                return this.$store.state.forumDetails
            },
            forumTopics() {
                return this.$store.state.forumTopics
            }
        },
        mounted() {
            this.$store.dispatch('loadForumDetails', {route: this.$route})
        }
    }
</script>