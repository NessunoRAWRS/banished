<template>
  <div id="settings">
    <h2>Settings</h2>
    <form>
      <div class="form-group">
        <label for="account">Account Name</label>
        <input
          v-model="temporarySettings.accountName"
          class="form-field"
          type="text"
          name="account"
          id="account"
          placeholder="Account Name"
          disabled
        >
      </div>

      <div class="form-group">
        <label for="session-id">PoE Session ID</label>
        <input
          v-model="temporarySettings.sessionId"
          class="form-field"
          type="text"
          name="session-id"
          id="session-id"
          placeholder="PoE Session ID"
        >
      </div>

      <div class="form-group">
        <label for="league">League</label>
        <select
          v-model="temporarySettings.league"
          class="form-field"
          type="text"
          name="league"
          id="league"
          :disabled="!isLogged"
        ></select>
      </div>

      <div class="form-group">
        <label for="character">Character</label>
        <select
          v-model="temporarySettings.character"
          class="form-field"
          type="text"
          name="character"
          id="character"
          :disabled="!isLogged"
        >
          <option
            v-for="char in temporarySettings.charactersList"
            :key="char.name"
            :value="char.name"
            :selected="showCurrentChar()"
          >{{ char.name }}</option>
        </select>
      </div>

      <input type="submit" @click.prevent="validateForm" value="Save" class="btn btn-primary right">
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { SettingsType, Character } from '../types';

@Component({
	computed: {
		...mapState([
			'appName',
			'accountName',
			'sessionId',
			'character',
			'charactersList',
			'league,',
			'isLogged',
		]),
	},
	methods: mapActions(['setSessionId', 'setCharacter']),
})
export default class Settings extends Vue {
	// Typization of imported Vuex States and Actions
	appName!: string;
	accountName!: string;
	isLogged!: boolean;
	sessionId!: string;
	league!: string;
	character!: Character;
	charactersList!: Array<Character>;
	setSessionId!: (sessionId: string) => void;

	// Variables
	temporarySettings: SettingsType = {
		accountName: '',
		sessionId: '',
		character: {
			name: '',
			league: '',
			classId: -1,
			ascendacyClass: -1,
			class: '',
			level: -1,
			experience: -1,
		},
		charactersList: new Array<Character>(),
	};

	// Methods
	mounted() {
		this.temporarySettings = {
			accountName: this.accountName,
			sessionId: this.sessionId,
			character: this.character,
			charactersList: this.charactersList,
		};
	}

	private validateForm() {
		// TODO: check every node, optionals can be skipped through
		if (this.temporarySettings) {
			this.setSessionId(this.temporarySettings.sessionId);
		}
	}

	// Selects the current char in the Character control
	private showCurrentChar() {
		if (this.isLogged) {
			return true;
		}
		return false;
	}
}
</script>

<style lang="scss" scoped>
#settings {
	display: flex;
	flex-direction: column;
}
</style>
