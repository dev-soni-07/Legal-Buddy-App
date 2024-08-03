import Layout from '@/components/admin/base/Layout'
import Clients from '@/components/admin/page/Clients'
import React from 'react'

function clientPage() {
  return (
    <Layout className='bg-slate-800'>
        <Clients />
    </Layout>
  )
}

export default clientPage