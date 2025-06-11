import React from 'react'

import './InstructionToast.css'

function InstructionToast() {
    return (
        // Outer container with a vibrant background to show the text's transparency
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-screen flex items-center justify-center">
            <h1
                className="
          clear-glass-text 
          text-7xl        
          md:text-8xl     
          lg:text-9xl
          font-extrabold   
          tracking-wider   
          leading-tight    
          select-none      
        "
            >
                test
            </h1>
        </div>
    )
}

export default InstructionToast
