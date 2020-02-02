// TODO: useEffect von react importieren
import React, {useEffect} from 'react'
// TODO: useDispatch importieren (analog useSelector)
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import './css/style.css'

import Filter from './Filter'
import Movie from './Movie'

/**
 * Filtert die Liste abhängig vom Term. Der Term wird in allen Properties
 * des Movie-Objektes gesucht.
 * 
 * @param {array} movies Die Liste der Filme
 * @param {string} term Der String nachdem gefiltert werden soll
 * @return {array} Die gefilterte Liste der Filme
 */
const filter = (movies, term) => {
    let filterTerm = '^(?=.*' + _.trim(term).split(/\s+/).join(')(?=.*') + ').*$'
    let pattern = RegExp(filterTerm, 'i')

    return _.filter(movies, movie => 
            pattern.test(_.join([movie.year, movie.director, movie.title], ' ')))
}

/**
 * Die Root Komponente App.
 * 
 * @return {jsx} Das zu rendernde Element
 */
const App = () => {
    const movies = useSelector(state => state.movies, _.isEqual)
    const filterTerm = useSelector(state => state.filterTerm, _.isEqual)

    // TODO: Dispatcher holen: const dispatch = ... (analog useSelector)
    const dispatch = useDispatch()

    // TODO: Fetch-Call (Daten holen) wird als Thunk Function dispatched (siehe Folien Redux).
    const data = () => {
        dispatch(
            async dispatch => {
                dispatch({ type: 'LOADING_MOVIES'})
                const response = await fetch('https://softwarelab.ch/api/public/v1/movies')
                const data = await response.json()
                dispatch({ type: 'MOVIES_LOADED', movies: data})
            }
        )
    }
    // TODO: useEffect verwenden (analog componentDidMount) und Daten holen.
    useEffect(data, [])

    return <main>
        <Filter filterTerm={ filterTerm } />
        { _.map(filter(movies, filterTerm), movie => <Movie key={ movie.rank } data={ movie } />) }
    </main>
}

export default App
