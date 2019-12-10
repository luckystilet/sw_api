import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        starwarsPeople: {},
        starwarsFilms: {},
        starwarsShips: {}
    },
    mutations: {
        setSWData(state, newState){
            state.starwarsPeople = newState.starwarsPeople;
            state.starwarsFilms = newState.starwarsFilms;
            state.starwarsShips = newState.starwarsShips;
        }
    },
    getters: {
        starwarsPeople: state => state.starwarsPeople,
        starwarsSpaceShips: state => state.starwarsShips,
        starwarsFilms: state => state.starwarsFilms
    },
    actions: {
         async fetchInfo({commit}){
            function getAllStarwarsField(type) {
                let typeArr = [];
                return axios(`https://swapi.co/api/${type}/`)
                    .then(response => {
                        typeArr = response.data.results;
                        return response.data.count;
                    })
                    .then(count => {
                        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
                        let promises = [];
                        for (let i = 2; i <= numberOfPagesLeft; i++) {
                            promises.push(axios(`https://swapi.co/api/people?page=${i}`));
                        }
                        return Promise.all(promises);
                    })
                    .then(response => {
                        typeArr = response.reduce((acc, data) => [...acc, ...data.data.results], typeArr);
                        return typeArr;
                    })
                    .catch(error => console.log("Properly handle your exception here"));
            }
            let starwarsPeople = await getAllStarwarsField('people');
            let starwarsFilms = await getAllStarwarsField('films');
            let starwarsShips = await getAllStarwarsField('starships');
            commit('setSWData', {starwarsPeople, starwarsFilms, starwarsShips})
         }
    }

})