import Home from './components/pages/Home.vue'
import ForumDisplay from './components/pages/ForumDisplay.vue'
import TopicDisplay from './components/pages/TopicDisplay.vue'
import Login from './components/pages/Login.vue'
import Logout from './components/pages/Logout.vue'
import Register from './components/pages/Register.vue'
import AddForum from './components/pages/AddForum.vue'
import MyForums from './components/pages/MyForums.vue'
import EditForum from './components/pages/EditForum.vue'
import AddTopic from './components/pages/AddTopic.vue'
import EditTopic from './components/pages/EditTopic.vue'
import ForumTopics from './components/partials/ForumTopics.vue'
 
export const routes = [
 { path: '/', name: 'Home', component: Home },
 { path: '/home', redirect: '/' },
 { path: '/forum-display/:id', name: 'ForumDisplay', component: ForumDisplay },
 { path: '/topic-display/:id', name: 'TopicDisplay', component: TopicDisplay },
 { path: '/login', name: 'Login', component: Login },
 { path: '/logout', name: 'Logout', component: Logout },
 { path: '/register', name: 'Register', component: Register },
 { path: '/add-forum', name: 'AddForum', component: AddForum },
 { path: '/my-forums', name: 'MyForums', component: MyForums },
 { path: '/edit-forum/:id', name: 'EditForum', component: EditForum },
 { path: '/add-topic/:id', name: 'AddTopic', component: AddTopic },
 { path: '/edit-topic/:forum_id/:topic_id', name: 'EditTopic', component: EditTopic },
 { path: '/forum-topics/:id', name: 'ForumTopics', component: ForumTopics }
];