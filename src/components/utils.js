const BASE_URL = 'http://120.48.17.78:8080/api'//'https://xuegong.twtstudio.com/api';

export const fetchData = async apiPath => {
    const response = await fetch(`${BASE_URL}/${apiPath}`);
    if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    if (json.error_code === 0) {
        return json.data;
    }
    throw Error(json.tips);
};
