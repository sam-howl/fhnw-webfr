/**
 * Eine Funktion, welche den Fetch-Request absetzt und die entsprechenden
 * Actions an den Store dispatched.
 * 
 * @param {string} url Der URL
 * @param {object} requestObject Das Objekt mit den Headern, Methoden (wenn nicht GET) (Optional)
 * @param {string} actionType Der Action-Type
 * @param {string} errorText Den Fehlertext
 * @return {function} Die Dispatch Funktion für Redux-Thunk
 */
const doFetch = ({ url, requestObject, actionType, errorText }) => 
    async dispatch => {
        try {
            dispatch({ type: 'LOADING', data: true })
            const response = await fetch(url, requestObject)
            if(response.ok) {
                // Mit leerem Response umgehen:
                const json = response.status !== 204 ? await response.json() : null
                dispatch({ type: actionType, data: json })
                dispatch({ type: 'ERROR', data: false })
                dispatch({ type: 'MESSAGE', data: '' })
            }
            else {
                throw new Error(`${ errorText }: ${ response.status }`)
            }
        }
        catch(error) {
            dispatch({ type: 'ERROR', data: true })
            dispatch({ type: 'MESSAGE', data: error.message })
        }
        dispatch({ type: 'LOADING', data: false })
    }

export default doFetch