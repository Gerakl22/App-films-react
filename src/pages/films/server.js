import { makeRequest } from '../../common/utils/makeRequest';

export const getFilm = () => makeRequest('/films');

export const addFilm = (filmToAdd) => makeRequest("/films", "POST", filmToAdd);

export const editFilm = (filmId, fieldsChange) => makeRequest((`/films/${filmId}`), "PATCH", fieldsChange);

export const deleteFilm = (filmId) => makeRequest((`/films/${filmId}`), "DELETE");



