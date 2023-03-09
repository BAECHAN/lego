import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import ButtonChange from './ButtonChange'
import Image from 'next/image'
import ButtonSave from './ButtonSave'

export default function UserInfoContentsLine(props: {
  infoKey: string
  infoName: string
  infoValue?: any
  infoUpdate: boolean
  email: string
}) {
  const [isChange, setIsChange] = useState(false)
  const [value, setValue] = useState(props.infoValue)
  const [newValue, setNewValue] = useState('')
  const [isEnter, setIsEnter] = useState(false)

  const infoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (infoInputRef && infoInputRef.current) {
      infoInputRef.current.focus()
    }
  }, [isChange])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEnter(true)
    }
  }
  return (
    <>
      <div
        className={`user-info-line flex w-full ${
          props.infoKey == 'image' ? 'h-56' : ''
        } my-4`}
      >
        <div className="user-info-cell flex w-full items-center">
          <div className="info-name w-1/6">
            <span>{props.infoName}</span>
          </div>

          <div className="w-1/6" />

          <div className="info-value">
            {props.infoKey == 'image' ? (
              <Image
                src={props.infoValue}
                width="200px"
                height="200px"
                alt="프로필 사진"
              ></Image>
            ) : isChange ? (
              <div className="info-update-contents">
                {props.infoKey == 'name' ? (
                  <>
                    <ul className="text-xs">
                      <li>※ 2~16자로 작성해주세요.</li>
                      <li>※ 중복 닉네임은 불가합니다.</li>
                      <li>※ 특수문자, 단일 초성은 불가합니다.</li>
                    </ul>
                    <input
                      type="text"
                      placeholder={`새로운 ${props.infoName} 등록`}
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid black',
                      }}
                      onChange={(e) => setNewValue(e.target.value)}
                      ref={infoInputRef}
                      onKeyDown={handleKeyDown}
                    />
                    <ButtonSave
                      infoKey={props.infoName}
                      email={props.email}
                      isChange={isChange}
                      setIsChange={setIsChange}
                      setValue={setValue}
                      setNewValue={setNewValue}
                      newValue={newValue}
                      isEnter={isEnter}
                      setIsEnter={setIsEnter}
                    />
                  </>
                ) : props.infoKey == 'password' ? (
                  <>
                    <ul className="text-xs">
                      <li>
                        ※ 8~16자 영문 대 소문자,
                        <br /> 숫자, 특수문자로 작성해주세요.
                      </li>
                    </ul>
                    <div className="flex flex-col info-update-password">
                      <input
                        type="text"
                        placeholder={`현재 ${props.infoName} 입력`}
                        style={{
                          backgroundColor: 'white',
                          border: '1px solid black',
                        }}
                        ref={infoInputRef}
                      />
                    </div>
                  </>
                ) : (
                  <p>이 구간부터는 배송지일듯? 수정 필요</p>
                )}
              </div>
            ) : (
              <p>{value}</p>
            )}
          </div>

          <div className="flex-grow" />

          <div className="info-update-button flex w-2/6 flex-row-reverse">
            {props.infoUpdate ? (
              isChange ? null : (
                <ButtonChange
                  infoKey={props.infoName}
                  isChange={isChange}
                  setIsChange={setIsChange}
                />
              )
            ) : null}
          </div>
          <div className="w-1/6" />
        </div>
      </div>
      <hr />
      <style jsx>{`
        .info-update-contents > * {
          margin-bottom: 12px;
        }

        .info-update-password > * {
          margin: 8px 0px;
        }
      `}</style>
    </>
  )
}
