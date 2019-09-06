import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		comments: [
			{
				name: "Вася",
				email: "vasya@mail.ru",
				text: "Сообщение от Василия Пупкина.",
				id: 1
			},
			{
				name: "Маруся",
				email: "marysia@mail.ru",
				text: "Всем привет, я Маруся",
				id: 2
			},
			{
				name: "Вася",
				email: "vasya@mail.ru",
				text: "Сообщение от, Василия Пупкина.",
				id: 3
			},
			{
				name: "Маруся",
				email: "marysia@mail.ru",
				text: "Всем привет, я Маруся",
				id: 4
			},
			{
				name: "Вася",
				email: "vasya@mail.ru",
				text: "Сообщение от, Василия Пупкина.",
				id: 5
			}
		]
	},
	getters: {
		getCommentById: (state) => (id) => {
			return state.comments.find(comment => comment.id === id)
		},
		getNextId: (state) => {
			const lastIndex = state.comments.length-1;
			return state.comments[lastIndex].id +1
		}
	},
	mutations: {
		addComment(state, payload) {
			state.comments.unshift(payload)
		}
	},
	actions: {
		addComment({commit}, comment) {
			commit('addComment', comment);
		}
	}
});




