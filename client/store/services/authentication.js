import {
  makeAuthPlugin
} from '../../plugins/feather'

const authPlugin = makeAuthPlugin({
  userService: '/api/system/users'
})

export default authPlugin
