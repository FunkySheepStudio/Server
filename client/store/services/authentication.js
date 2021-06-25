import {
  makeAuthPlugin
} from '../../plugins/feather'

const authPlugin = makeAuthPlugin({
  userService: 'users'
})

export default authPlugin
