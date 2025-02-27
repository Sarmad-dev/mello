'use client'

import { OAuthStrategy } from '@clerk/types'
import { useSignIn, useSignUp } from '@clerk/nextjs'

export function useOAuth() {
  const { signIn } = useSignIn()
  const { signUp, setActive } = useSignUp()

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: '/auth/sso-callback',
      redirectUrlComplete: '/dashboard',
    })
  }

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null

    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === 'transferable' &&
      signUp.verifications.externalAccount.error?.code === 'external_account_exists'

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true })

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        })
      }
    }

    const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable'

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      })

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        })
      }
    } else {
      signInWith(strategy)
    }
  }

  return {
    handleSignIn
  }
}