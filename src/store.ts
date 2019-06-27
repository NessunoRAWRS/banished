import Vue from 'vue';
import Vuex from 'vuex';
import { LoginPayload, SettingsType, Character } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		appName: 'Banished',
		version: '0.0.1',
		accountName: '',
		sessionId: '',
		league: '',
		character: '',
		charactersList: Array<Character>(),
		isLogged: false,
	},
	mutations: {
		setAccountName(state, accountName: string) {
			state.accountName = accountName;
		},
		setSessionId(state, sessionId: string) {
			state.sessionId = sessionId;
		},
		setLeague(state, league: string) {
			state.league = league;
		},
		setCharacter(state, character: string) {
			state.character = character;
		},
		setCharacters(state, characters: Array<Character>) {
			state.charactersList = characters;
		},
		setLoggedStatus(state, isLogged: boolean) {
			state.isLogged = isLogged;
		},
	},
	actions: {
		login(context, payload: LoginPayload) {
			context.commit('setAccountName', payload.accountName);
			context.commit('setSessionId', payload.sessionId);
			context.commit('setLeague', payload.league);
			context.commit('setCharacter', payload.character);
			context.commit('setLoggedStatus', payload.isLogged);
		},
		logout(context) {
			if (this.state.isLogged) {
				context.commit('setAccountName', null);
				context.commit('setSessionId', null);
				context.commit('setLeague', null);
				context.commit('setCharacter', null);
				context.commit('setLoggedStatus', false);
			}
		},
		setSessionId(context, sessionId: string) {
			context.commit('setSessionId', sessionId);
		},
		setCharacter(context, character: string) {
			context.commit('setCharacter', character);
		},
		setCharacters(context, characters: Array<Character>) {
			context.commit('setCharacters', characters);
		},
		saveSettings(context, settings: SettingsType) {
			context.commit('saveSettings', settings);
		},
	},
	getters: {
		isLogged: state => state.isLogged,
	},
});
