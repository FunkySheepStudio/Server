import { openDB } from 'idb'

export async function getUnityId () {
  const db = await openDB('/idbfs')
  const keys = await db.getAllKeys('FILE_DATA')

  let id = 'test'

  for (const key of keys) {
    const value = await db.get('FILE_DATA', key)
    const prefs = new TextDecoder('utf-8').decode(value.contents)
    id = prefs.substring(prefs.indexOf('user$') + 5)
  }
  return id
}
