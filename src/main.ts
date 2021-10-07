// Modules
import viteSSR, { ClientOnly } from "vite-ssr";
import VueSocketIO from "vue-socket.io-extended";
import { io } from "socket.io-client";
import { createHead } from "@vueuse/head";

// Factories
import { createRouter } from "@factories/router";
import { createStore } from "@factories/store";

// Directives
import Tooltip from "@directives/tooltip";

// Views
import App from "@views/App.vue";

// Constants
const SOCKET_ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;

// Variables
const router = createRouter();
const ioInstance = io(SOCKET_ENDPOINT);

if (typeof SOCKET_ENDPOINT !== "string") {
	throw Error("Environmental variable 'SOCKET_ENDPOINT' is not assigned");
}

export default viteSSR (App, { routes: router.options.routes }, ({ app, router, initialState }) => {

	const
		head = createHead(),
		store = createStore();

	app
		.use(createHead)
		.use(store)
		.use(VueSocketIO, ioInstance)
		.directive("tooltip", Tooltip)
		.component(ClientOnly.name, ClientOnly);

	// Hydrate app with initialState that is passed to VueX
	app.provide("initialState", initialState);

	router.beforeEach(async (to: any, _: unknown, next: any) => {

		if (to.meta.state) {
			return next();
		}

		next();
	});

	return { head };
});