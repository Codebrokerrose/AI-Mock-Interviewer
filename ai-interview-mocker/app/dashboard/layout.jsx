import React from 'react'
import Header from './_component/Header'

function DashboardLayout({ children }) {
  return (
    <div>
        <Header/>
      {children}
    </div>
  )
}

export default DashboardLayout
