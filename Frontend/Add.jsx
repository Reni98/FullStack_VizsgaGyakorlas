import React, { useState } from 'react';
import axios from 'axios';


const MyForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Axios segítségével küldjük el a form adatait a szervernek
      await axios.post('http://localhost:5001/create-form-data', formData);
      console.log('Form data sent successfully');
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        id="first_name"
        placeholder="First name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="last_name"
        id="last_name"
        placeholder="Last name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <textarea
        type="text"
        name="message"
        id="message"
        cols="30"
        rows="10"
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <button type="submit" value="Send">Send</button>
    </form>
  );
};

export default MyForm;
