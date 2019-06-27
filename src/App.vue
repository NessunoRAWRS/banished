<template>
  <div id="app">
    <Header/>
    <div class="wrapper">
      <Menu/>
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Header from '@/components/Interface/Header.vue';
import Menu from '@/components/Interface/Menu.vue';

@Component({
	components: {
		Header,
		Menu,
	},
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
	background-color: $background;
	font-family: $main-font;
	font-size: 16px;
	font-weight: normal;
	color: $main-font-color;
	scroll-behavior: smooth;
}

h1,
h2,
h3,
h4,
h5 {
	font-weight: 300;
	margin-bottom: 1rem;
}

code {
	display: block;
	padding: 1rem;
	margin: 0.35rem 0;
	background-color: rgba(0, 0, 0, 0.15);
	border: 1px solid rgba(0, 0, 0, 0.35);
	border-radius: $default-border-radius;
	font-weight: 100;
	font-size: 1rem;
}

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.wrapper {
	display: flex;
	flex: 1;
}

.content {
	flex: 1;
	padding: 1rem;

	a {
		color: $primary;
		text-decoration: none;
		transition: 0.3s color ease-in-out;

		&:hover {
			animation: link-animation 2.5s infinite;
		}

		@keyframes link-animation {
			0% {
				color: $primary-hover;
			}
			50% {
				color: $primary;
			}
			100% {
				color: $primary-hover;
			}
		}

		&.class-scion {
			color: $class-scion-color;
		}

		&.class-marauder {
			color: $class-marauder-color;
		}

		&.class-ranger {
			color: $class-ranger-color;
		}

		&.class-witch {
			color: $class-witch-color;
		}

		&.class-duelist {
			color: $class-duelist-color;
		}

		&.class-templar {
			color: $class-templar-color;
		}

		&.class-shadow {
			color: $class-shadow-color;
		}
	}
}
</style>
