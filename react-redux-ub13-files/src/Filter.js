import React from 'react'
import _ from 'lodash'
import { useDispatch } from 'react-redux'

// const _onChange = (updateFilterTerm, event) => {
//     event.preventDefault()
//     updateFilterTerm(event.target.value) // Schickt den Filter-Term via props.filterFn nach 'oben'.
// }

const Filter = ({ updateFilterTerm, term }) =>{
    const dispatch = useDispatch()

    const onChange = event =>
        dispatch({ type: 'UPDATE_FILTER_TERM', filterTerm: event.target.value })

    //Aufruf wechseln auf neue onChange Funktion
    return (<form>
        <input type='text' placeholder='Liste Filtern mit...' value={ term } onChange={ onChange } />
    </form>)
}
    

export default Filter