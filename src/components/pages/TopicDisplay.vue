<template>
    <div>
        <section class="row panel-body" v-if="topicDetails!=null && topicDetails!='undefined' && userDetails!=null && userDetails!='undefined' ">
            <section class="col-md-12">
              <h2><i class="glyphicon glyphicon-link"> </i> {{ topicDetails.title }} <small> <router-link :to="'/forum-display/' + topicDetails.forum_id "> {{ forumDetails.title }}</router-link></small></h2>  <hr>
              
              <a href="#"><i class="glyphicon glyphicon-user"></i> {{ userDetails.name }} </a><br>
              <i class="glyphicon glyphicon-calendar"></i> {{ topicDetails.created_at }}
                <br/>
              <span class="badge">Views: {{ topicDetails.view_count }}</span>
              <hr/>
              <p>{{ topicDetails.content }}</p>
              
            </section>
        </section>
        <hr/>
        <div class="container-fluid" v-if="replies!='undefined' && replies!=null && replies.length > 0">
            <h3>Replies</h3>
            <topic-replies v-for="(val, index) in replies" :key="index" :reply="val"></topic-replies>
        </div>
        <div class="container-fluid" v-if="this.$store.state.currentUser.status==1">
            <h3>Add Reply</h3>
            <add-reply></add-reply>
        </div>
        <div class="container-fluid" v-else>
            <p class="text-center"><router-link to="/login/">Login</router-link> to add reply</p>
        </div>
    </div>
</template>
<script>
    import TopicReplies from '../partials/TopicReplies.vue'
    import AddReply from '../partials/AddReply.vue'
    import api from '../../helper/api'
    export default {
        components: {
            TopicReplies,
            AddReply
        },
        computed: {
            forumDetails() {
                return this.$store.state.forumDetails
            },
            topicDetails() {
                return this.$store.state.topicDetails
            },
            userDetails() {
                return this.$store.state.userDetails
            },
            replies() {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                return this.$store.state.replies.reverse()
            }
        },
        mounted() {
            // load topic details
            this.$store.dispatch('loadTopicDetails', {route: this.$route})
            // increment view count
            api.updateTopicViewCount(this.$route.params.id)
        }
    }
</script>