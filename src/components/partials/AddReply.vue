<template>
    <div>
        <form method="POST" v-on:submit.prevent="addReply">
            <div class="panel panel-default">
                <div class="panel panel-header">
                    <strong>Use any of these emotions: </strong>
                    <ul class="emotion-list">
                        <li v-for="(val, index) in emotionList" :key="index" v-html="val" @click="insertEmo" class="emotion-list">
                            
                        </li>
                    </ul>
                </div>
                <div class="panel panel-body">
                    
                        <textarea rows="3" name="reply" class="form-control" v-model="reply"></textarea>
                </div>
                <div class="panel panel-footer">
                    <button type="submit" class="btn btn-success" :disabled="disabled()"><i v-show="isLoading" class="fa fa-refresh fa-lg fa-spin btn-load-indicator"></i> Add</button>    
                </div>    
            </div>
        </form>
    </div>
</template>
<script>
    import api from '../../helper/api'
    export default {
        data() {
            return {
                isLoading: false,
                emotionList: [
                    "😁",
                    "😂",
                    "😃",
                    "😅",
                    "😆",
                    "😉",
                    "😊",
                    "😋",
                    "😌",
                    "😍",
                    "😏",
                    "😒",
                    "😓",
                    "😔",
                    "😖",
                    "😘",
                    "😚",
                    "😜",
                    "😝",
                    "😞",
                    "😠",
                    "😡",
                    "😢",
                    "😣",
                    "😤",
                    "😥",
                    "😨",
                    "😩",
                    "😪",
                    "😫",
                    "😭",
                    "😰",
                    "😱",
                    "😲",
                    "😳",
                    "😵",
                    "😷",
                    "😸",
                    "😹",
                    "😺",
                    "😻",
                    "😼",
                    "😽",
                    "😿",
                    "🙀",
                    "🙅",
                    "🙆",
                    "🙇",
                    "🙈"
                ]
            }
        },
        computed: {
            reply: {
                get() {
                    return this.$store.state.reply
                },
                set(value) {
                    this.$store.commit('setReply', value)
                }
            }
        },
        methods: {
            disabled() {
                if(this.$store.state.reply == "") {
                    return true
                } 
                return false
            },
            insertEmo(e) {
                let reply = this.$store.state.reply;
                reply += e.target.innerHTML;
                this.$store.commit('setReply', reply)
            },
            addReply() {
                var self = this;
                if(self.$store.state.reply != "") {
                    self.isLoading = true
                    api.addReply(self.$store.state.reply, self.$route.params.id, self.$store.state.currentUser.id)
                    setTimeout(
                        () => { 
                            
                            self.$store.commit('setReplies', [])
                            // reload replies
                            api.updateRepliesByTopicKey(self.$route.params.id, function(response) {
                                self.$store.commit('addToReplies', response)
                                self.isLoading = false
                            });
                            self.$store.commit('setReply', "")
                    },
                        1500
                    )
                }
            }
        }
    }
</script>