import axios from 'axios';

const events = (state = [], action) => {
  if(action.type === 'SET_EVENTS'){
    state = action.events;
  }
  return state;
}

export const fetchEvents = () => {
  return async(dispatch) => {
    const response = await axios.get('/api/events');
    dispatch({ type: 'SET_EVENTS', events: response.data })
  }
}

export default events;