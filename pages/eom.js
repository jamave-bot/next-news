/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '../styles/EOM.module.css'

export function EOM({employee}) {
    console.log(employee)
    return (
        <div className='page-container'>
            <div className={styles.main}>
                <h1>Employee of the Month</h1>

                <div className={styles.employeeOfTheMonth}>
                    <h3>{employee.name}</h3>
                    <h6>{employee.position}</h6>
                    <img src={employee.image} alt='es me'/>
                    <p>{employee.description}</p>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async pageContext =>{
    const apiResponse = await fetch(
        'https://my-json-server.typicode.com/jamave-bot/next-news/employeeOfTheMonth',
    );

    const employee = await apiResponse.json();

    return {
        props: {
            employee //no need for the : employee since they have the same name
        }
    }
}

export default EOM;