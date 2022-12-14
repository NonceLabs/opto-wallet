import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { RootStackParamList } from 'types'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'https://optowallet.com', 'opto://'],
  config: {
    screens: {
      Root: {
        screens: {
          Home: 'Home',
          Settings: 'Settings',
        },
      },
      NotFound: '*',
      DAppView: 'DAppView',
    },
  },
}

export default linking
