<template>
    <div class="sw-inner">
        <div class="sw-search">
            <form class="sw-search__films">
                <label>
                    Search Film
                    <input
                        type="text"
                        v-model="searchFilm"
                        placeholder="A New Hope"
                    >
                </label>
            </form>
            <form class="sw-search__people">
                <label>
                    Search Person
                    <input
                            type="text"
                            v-model="searchPerson"
                            placeholder="Luke Skywalker"
                    >
                </label>
            </form>
            <form class="sw-search__starships">
                <label>
                    Search Starsip
                    <input
                            type="text"
                            v-model="searchSpaceShip"
                            placeholder="Executor"
                    >
                </label>
            </form>
        </div>
        <div class="sw-output">
            <div class="sw-output__list-wrapper">
                <ul class="sw-output__list" v-if="starwarsFilms">
                    <li class="sw-output__item"
                        v-for="(film, key) of starwarsFilms"
                        :key="key"
                    >Film №{{key}}: "{{film.title}}".</li>
                </ul>
                <Loader v-else-if="!starwarsFilms && searchFilm.trim().length > 1"/>
                <p v-else>Waiting for your query</p>
            </div>
            <div class="sw-output__list-wrapper">
                <ul class="sw-output__list" v-if="starwarsPeople">
                    <li
                            class="sw-output__item"
                            v-for="(person, key) of starwarsPeople"
                            :key="key"
                    >№{{key}} {{ person.name }}</li>
                </ul>
                <Loader v-else-if="!starwarsPeople && searchPerson.trim().length > 1"/>
                <p v-else>Waiting for your query</p>
            </div>
            <div class="sw-output__list-wrapper">
                <ul class="sw-output__list" v-if="starwarsSpaceShips">
                    <li
                            class="sw-output__item"
                            v-for="(ship, key) of starwarsSpaceShips"
                            :key="key"
                    >№{{key}} {{ship.name}}</li>
                </ul>
                <Loader v-else-if="!starwarsSpaceShips && searchSpaceShip.trim().length > 1"/>
                <p v-else>Waiting for your query</p>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
export default {
    name: "SWAPI",
    data: ()=>({
        searchFilm: '',
        searchPerson: '',
        searchSpaceShip: ''
    }),
    computed: {
        starwarsPeople(){
            try {
                let people = this.$store.getters.starwarsPeople;
                return people.filter(item => item.name.toLowerCase().match(this.searchPerson.toLowerCase()))
            }catch(e){}
        },
        starwarsFilms(){
            try{
                let films = this.$store.getters.starwarsFilms;
                return films.filter(item => item.title.toLowerCase().match(this.searchFilm.toLowerCase()))
            }catch(e){}
        },
        starwarsSpaceShips(){
            try {
                let spaceShips = this.$store.getters.starwarsSpaceShips;
                return spaceShips.filter(item => item.name.toLowerCase().match(this.searchSpaceShip.toLowerCase()))
            }catch(e){}
        }
    },
    components: {Loader},
    watch: {
         searchFilm() {
            if(this.searchFilm.trim().length > 1){
                this.$store.dispatch('fetchInfo')
            }
        },
        searchPerson() {
            if(this.searchPerson.trim().length > 1){
                this.$store.dispatch('fetchInfo')
            }
        },
        searchSpaceShip() {
            if(this.searchSpaceShip.trim().length > 1){
                this.$store.dispatch('fetchInfo')
            }
        }
    },
    async mounted(){}
}
</script>

<style scoped lang="scss">
.sw{
    &-inner{
        height: 100%;
    }
    &-search{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        form{
            width: 33.33%;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 0 5px;
            input{
                margin-top: 5px;
                height: 30px;
                padding: 2px 10px;
                margin-bottom: 8px;
                text-indent: 10px;
                border-radius: 2px;
                width: 100%;
            }
            label{
                text-align: center;
                font-weight: bold;
            }
        }
    }
    &-output {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        overflow: hidden;
        &__list {
            width: 100%;
            padding: 0 5px;
            overflow-y: scroll;
            height: 230px;
            margin-bottom: 10px;
            flex-grow: 1;
            &-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            }
        }
    }
}
</style>