// React oldal
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormDataTable = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        // Axios segítségével lekérjük az adatokat a szerverről
        axios.get('http://localhost:5001/getFormData')
        .then(response => {
            const filteredData = response.data.filter(data =>
                data.first_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFormData(filteredData);
        })
        .catch(error => {
            console.error('Error fetching form data:', error);
        });
}, [searchTerm]);


    

    return (
        <div>
            <h1>Adatbázis tartalom</h1>
            <input
                type="text"
                placeholder="Keresés név alapján"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map(data => (
                        <tr key={data.id}>
                            <td>{data.first_name}</td>
                            <td>{data.last_name}</td>
                            <td>{data.message}</td>
                        </tr>
                    ))}



                </tbody>
            </table>
        </div>
    );
};

export default FormDataTable;
