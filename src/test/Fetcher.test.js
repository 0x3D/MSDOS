import '@testing-library/jest-dom/extend-expect'
import { getData } from '../Fetcher'

test('Should fetch a user with apartmentNumber 3', async () => {
  const url = 'http://localhost:8000/'
  const table = 'users/'
  const condition = '?apartmentNo=3'
  const data = await getData(url, table, condition)
  expect(data[0].apartmentNo).toEqual(3)
})

test('Should fetch a user with email laurie.kutch@yahoo.com', async () => {
  const url = 'http://localhost:8000/'
  const table = 'users/'
  const condition = '?apartmentNo=3'
  const data = await getData(url, table, condition)
  expect(data[0].email).toEqual('laurie.kutch@yahoo.com')
})

test('Should fetch a user with role user', async () => {
  const url = 'http://localhost:8000/'
  const table = 'users/'
  const condition = '?apartmentNo=3'
  const data = await getData(url, table, condition)
  expect(data[0].role).toEqual('user')
})

test('Should fetch a user with role admin', async () => {
  const url = 'http://localhost:8000/'
  const table = 'users/'
  const condition = '?apartmentNo=7'
  const data = await getData(url, table, condition)
  expect(data[0].role).toEqual('admin')
})

test('Should fetch a user with id = 7', async () => {
  const url = 'http://localhost:8000/'
  const table = 'users/'
  const condition = '?apartmentNo=7'
  const data = await getData(url, table, condition)
  expect(data[0].id).toEqual(7)
})

test('Shouldent fetch a user at all with this conditions', async () => {
  const url = 'http://localhost:8000/'
  const table = 'users/'
  const condition = '?apartmentNo=70'
  const data = await getData(url, table, condition)
  expect(data).toEqual([])
})
