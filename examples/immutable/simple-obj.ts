import { Record } from 'immutable'

class ObjRec extends Record<{
  id: number
  gender: 1 | 2
  name: string
  families: {
    name: string
    gender: 1 | 2
    role: 1 | 2 | 3 | 4
    id: number
  }[]
}>({
  id: -1,
  gender: 1,
  name: '',
  families: [],
}) {}

const a1 = new ObjRec({
  id: 1,
  gender: 1,
  name: 'kk',
  families: [],
})

console.log('a1', a1.toJSON())

const a2 = a1.setIn(['families', 1], { id: 2, gender: 2, name: 'll', role: 1 })

console.log('a2', a2.toJSON())

const a3 = a2.mergeDeep({ families: [{ name: 'uv', id: 3, gender: 1, role: 3 }] })

console.log('a3', a3.toJSON())

const a4 = a3.updateIn(['families', 0], (value) => {
  return { id: 4, gender: 1, name: 'jl', role: 4 }
})

console.log('a4', a4.toJSON())

/**
 * eg:
 *
 * box.setItem()
 */
