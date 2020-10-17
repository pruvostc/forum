<template>
     <li class="list-group-item ">
         <span class="badge">Views: {{ topic.view_count }}</span>
        <router-link :to="'/topic-display/' + objKey ">
            {{ topic.title }}    
        </router-link>
        <span> <small>Posted in</small> <i class="glyphicon glyphicon-calendar"></i> {{ topic.created_at }}</span>
    </li>
</template>
<script>
    export default {
        props: ['topic', 'objKey'],
        components: {
        },
        computed: {
        },
        mounted() {
        }
    }
</script>