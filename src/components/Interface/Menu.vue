<template>
  <nav class="nav-menu">
    <ul class="nav-menu-list">
      <li class="title">
        <p>Menu</p>
      </li>
      <li class="list-item">
        <router-link to="/" class="nav-menu-item">Dashboard</router-link>
      </li>
      <li class="list-item" v-if="isLogged">
        <router-link to="/character" class="nav-menu-item">Inspect</router-link>
      </li>
      <li class="list-item" v-else>
        <router-link to="/login" class="nav-menu-item">Login</router-link>
      </li>
      <li class="list-item">
        <router-link to="/settings" class="nav-menu-item">Settings</router-link>
      </li>
      <li class="list-item">
        <router-link to="/switch" v-if="isLogged">Change character</router-link>
      </li>
      <li class="list-item">
        <router-link to="/login" v-if="isLogged">Logout</router-link>
      </li>
      <li class="list-item">
        <router-link to="/faq" class="nav-menu-item">FAQ</router-link>
      </li>
    </ul>
    <span class="copy">2019 &copy; {{ appName }}</span>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
	computed: mapState(['appName', 'isLogged']),
})
export default class Menu extends Vue {}
</script>

<style lang="scss" scoped>
.nav-menu {
	display: flex;
	flex-direction: column;
	flex: 0 0 180px;
	min-width: 150px;
	min-height: 100%;
	background-color: $nav-background;

	.nav-menu-list {
		flex: 1;
		list-style-type: none;
		padding-top: 20px;

		.title {
			text-transform: uppercase;
			text-align: center;
			margin-bottom: 10px;
		}

		.list-item {
			background-color: $nav-background;

			a {
				display: block;
				padding: 15px;
				color: $primary;
				text-decoration: none;
				transition: $main-transition-effect;

				&:hover {
					background-color: $primary;
					color: #fff;
				}
			}
		}
	}

	.copy {
		flex: 0;
		padding-bottom: 15px;
		text-align: center;
		font-size: 0.85em;
		color: $footer-font-color;
	}
}
</style>