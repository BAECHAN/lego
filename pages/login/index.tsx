import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'

export default function Login() {
  return (
    <div className="flex justify-center items-center w-full bg-gray-200 h-[38rem]">
      <form name="loginForm" className="h-full relative top-[20%]">
        <div id="loginBox" className="login-box">
          <Link href="/">
            <a>
              <Image
                src="/main.svg"
                width="50px"
                height="50px"
                alt="메인으로"
              />
            </a>
          </Link>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <button>로그인</button>
          <div className="flex text-xs w-72">
            <Link href="/login/create_account">
              <a className="hover:underline">회원가입</a>
            </Link>
            <div className="flex-grow" />
            <Link href="/login/find_account">
              <a className="hover:underline">계정 찾기</a>
            </Link>
            <Link href="/login/find_password">
              <a className="hover:underline">비밀번호 찾기</a>
            </Link>
          </div>
        </div>
      </form>
      <style jsx>{`
        .login-box {
          min-width: 400px;
          vertical-align: middle;
          border: 1px solid gray;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;

          * {
            margin: 10px;
          }

          input {
            width: 330px;
            height: 35px;
            border: solid gray 1px;
            display: inline-block;
            padding: 5px;
          }
          button {
            box-sizing: border-box;
            outline: 0;
            border: 0;
            margin: 0;
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
          }
          button:hover {
            background-color: black;
            color: white;
          }
        }
      `}</style>
    </div>
  )
}

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
