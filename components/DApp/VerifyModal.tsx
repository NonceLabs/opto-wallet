import { i18n } from 'locale'
import _ from 'lodash'
import { Image, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { BasePreviewSignParams, ButtonType } from 'types'
import { formatUrlHost } from 'utils/format'
import Fonts from 'theme/Fonts'
import Button from 'components/common/Button'
import SheetHeader from 'components/common/SheetHeader'
import { Text, View } from 'components/Themed'
import useWallet from 'hooks/useWallet'
import SignParamsList from './SignParamsList'

export default function VerifyModal({
  project,
  isVerifying,
  previewVerifyParams,
  onCancel,
  onConfirm,
}: {
  project?: { title?: string; url?: string; logo?: string }
  isVerifying: boolean
  previewVerifyParams: BasePreviewSignParams
  onCancel: () => void
  onConfirm: () => void
}) {
  const { wallet } = useWallet()
  const insets = useSafeAreaInsets()
  const theme = useColorScheme()

  let title = project?.title
  if (!title) {
    title = formatUrlHost(project?.url)
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 20,
          backgroundColor: Colors[theme].modalBackground,
        },
      ]}
    >
      <SheetHeader title={title} />
      <View style={styles.content}>
        {!!project?.logo && (
          <Image
            source={{ uri: project.logo }}
            style={[
              styles.projectLogo,
              {
                borderColor: Colors[theme].borderColor,
              },
            ]}
          />
        )}
        <SignParamsList previewSignParams={[previewVerifyParams]} />
        {wallet?.isLedger && isVerifying && (
          <Text style={styles.ledgerTip}>
            {i18n.t('Please confirm on your Ledger device')}
          </Text>
        )}
      </View>
      <View style={styles.buttonGroup}>
        <Button
          label={i18n.t('Cancel')}
          style={{ marginRight: 10 }}
          filled={false}
          disabled={isVerifying}
          onPress={onCancel}
        />
        <Button
          label={i18n.t('Confirm')}
          type={ButtonType.PRIMARY}
          isLoading={isVerifying}
          filled={false}
          onPress={onConfirm}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonGroup: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  content: {
    padding: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  accessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  projectLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
  description: {
    fontSize: 24,
    fontFamily: Fonts.heading,
    textAlign: 'center',
    marginLeft: 8,
    marginBottom: 10,
  },
  gasLimit: {
    fontSize: 14,
    fontFamily: Fonts.variable,
  },
  ledgerTip: {
    fontSize: 16,
    fontFamily: Fonts.heading,
    textAlign: 'center',
    color: Colors.red,
    marginTop: 8,
  },
})
