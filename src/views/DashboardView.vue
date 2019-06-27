<template>
  <div id="dashboard">
    <h2>Welcome to {{ appName }}</h2>
    <div class="login-info" v-if="!isLogged">
      <p>You need to login in order to proceed.</p>
      <router-link to="/login">Click here to login</router-link>
    </div>
    <div class="box-container">
      <div class="box-sm">
        <h5 class="box-title">Title</h5>
        <p
          class="box-text"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla natus iure officia, repellendus sed laudantium tempora deserunt, culpa quos qui esse exercitationem ad odio nam doloribus ducimus dolor nesciunt officiis?</p>
      </div>
      <div class="box-sm">
        <h5 class="box-title">Title</h5>
        <p
          class="box-text"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla natus iure officia, repellendus sed laudantium tempora deserunt, culpa quos qui esse exercitationem ad odio nam doloribus ducimus dolor nesciunt officiis?</p>
      </div>

      <div class="box-sm">
        <h5 class="box-title">Title</h5>
        <p
          class="box-text"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla natus iure officia, repellendus sed laudantium tempora deserunt, culpa quos qui esse exercitationem ad odio nam doloribus ducimus dolor nesciunt officiis?</p>
      </div>
      <div class="box-sm">
        <h5 class="box-title">Title</h5>
        <p
          class="box-text"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla natus iure officia, repellendus sed laudantium tempora deserunt, culpa quos qui esse exercitationem ad odio nam doloribus ducimus dolor nesciunt officiis?</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Axios from 'axios';
import { Character } from '../types';

@Component({
	computed: mapState(['appName', 'isLogged']),
})
export default class Dashboard extends Vue {
	// Methods
	// mounted() {
	// 	let config = {
	// 		headers: {
	// 			Cookie: 'POESESSID=cee5da2678d237ff9e2ce69d3a2d533d',
	// 		},
	// 	};
	// 	let data = Axios.get(
	// 		'/character-window/get-characters?accountName=Nessuno'
	// 	)
	// 		.then(response => console.log(response.data))
	// 		.catch(err => console.error(err));
	// }
	// private async getCharacters(accountName: string) {
	// 	if (accountName.trim() != null && accountName.trim() != '') {
	// 		let data = await Axios.get(
	// 			`/character-window/get-characters?accountName=${accountName}`
	// 		)
	// 			.then(response => response.data)
	// 			.catch(error => console.error(error));
	// 		this.charactersList = data;
	// 	} else {
	// 		console.warn(
	// 			`getCharacters - parameter accountName cannot be null or empty. Value passed: ${accountName}.`
	// 		);
	// 	}
	// }
	// Changes link's color in the dashboard for
	// the charactersList array.
	// private updateAnchors(classId: number) {
	// 	let returnString = '';
	// 	switch (classId) {
	// 		case 0: // Scion
	// 			returnString = 'class-scion';
	// 			break;
	// 		case 1: // Marauder
	// 			returnString = 'class-marauder';
	// 			break;
	// 		case 2: // Ranger
	// 			returnString = 'class-ranger';
	// 			break;
	// 		case 3: // Witch
	// 			returnString = 'class-witch';
	// 			break;
	// 		case 4: // Duelist
	// 			returnString = 'class-duelist';
	// 			break;
	// 		case 5: // Templar
	// 			returnString = 'class-templar';
	// 			break;
	// 		case 6: // Shadow
	// 			returnString = 'class-shadow';
	// 			break;
	// 	}
	// 	return returnString;
	// }
}
</script>

<style lang="scss" scoped>
#dashboard {
	display: flex;
	flex-direction: column;

	.box-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: space-around;
		min-height: 400px;
		margin-top: 1rem;

		.box-sm {
			position: relative;
			flex-basis: 45%;
			min-height: 1px;
			width: 100%;
			max-width: 50%;
			padding: 1.25rem;
			border: 1px solid rgba(255, 255, 255, 0.2);
			border-radius: $default-border-radius;

			.box-title {
				font-size: 1.25rem;
				font-weight: 500;
				margin-bottom: 0.75rem;
			}

			.box-text {
				margin-bottom: 1rem;
			}
		}
	}
}
</style>
