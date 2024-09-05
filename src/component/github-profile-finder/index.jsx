import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import User from './user';
import './style.css'

export default function GithubProfileFinder() {

    const [UserName, setUserName] = useState('sangammukherjee');
    const [userData, setUserData]=  useState(null);
    const [loading, setLoading] = useState(false)

    //fonction pour recuperer les data a partir de l'api de github
    async function fetchGithubData() {
        setLoading(true)
        const res = await fetch(`https://api.github.com/users/${UserName}`)
        const data = await res.json();
        if (data) {
            setUserData(data)
            setLoading(false)
            setUserName('')
        }     
        console.log(data);
           
    }


    function handleSubmit() {
        fetchGithubData()
    }


    // useEffect(() => {
    //     fetchGithubData()
    // }, [])

    if (loading) {
        return <h1>Loding data ! Please wait</h1>
    }
  return (
    <div className='github-profile-container'>
        <div className="input-wrapper">
            <input
             name='search-by-name' 
             type="text"
             placeholder='Search Github Username....' 
             value={UserName}
             onChange={(event) => setUserName(event.target.value)}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
        {
            userData !== null ? <User user={userData}/>: null
        }
    </div>
  )
}
