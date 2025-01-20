import { Loader2 } from 'lucide-react'
import React from 'react'

const TableLoading = () => {
  return (
    <main className='w-full h-full flex items-center justify-center'>
        <Loader2 width={50} height={50} className='animate-spin' />
    </main>
  )
}

export default TableLoading