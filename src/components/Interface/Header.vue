<template>
  <header class="top-header">
    <router-link to="/" class="logo">{{ appName }}</router-link>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
	computed: mapState(['appName']),
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.top-header {
	height: 30px;
	background-color: $header-background;
}

.top-header .logo {
	padding-left: 30px;
	letter-spacing: 0.3em;

	color: $alpha-primary;
	font-size: $logo-font-size;
	text-decoration: none;
	font-weight: 300;
	line-height: 30px;

	transition: $main-transition-effect;

	&:hover {
		color: $primary;
		padding-left: 35px;
	}
}
</style>