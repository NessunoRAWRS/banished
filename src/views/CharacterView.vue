<template>
  <div class="character">
    <h2>Character</h2>
    <h3>{{ character }}</h3>

    <div class="grid-container">
      <!-- Main Character -->
      <div class="helmet">h</div>
      <div class="main-weapon">w</div>
      <div class="off-weapon">w</div>
      <div class="amulet">a</div>
      <div class="left-ring">r</div>
      <div class="right-ring">r</div>
      <div class="body-armour">b</div>
      <div class="gloves">g</div>
      <div class="belt">belt</div>
      <div class="boots">boot</div>

      <!-- Flasks -->
      <div class="flask-1"></div>
      <div class="flask-2"></div>
      <div class="flask-3"></div>
      <div class="flask-4"></div>
      <div class="flask-5"></div>
    </div>

    <p v-for="item in items" :key="item.id">{{ item.name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import { Item } from '../types';
import { mapState } from 'vuex';
import JSON from '../Settings.json';

@Component({
	computed: mapState(['character']),
})
export default class Character extends Vue {
	// Typization of imported Vuex States and Actions
	private character!: string;
	private items: Array<Item> = [];

	mounted() {
		document.cookie = JSON.SessIDString;
		this.getItems();
	}

	// Gets items weared by character
	async getItems() {
		let datas = await Axios.get(
			`/character-window/get-items?character=${this.character}`,
			{ withCredentials: true }
		)
			.then(resp => {
				this.items = resp.data.items;
			})
			.catch(err => {
				if (err.response.status == 401) {
					console.log(
						'Banished - Unauthorized: POESESSID has expired or is wrong.'
					);
					// TODO: redirect to login?
				} else if (err.response.status == 404) {
					console.error(
						'Banished: cannot find the character you were looking for.',
						err
					);
				} else {
					console.error(err);
				}
			});
	}

	private sortInventoryItems() {
		if (!this.items) {
			return;
		}

		this.items.forEach(item => {
			console.log(item.inventoryId);
		});
	}
}
</script>

<style lang="scss" scoped>
.grid-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	grid-template-areas: '. . helmet amulet .' 'main-weapon left-ring body-armour right-ring off-weapon' '. . belt . .' 'gloves . . . boots';
}

.main-weapon {
	grid-area: main-weapon;
}

.helmet {
	grid-area: helmet;
}

.off-weapon {
	grid-area: off-weapon;
}

.body-armour {
	grid-area: body-armour;
}

.belt {
	grid-area: belt;
}

.gloves {
	grid-area: gloves;
}

.boots {
	grid-area: boots;
}

.right-ring {
	grid-area: right-ring;
}

.left-ring {
	grid-area: left-ring;
}

.amulet {
	grid-area: amulet;
}
</style>
