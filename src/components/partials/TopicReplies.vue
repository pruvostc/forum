<template>
        <div class="panel panel-default">
            <div class="panel panel-heading">
                {{ reply.username }}
                <span class="pull-right">{{ reply.created_at }}</span>
            </div>
            <div class="panel panel-body">
                {{ reply.content }}
            </div>    
        </div>
</template>
<script>
    export default {
        props: ['reply'],
        components: {
        }
    }
</script>