import config from './config'
//const apiKey = config.apiKey;
const { lastFmApiKey } = config
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&limit=:res&country=:country&api_key=${lastFmApiKey}&format=json`;

export default function getArtists(cou, res) {
    const modURL = URL.replace(':country', cou).replace(':res', res);
    return fetch(modURL)
        .then(res => res.json())
        .then(json => json.topartists.artist); //Regresa el array con todos los artistas
}