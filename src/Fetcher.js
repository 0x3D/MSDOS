const fetch = window.fetch

export const getData = async (url, dataTable, condition) => {
  if (!condition) {
    condition = ''
  }
  const respons = await fetch(url + dataTable + condition)
  const data = await respons.json()
  return data
}

export const deleteData = async (url, dataTable, condition) => {
  if (!condition) {
    condition = ''
  }
  fetch(url + dataTable + condition, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
}

export const postData = async (url, dataTable, data) => {
  fetch(url + dataTable, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
}
