import {serverUrl, api_key} from '../config/config';
import { AsyncStorage} from 'react-native';

const header = {
	"content-type" : "application/json"
};

const httpService = {
	 get(url){
			url = `${serverUrl}${url}${api_key}`;
			return fetch(url, {
		  method: 'GET',
		  headers: header
		})
	    .then(response => response.json()
			.catch(() => ({status: 204, message: 'No data found!'})))
	    .then(resJson => {
	    	if(resJson){
	    		return resJson;
	    	}
	    })
	    .catch(error => {
				return error;
	    });
	}

}

export default httpService;
