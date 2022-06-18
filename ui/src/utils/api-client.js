
const apiURL = 'http://192.168.1.15:8000/tracker'
async function client(
  endpoint,
  {data, method, headers: customHeaders, ...customConfig} = {}
) {
  const config = {
    method: method ? method : data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders
    },
    ...customConfig
  }
  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
