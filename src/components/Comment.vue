<template>
 <b-container>
   <b-row>
     <b-col class="d-flex flex-column align-items-center mt-5">
       <p>Пользователь: <b>{{comment.name}}</b></p>
       <p>Оставил следующий комментарий: <b>"{{comment.text}}"</b></p>
       <b-button @click="goBack">Назад</b-button>
     </b-col>
   </b-row>
 </b-container>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: "Comment",
		data() {
			return {
				comment: {}
			}
		},
    methods: {
			goBack(){
				this.$router.push({path: "/"})
      }
    },
		mounted() {
			this.comment = this.getCommentById(+this.$route.params.id);
		},
		computed: {
			...mapGetters([
				'getCommentById'
			])
		}
	}
</script>

<style scoped>

</style>