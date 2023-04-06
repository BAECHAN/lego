import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import crypto from 'crypto-js'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export default function Login() {
  const [isShowPw, setIsShowPw] = useState<boolean>(false)

  const router = useRouter()

  const handleClickEye = () => {
    setIsShowPw(!isShowPw)

    isShowPw
      ? document.getElementById('password')?.setAttribute('type', 'password')
      : document.getElementById('password')?.setAttribute('type', 'text')
  }

  const login = async (e: any) => {
    // 원래 실행되는 이벤트 취소
    e.preventDefault()
    // Form 안에서 이메일, 패스워드 가져오기
    let email = e.target.email.value
    let password = e.target.password.value

    if (!email) {
      alert('이메일 주소를 입력해주세요.')
      document.getElementById('email')?.focus()
      return false
    } else if (!password) {
      alert('비밀번호를 입력해주세요.')
      document.getElementById('password')?.focus()
      return false
    }

    const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY
    if (secretKey !== undefined) {
      password = crypto.HmacSHA512(password, secretKey).toString()
    } else {
      alert('secretKey is undefined')
      return false
    }

    const response = await signIn('email-password-credential', {
      email,
      password,
      redirect: false,
    })

    if (response !== undefined) {
      if (response.ok) {
        if (
          router.query.callbackUrl != undefined &&
          router.query.callbackUrl.indexOf('account') < 0
        ) {
          router.back()
        } else {
          router.push('/')
        }
      } else {
        if (response.status === 401) {
          alert('아이디 혹은 패스워드를 확인하세요.')
          document.getElementById('password')?.focus()
          return false
        }
      }
    }
  }

  const loginKakao = async (e: any) => {
    e.preventDefault()
    await signIn('kakao')
  }

  const loginGoogle = async (e: any) => {
    e.preventDefault()
    await signIn('google')
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full bg-gray-200 h-[44rem]">
        <div className="h-full relative top-[3%]">
          <form onSubmit={login} className="login-box">
            <Link href="/">
              <a title="홈페이지로 이동 링크">
                <Image
                  src="/main.svg"
                  width="50px"
                  height="50px"
                  alt="메인으로"
                />
              </a>
            </Link>
            <label>
              이메일 주소
              <br />
              <input
                type="email"
                title="이메일 입력란"
                name="email"
                id="email"
                placeholder="예) lego@lego.co.kr"
                autoComplete="off"
              />
            </label>
            <label>
              비밀번호
              <br />
              <input
                type="password"
                title="비밀번호 입력란"
                name="password"
                id="password"
                autoComplete="off"
              />
              {isShowPw ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={handleClickEye}
                  cursor="pointer"
                  className="w-5 relative ml-[304px] -mt-[26px]"
                ></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={handleClickEye}
                  cursor="pointer"
                  className="w-5 relative ml-[304px] -mt-[26px]"
                ></FontAwesomeIcon>
              )}
            </label>

            <button
              type="submit"
              title="로그인 버튼"
              className="login-btn-credential"
            >
              로그인
            </button>

            <div className="flex text-xs w-72 justify-between">
              <Link href="/login/create_account">
                <a title="회원가입 페이지로 이동" className="hover:underline">
                  회원가입
                </a>
              </Link>
              <div className="flex-grow" />
              <Link href="/login/find_account">
                <a
                  title="이메일 찾기 페이지로 이동"
                  className="hover:underline mr-3"
                >
                  계정 찾기
                </a>
              </Link>
              <Link href="/login/find_password">
                <a
                  title="비밀번호 찾기 페이지로 이동"
                  className="hover:underline"
                >
                  비밀번호 찾기
                </a>
              </Link>
            </div>
          </form>

          <div className="sns-login-title">
            <span>SNS 계정으로 로그인</span>
          </div>
          <button
            onClick={loginKakao}
            className="flex justify-center login-btn-oauth relative left-9"
          >
            <Image
              src="/kakao_login_medium_wide.png"
              width="328px"
              height="50px"
              alt="카카오계정으로 로그인"
              quality={100}
            ></Image>
          </button>
          <button
            onClick={loginGoogle}
            className="flex justify-center login-btn-oauth relative left-8"
          >
            <Image
              src="/btn_google_signin_light_normal_web.png"
              width="335px"
              height="50px"
              alt="구글계정으로 로그인"
              quality={100}
            ></Image>
          </button>
        </div>
      </div>
      <style jsx>{`
        .sns-login-title {
          text-align: center;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: 0;
          font: inherit;
          vertical-align: baseline;
          margin-bottom: 24px;
          color: #585252;

          span:after,
          span:before {
            content: '';
            display: inline-block;
            width: 32px;
            height: 1px;
            background-color: #585252;
            position: relative;
            top: -4px;
            margin: 0px 5px;
            transform: translateY(-50%);
          }
        }

        .login-btn-oauth {
          margin-bottom: 20px;
          :hover {
            cursor: pointer;
            position: relative;
            top: 3px;
          }
        }

        .login-btn-google {
          width: 328px;
          background-color: #ffffff;
          position: relative;
          left: 36px;
          border-radius: 3px;

          :focus {
            border: 3px solid black;
          }
        }

        .login-box {
          min-width: 400px;
          vertical-align: middle;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;

          > * {
            margin: 8px 0px;
          }

          input {
            width: 330px;
            height: 35px;
            border: solid gray 1px;
            display: inline-block;
            padding: 5px;
          }
          button.login-btn-credential {
            margin-top: 17px;
            box-sizing: border-box;
            outline: 0;
            border: 0;
            cursor: pointer;
            user-select: none;
            vertical-align: middle;
            -webkit-appearance: none;
            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
            font-weight: 500;
            font-size: 0.875rem;
            letter-spacing: 0.02857em;
            text-transform: uppercase;
            min-width: 330px;
            padding: 6px 16px;
            border-radius: 4px;
            transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            color: black;
            text-decoration: none;
            background-color: rgb(255, 207, 0);

            :hover,
            :focus {
              background-color: black;
              color: white;
            }
          }
        }
      `}</style>
    </div>
  )
}

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
