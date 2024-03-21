import { Session } from 'next-auth'

const mockSession: Session = {
  "user": {
    "id": "fakeID123",
    "chainId": 137,
    "address": "0x1234567890abcdef",
    "uri": "http://fakeurl.com/",
    "version": "1",
    "nonce": "fakeNonce123",
    "profileId": "0x1234567890abcdef1234567890abcdef",
    "payload": null,
    "accessToken": "fakeAccessToken123"
  },
  "expires": "2023-09-18T10:35:07.960Z"
}

export default mockSession
