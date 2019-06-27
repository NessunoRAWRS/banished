// Vuex
export interface Character {
	name: string;
	league: string;
	classId: number;
	ascendacyClass: number;
	class: string;
	level: number;
	experience: number;
}

export interface League {
	id: string;
	realm: string;
}

export interface Item {
	id: string;
	icon: string;
	ilvl: number;
	inventoryId: string;
	league: string;
	name: string;
	verified: boolean;
	w: number;
	h: number;
}

export interface LoginPayload {
	accountName: string;
	sessionId: string;
	league: string;
	character: string;
	isLogged: boolean;
}

export interface SettingsType {
	accountName: string;
	sessionId: string;
	character: Character;
	charactersList: Array<Character>;
}
