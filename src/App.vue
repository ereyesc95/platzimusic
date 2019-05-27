<template lang="pug">
#app.form-group
	img(src='./assets/logo.png')
	h1 PlatziMusic
	select.form-control(v-model="selectedCountry")
		option(v-for="cou in countries" :value="cou.value") {{cou.name}} <!--No spaces between option and (-->
	select.form-control(v-model="selectedRes")
		option(v-for="res in results" :value="res.value") {{res.value}}
	spinner(v-show="loading")
	ul
		artistSection(v-for="art in artists" :artistData="art" :key="art.mbid")
</template>

<script>
import artistSection from './components/Artist.vue'
import spinner from './components/Spinner.vue'
import getArtists from './api'//index.js  Al ser index no es necesario llamarlo

export default {
	name: 'app',
	data () {
		return {
			artists:[], //arreglo de artistas, se almacena el .json
			countries:[
				{name:'Finland', value:'finland'},
				{name:'Norway', value:'norway'},
				{name:'Netherlands', value:'netherlands'},
			],
			selectedCountry:'norway',
			results:[
				{value:'10'},
				{value:'50'},
				{value:'100'}
			],
			selectedRes:'10',
			loading:true
		}
	},
	components:{
		artistSection,
		spinner
	},
	methods:{
		refreshArtist: function(){ //Llama de nuevo a la url con el nuevo valor
			const self=this; //Para este componente y no este objeto global
			this.loading=true;
			this.artists=[];
			getArtists(this.selectedCountry,this.selectedRes) //Obtiene el array de los artistas exportado en index.js
			.then(function (artArray){
				self.loading=false; //Art: array de los artistas almacenado en la variable 
				self.artists=artArray // Artists: nombre del arreglo vacio definido arriba
			})
		}
	},
	mounted(){
		this.refreshArtist();  //Cuando se cargue un componente
	},
	watch:{ //Cuando haya un cambio
		selectedCountry(){
			this.refreshArtist();
		},
		selectedRes(){
			this.refreshArtist();
		}
	}
}
</script>

<style lang="stylus">
#app
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color indigo !important
	margin-top 60px

h1, h2
	font-weight normal

ul
	list-style-type none
	padding 0

li
	display inline-block
	margin 0 10px

a
	color #42b983

.dataForm
	width 50%
</style>
