import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email / Password',
      credentials: {
        username: {
          label: '이메일',
          type: 'text',
          placeholder: 'johndoe@test.com',
        },
        password: { label: '비밀번호', type: 'password' },
      },
      authorize: async (credentials, req) => {
        let url = process.env.SERVER_URL + '/api/getLoginChk'

        let res = await axios
          .get(url, {
            params: {
              email: credentials?.username,
              pw: credentials?.password,
            },
          })
          .then((response) => {
            console.log(response.data)
            const user = response.data.result

            if (user) {
              return user
            } else {
              return null
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              console.log(res)
              console.log('에러 :: API경로가 잘못되었습니다.')
            }
            return error
          })
        return res
      },
    }),
  ],
  session: {
    maxAge: 30 * 60, // 30 min
  },
  pages: {
    //signIn: '/signin',
    signOut: '/signin',
    error: '/signin',
  },
})
