import React, { useEffect } from 'react'

export default function Default() {
    useEffect(() => {
      localStorage.clear();
    }, [])
    
  return (
    <div>
      
    </div>
  )
}
