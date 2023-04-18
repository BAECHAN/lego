import { ObjT_Str } from 'types'
import Layout from '../components/Layout'
import Image from 'next/image'

export default function Home({ data }: { data: ObjT_Str }) {
  return (
    <div className="min-h-[602px] m-10">
      <div className="flex justify-center">
        <div className="home-image">
          <Image src={data.imageUrl} alt="레고 홈 화면 이미지" layout="fill" />
        </div>
      </div>
      <div className="flex justify-center text-2xl mt-3">
        <h2>
          * 주의! 해당 사이트는 포트폴리오 제출용 사이트로 상업적 목적을 띄지
          않습니다.
        </h2>
      </div>
      <style jsx>{`
        .home-image {
          position: relative;
          overflow: hidden;
          width: 1600px;
          height: 500px;
        }

        @media (max-width: 1600px) {
          .home-image {
            width: 1400px;
          }
        }
      `}</style>
    </div>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getStaticProps() {
  // 빌드 타임에 이미지 데이터를 불러옵니다.
  const imageUrl = '/lego_main.jpeg'

  return {
    props: {
      data: {
        imageUrl,
      },
    },
  }
}
