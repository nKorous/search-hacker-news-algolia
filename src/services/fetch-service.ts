const BASE_URL: string = 'http://hn.algolia.com/api/v1/search?query='

export const fetchURL = (searchTerm: string ) => {
    const st = encodeURI(searchTerm)
    return fetch(BASE_URL + st)
}