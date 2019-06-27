<template>
  <div id="login">
    <h2>Login</h2>
    <form>
      <div class="form-group">
        <label for="account-name">Account Name</label>
        <input
          type="text"
          v-model="accountName"
          @change="parseAccountName"
          @keydown.space="(e) => e.preventDefault()"
          class="form-field"
          v-bind:class="{ required: error.accountName }"
          name="account-name"
          id="account-name"
          placeholder="Enter your account name"
          autofocus
          required
        >
        <small v-if="error.accountName">Field is required</small>
      </div>

      <div class="form-group">
        <label for="session-id">PoE Session ID</label>
        <span
          class="help-badge"
          @click="$router.push('/faq/#session-id')"
          data-text="Click to open tutorial how to retrieve PoE Session ID"
        >?</span>
        <input
          type="text"
          v-model="sessionId"
          @change="() => error.sessionId = false"
          @keydown.space="(e) => e.preventDefault()"
          class="form-field"
          v-bind:class="{ required: error.sessionId }"
          name="session-id"
          id="session-id"
          placeholder="Enter your PoE Session ID"
        >
        <small v-if="error.sessionId">This field is required</small>
        <small>We'll never store and/or share your session id.</small>
      </div>

      <div class="form-group">
        <label for="league">League</label>
        <span
          class="help-badge"
          @click="toggleFilterByLeague"
          data-text="Filter characters by league"
        >?</span>
        <transition name="league-filter">
          <span class="filter-text" v-if="filterByLeague">Characters will be now filtered by league</span>
        </transition>
        <select
          v-model="selectedLeague"
          class="form-field"
          v-bind:class="{ required: error.league }"
          name="league"
          id="league"
        >
          <option v-for="league in leagues" :key="league.id" :value="league.id">{{ league.id }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="character">Select character</label>
        <select
          v-model="selectedChar"
          class="form-field"
          v-bind:class="{ required: error.character }"
          name="character"
          id="character"
          :disabled="characterControlDisabled"
        >
          <option v-for="char in charactersList" :key="char.name" :value="char.name">{{ char.name }}</option>
        </select>
      </div>
      <input type="submit" @click="validateForm" value="Login" class="btn btn-primary">
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import { mapState, mapActions } from 'vuex';
import { League, Character, LoginPayload } from '../types';

@Component({
	computed: { ...mapState(['isLogged']) },
	methods: mapActions(['logout']),
})
export default class Login extends Vue {
	// Typization of imported Vuex States and Actions
	isLogged!: boolean;
	logout!: (payload: any) => Promise<Event>;

	// Variables
	accountName: string | null = null;
	sessionId: string | null = null;
	leagues: Array<League> = [{ id: 'Loading...', realm: '' }];
	selectedLeague: string | null = null;
	charactersList: Array<Character> = [
		{
			name: 'Please, insert your account name',
			league: '',
			classId: -1,
			ascendacyClass: -1,
			class: '',
			level: -1,
			experience: -1,
		},
	];
	characterControlDisabled = true;
	selectedChar: string | null = null;
	filterByLeague: boolean = false;
	error = {
		accountName: false,
		sessionId: false,
		league: false,
		character: false,
	};

	// Methods
	async mounted() {
		this.getActiveLeagues();
		this.selectedChar = this.charactersList[0].name;
	}

	beforeMount() {
		this.selectedLeague = 'Loading...';
	}

	created() {
		if (this.isLogged) {
			this.logout({}).catch(err => console.error(err));
			//this.$store.dispatch('logout', {}).catch(err => console.error(err));
		}
	}

	private openTutorial() {
		this.$router.push('/faq/#session-id');
	}

	private toggleFilterByLeague() {
		this.filterByLeague = !this.filterByLeague;

		// TODO: filter by league
	}

	// Retrieves all actives leagues
	async getActiveLeagues() {
		await Axios.get('http://api.pathofexile.com/leagues')
			.then(resp => {
				resp.data.map((item: any) => {
					return {
						id: item.id,
						realm: item.realm,
					};
				});
				this.leagues = resp.data;
			})
			.catch(err => console.error(err));

		this.selectedLeague = this.leagues[0].id;
	}

	// Checks if the accountName exists
	private parseAccountName() {
		this.error.accountName = false;
		this.characterControlDisabled = true;

		if (this.accountName && this.accountName.length >= 3) {
			this.fetchCharacters();
		}
	}

	// Fetches all accountName's characters and shows them in the select box
	private async fetchCharacters() {
		if (
			this.accountName &&
			this.accountName.trim() != null &&
			this.accountName.trim() != ''
		) {
			let message = '';
			let data = await Axios.get(
				`/character-window/get-characters?accountName=${
					this.accountName
				}`
			)
				.then(response => response.data)
				.catch(error => {
					if (error.response.status == '403') {
						console.log('Banished: account is not set to public.');

						message = `Your account ${
							this.accountName
						} is not set to public.`;
						this.characterControlDisabled = true;
					} else if (error.response.status == '404') {
						console.log('Banished: resource not found');

						message = `Account ${this.accountName} not found.`;
						this.characterControlDisabled = true;
					} else {
						console.error(error);
					}
				});

			if (data) {
				// TODO: Look for league and set it in the select box.
				// FIXME: Maybe set character dependant on league selection?
				// 		  This way you only show available chars for that specific league.
				this.charactersList = data;
				this.selectedChar = this.charactersList[0].name;
				this.characterControlDisabled = false;
			} else {
				this.charactersList = [
					{
						name: message,
						league: '',
						classId: -1,
						ascendacyClass: -1,
						class: '',
						level: -1,
						experience: -1,
					},
				];
			}
		} else {
			console.warn(
				`getCharacters - parameter accountName cannot be null or empty. Value passed: ${
					this.accountName
				}.`
			);
		}
	}

	// Checks if forms is compiled and login the user
	private validateForm(e: Event) {
		e.preventDefault();

		if (!this.accountName) {
			this.error.accountName = true;
		}

		if (!this.sessionId) {
			this.error.sessionId = true;
		}

		if (!this.selectedLeague) {
			this.error.league = true;
		}

		if (!this.selectedChar) {
			this.error.character = true;
		}

		// Storing into Vuex global infos
		if (
			this.accountName &&
			this.sessionId &&
			this.selectedLeague &&
			this.selectedChar
		) {
			this.$store
				.dispatch('login', {
					accountName: this.accountName,
					sessionId: this.sessionId,
					league: this.selectedLeague,
					character: this.selectedChar,
					isLogged: true,
				})
				.then(() => {
					this.$store
						.dispatch('setCharacters', this.charactersList)
						.then(() => {
							// Login OK, redirecting to character page
							this.$router.replace('/character');
						});
				})
				.catch(err => console.error(err));
		}
	}
}
</script>

<style lang="scss" scoped>
#login {
	display: flex;
	flex-direction: column;

	.filter-text {
		margin-left: 0.5rem;
		font-size: 0.8rem;
		font-weight: 300;
		color: $primary;
		text-decoration: underline;
	}

	.league-filter-enter-active,
	.league-filter-leave-active {
		transition: opacity 0.3s;
	}

	.league-filter-enter,
	.league-filter-leave-to {
		opacity: 0;
	}
}
</style>