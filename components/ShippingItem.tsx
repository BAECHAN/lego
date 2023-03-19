import React from 'react'
import { ShippingT } from 'types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axiosRequest from 'pages/api/axios'
import { useSession } from 'next-auth/react'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'

export default function ShippingItem(props: {
  shipping: ShippingT
  onOpen: any
}) {
  const session = useSession()
  const { data, isFetched, isFetching, refetch } = useDeliveryShippingList()

  const handleClickButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    if (type == 'update') {
      props.onOpen(event, props.shipping.shipping_id)
    } else if (type == 'delete') {
      if (props.shipping.shipping_default == 1) {
        alert(
          '기본 배송지는 삭제할 수 없습니다.\r기본 배송지를 변경 후 삭제해주시기 바랍니다.'
        )
        return false
      }

      if (confirm('배송지를 삭제하시겠습니까?') && session.data?.user?.email) {
        let param = {
          email: session.data?.user?.email,
          shippingId: props.shipping.shipping_id,
        }

        axiosRequest('patch', `http://localhost:5000/api/del-shipping`, param)
          .then((response) => {
            if (response?.status === 200) {
              alert('배송지를 삭제하였습니다.')
              refetch()
              return true
            }
          })
          .catch((error) => {
            console.log(error)
            alert(
              '배송지 삭제가 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
            )
            return false
          })
      } else {
        return false
      }
    } else {
    }
  }

  return (
    <div className="flex items-center text-center h-20">
      {/** 배송지 */}
      <div className="flex flex-col w-[15%]">
        <div>{props.shipping.recipient}</div>
        <div className="text-sm opacity-75">
          {props.shipping.shipping_name}님의 배송지
        </div>
      </div>

      <div className="w-[8%]">
        {props.shipping.shipping_default == '1' ? (
          <span className="text-blue-600">기본배송지</span>
        ) : null}
      </div>

      {/** 주소 */}
      <div className="w-1/2 text-left">
        <span>{props.shipping.shipping_address1}</span>
        <span>&nbsp;{props.shipping.shipping_address2}</span>
      </div>

      {/** 연락처 */}
      <div className="w-[15%]">
        <span>
          {props.shipping.tel_number.substring(0, 3)}-
          {props.shipping.tel_number.substring(3, 7)}-
          {props.shipping.tel_number.substring(7, 11)}
        </span>
      </div>

      {/** 버튼 */}
      <div className="w-1/6 flex items-center text-sm">
        <button
          type="button"
          className="flex h-8 leading-5 m-2 items-center"
          onClick={(event) => handleClickButton(event, 'update')}
        >
          수정
          <FontAwesomeIcon
            icon={faPenSquare}
            width="23px"
            height="23px"
            style={{ marginLeft: '3px' }}
          />
        </button>
        <button
          type="button"
          className="flex h-8 leading-5 m-2 items-center"
          onClick={(event) => handleClickButton(event, 'delete')}
        >
          삭제
          <FontAwesomeIcon
            icon={faTrashCan}
            width="23px"
            height="23px"
            style={{ marginLeft: '3px' }}
          />
        </button>
      </div>

      <style jsx>{`
        button {
          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;

          :hover {
            background-color: #000;
          }
        }
      `}</style>
    </div>
  )
}
