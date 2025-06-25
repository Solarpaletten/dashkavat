import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen p-4">
      <nav className="space-y-2">
        <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">
          Umsatzsteuer
        </a>
        <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">
          Bank Form
        </a>
        <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">
          Tax Form
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar