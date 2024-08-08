'use client';
import React, { useEffect, useState } from 'react';
import Former from "./former";
import Mui from './mui';

// Define interfaces for state and town objects
interface State {
  id: string;
  name: string;
}

interface Town {
  id: string;
  name: string;
}

const data = [
  { id: 1, amount: 30000, overview: "lorem" },
  { id: 2, amount: 60000, overview: "lorem" },
  { id: 3, amount: 90000, overview: "lorem" },
];

const dataTwo = [
  { id: 1, amount: 60000, overview: "lorem" },
  { id: 2, amount: 90000, overview: "lorem" },
  { id: 3, amount: 150000, overview: "lorem" },
];

const dataThree = [
  { id: 1, amount: 90000, overview: "lorem" },
  { id: 2, amount: 150000, overview: "lorem" },
  { id: 3, amount: 250000, overview: "lorem" },
];

const Form: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [loadingStates, setLoadingStates] = useState<boolean>(true);
  const [loadingTowns, setLoadingTowns] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('quarterly');
  const [inputValue, setInputValue] = useState<string>('text');
  const [selectedTown, setSelectedTown] = useState<string>('');

  useEffect(() => {
    {/*fetch states in nigeria*/}
    const fetchStates = async () => {
      try {
        const response = await fetch('https://nigeria-states-towns-lgas.onrender.com/api/states');
        const data: State[] = await response.json();
        setStates(data);
        setLoadingStates(false);
      } catch (error) {
        console.error('Error fetching states:', error);
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  {/*fetch the towns in a selected state */}
  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = e.target.value.toUpperCase();
    setSelectedState(stateId);
    setLoadingTowns(true);

    try {
      const response = await fetch(`https://nigeria-states-towns-lgas.onrender.com/api/${stateId}/towns`);
      const data: Town[] = await response.json();
      console.log('Fetched towns:', data);

      if (Array.isArray(data)) {
        setTowns(data);
      } else {
        console.error('Unexpected response format:', data);
        setTowns([]);
      }
      setLoadingTowns(false);
    } catch (error) {
      console.error('Error fetching LGAs:', error);
      setLoadingTowns(false);
    }
  };

{/*function to make it possible to edit "text" inside the input field */}
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };


  const handleTownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTown(e.target.value);
  };

  const getPlanData = () => {
    switch (selectedPlan) {
      case 'quarterly':
        return data;
      case 'biannual':
        return dataTwo;
      case 'annual':
        return dataThree;
      default:
        return data;
    }
  };

  const isButtonDisabled = selectedState === '' || selectedTown === '';

  return (
    <div className='form-container'>
      <div className='form-group'>
        <label htmlFor='state-select'>Select State:</label>
        <select id='state-select' onChange={handleStateChange} disabled={loadingStates}>
          <option value=''>Select state</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>


{/*map states in nigeria */}
      <div className='form-group'>
        <label htmlFor='lga-select'>Select LGA/City:</label>
        <select id='lga-select' onChange={handleTownChange} disabled={loadingTowns}>
          <option value=''>Select LGA/City</option>
          {towns.map((lga) => (
            <option key={lga.id} value={lga.id}>
              {lga.name}
            </option>
          ))}
        </select>
      </div>

{/*make a dynamic input field */}
      <div className='form-group'>
        <label htmlFor='input-field'>Input Field:</label>
        <input
          type='text'
          id='input-field'
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>


      <div className="flex gap-10 justify-center">
        <button onClick={() => setSelectedPlan('quarterly')}>Quarterly</button>
        <button onClick={() => setSelectedPlan('biannual')}>Biannual</button>
        <button onClick={() => setSelectedPlan('annual')}>Annual</button>
      </div>

{/*map towns in a state*/}
      <div className="flex justify-center">
        <div className="flex items-center justify-center gap-10">
          {getPlanData().map((item) => (
            <div key={item.id}>
              <p>{item.amount}</p>
              <p>{item.overview}</p>
            </div>
          ))}
        </div>
      </div>

{/*make a disabled button */}
      <button className='reusable-button' disabled={isButtonDisabled}>
        Submit
      </button>

      <Mui />
    </div>
  );
};

export default Form;
