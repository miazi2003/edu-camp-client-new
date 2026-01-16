import React, { useEffect, useState } from 'react';

const ToggleTheme = () => {

    const [themes ,  setThemes] =  useState(()=>{
        return localStorage.getItem("theme") || "light"
    })



    useEffect(()=>{
        const root = document.body;
        if( themes === "dark" ){
            root.classList.add("dark")
        }else{
            root.classList.remove("dark");
        }

        localStorage.setItem("theme" , themes)
    },[themes])


  const themeToggle = () => {
    setThemes(prev => (prev === 'light' ? 'dark' : 'light'));
  };

    return (
    <div>
    

    <input type="checkbox" checked={themes === 'dark'} className="toggle" onChange={themeToggle}  />

    </div>
    );
};

export default ToggleTheme;