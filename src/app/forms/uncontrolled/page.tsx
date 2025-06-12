'use client';
// import './styles.scss';
import { useState, useMemo, useRef, useEffect } from 'react';

export default function Uncontrolled() {
  const [tvalue, setTValue] = useState('');
  const emailRef = useRef(null);
  const fruitRef: any = useRef(null);
  const [selectedFruit, setSelectedFruit] = useState('Apple');
  const fruits = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Banana', value: 'Banana' },
    { label: 'Orange', value: 'Orange' },
  ];
  const [animals, setAnimals] = useState([
    { label: 'Dog', value: 'Dog' },
    { label: 'Cat', value: 'Cat' },
    { label: 'Bird', value: 'Bird' },
  ]);

  const changeState = (e: any) => {
    setTValue(e.target.value);
  };
  const handleFruitChange = (e: any) => {
    setSelectedFruit(e.target.value);
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const fruit = formData.get('fruits');

    console.log('on sumbit unc', fruit);
  };

  useEffect(() => {
    console.log('selectedFruit', selectedFruit);
    if (selectedFruit === 'Banana') {
      setAnimals((prev: any) => {
        return [...prev, { label: 'Lion', value: 'Lion' }];
      });
    }
  }, [selectedFruit]);

  return (
    <div className='App'>
      <form onSubmit={onSubmitForm}>
        <input name='test' value={tvalue} onChange={changeState} />
        <input name='email' type='email' ref={emailRef} placeholder='Enter your email' />
        <select onChange={handleFruitChange} name='fruits' ref={fruitRef} defaultValue={'Apple'}>
          <option value='⬇️ Select a fruit ⬇️'> -- Select a fruit -- </option>
          {fruits.map((fruit: any, index: number) => (
            <option value={fruit.value} key={index}>
              {fruit.label}
            </option>
          ))}
        </select>
        <select onChange={handleFruitChange} name='fruits' ref={fruitRef}>
          <option value='⬇️ Select a animal ⬇️'> -- Select a animal -- </option>
          {animals.map((animal: any, index: number) => (
            <option value={animal.value} key={index}>
              {animal.label}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}
