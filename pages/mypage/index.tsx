import Layout from '@components/Layout'
import React from 'react'

export default function MyPage() {
  return <div></div>
}

MyPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
