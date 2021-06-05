// Modules
import { createRouter, createWebHistory } from "vue-router";

// Views
import Home from "@views/Home.vue";
import Shows from "@views/Shows.vue";
import Rooms from "@views/Rooms.vue";
import Player from "@views/Player.vue";
import RoomLoader from "@views/RoomLoader.vue";
import Login from "@views/Login.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: Home
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/shows/:showId?",
			component: Shows,
			props: true
		},
		{
			path: "/rooms",
			component: Rooms
		},
		{
			path: "/rooms/:roomId",
			component: RoomLoader,
			props: true
		},
		{
			path: "/watch/:showId/:episodeId?",
			component: Player,
			props: (route) => {
				return {
					showId: route.params.showId,
					episodeId: Number(route.params.episodeId)
				};
			}
		}
	]
});

export default router;