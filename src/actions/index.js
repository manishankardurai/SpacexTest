import { GET_DATA } from '../modules/home/actions';
import triggerSimpleAjax from './triggerAPI'

export const getSpaceLaunchData = () => {
    return dispatch =>
        new Promise((res, rej) => {
            triggerSimpleAjax(
                'https://api.spaceXdata.com/v3/launches?limit=100',
                'GET',
                {},
                response => {
                    dispatch({
                        type: 'GET_DATA',
                        payload: response,
                    });
                    res(response);
                },
                error => {
                    dispatch({
                        type: 'ERROR_GET_DATA',
                        payload: error.response ? error.response.status : 'Failed'
                    });
                    rej('Failed');
                }
            );
        })
}


export const FilterSpaceLaunchData = (url) => {
    return dispatch =>
        new Promise((res, rej) => {
            console.log('triggereing in filter function')
            dispatch({
                type: 'SHOW_LOADING'
            })
            triggerSimpleAjax(
                url,
                'GET',
                {},
                response => {
                    dispatch({
                        type: 'GET_DATA',
                        payload: response,
                    });
                    dispatch({
                        type: 'HIDE_LOADING'
                    })
                    res(response);
                },
                error => {
                    dispatch({
                        type: 'ERROR_GET_DATA',
                        payload: error.response ? error.response.status : 'Failed'
                    });
                    dispatch({
                        type: 'HIDE_LOADING'
                    })
                    rej('Failed');
                }
            );
        })
}
