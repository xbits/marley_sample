import axios from 'axios';

const DOMAIN = "https://cdn.contentful.com";
const MARLEY_SPACE = 'kk2bw5ojx476';
const ACCESS_TOKEN = "7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c";
const ENVIRONMENT = "master";
const BASE_URL = DOMAIN + '/spaces/' + MARLEY_SPACE + '/environments/' + ENVIRONMENT;

export default class MarleyApi {

    static getImageUrl(id, params) {
        console.log("REQUESTING IMG", id)
        return this.get( '/assets/'+id,  params).then(res=>{console.log("phorto res", res);return res.fields.file.url});
    }

    static getEntries(type, params){
        params = {content_type: type, ...params};
        return this.get( '/entries', params);
    }

    static getEntry(id, params){
        return this.get('/entries/'+id, params);
    }

    static getEntriesByIds(ids, params){
        params = {"sys.id[in]": ids.join(','), ...params};
        return this.get( '/entries', params);
    }

    static get(subPath, params){
        params = {...params, access_token: ACCESS_TOKEN};
        return axios.get(BASE_URL + subPath, {params: params}).then(res=>{return res.data});
    }
}