import { openDB } from 'idb'

export function getUnityId () {
  return openDB('/idbfs')
    .then((db) => {
      return db.getAllKeys('FILE_DATA')
        .then(async (keys) => {
          let id = ''
          for (const key of keys) {
            const value = await db.get('FILE_DATA', key)
            const prefs = new TextDecoder('utf-8').decode(value.contents)
            id = prefs.substring(prefs.indexOf('user$') + 5)
          }
          return id
        })
    })
    .catch(() => {
      return ''
    })
}
