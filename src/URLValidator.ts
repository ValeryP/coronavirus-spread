const corsProxy = 'https://cors-anywhere.herokuapp.com/'

export function validateURL(url: string): Promise<boolean> {
    return fetch(corsProxy + url, {method: 'GET'})
        .then(res => res.ok)
        .catch(err => {
            console.error(err)
            return false
        })
}