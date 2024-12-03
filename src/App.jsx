import { useState } from 'react';

function App() {
  const [tax, setTax] = useState(0);
  const [income, setIncome] = useState('');
  const [inhand, setInhand] = useState(0);

  const calculateTax = (income) => {
    const totalTaxes = income - calculateInhand(income);
    return totalTaxes;
  };

  const calculateInhand = (income) => {
    const slab1 = (400000 * 5) / 100;
    const slab2 = (300000 * 10) / 100;
    const slab3 = (200000 * 15) / 100;
    const slab4 = (300000 * 20) / 100;

    let annualInhand;
    const taxable = income - 75000;

    if (taxable <= 300000) {
      annualInhand = income;
    } else if (taxable > 300000 && taxable <= 700000) {
      annualInhand = income - ((taxable - 300000) * 5) / 100;
    } else if (taxable > 700000 && taxable <= 1000000) {
      annualInhand = income - slab1 - ((taxable - 700000) * 10) / 100;
    } else if (taxable > 1000000 && taxable <= 1200000) {
      annualInhand = income - slab1 - slab2 - ((taxable - 1000000) * 15) / 100;
    } else if (taxable > 1200000 && taxable <= 1500000) {
      annualInhand = income - slab1 - slab2 - slab3 - ((taxable - 1200000) * 20) / 100;
    } else if (taxable > 1500000) {
      annualInhand = income - slab1 - slab2 - slab3 - slab4 - ((taxable - 1500000) * 30) / 100;
    }

    const totalTax = income - annualInhand;
    const cess = (totalTax * 4) / 100;
    annualInhand -= cess;

    return annualInhand;
  };

  const handleClick = () => {
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue)) {
      setInhand(calculateInhand(incomeValue));
      setTax(calculateTax(incomeValue));
    } else {
      alert('Please enter a valid numeric income.');
    }
  };

  const handleChange = (e) => {
    setIncome(e.target.value);
  };

  const handleClear = () => {
    setIncome('');
    setInhand(0);
    setTax(0);
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Income Tax Calculator</h1>
      <input
        type="number"
        placeholder="Enter your gross income"
        onChange={handleChange}
        value={income}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      />
      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          marginBottom: '15px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Calculate
      </button>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>In-hand Yearly Income:</label>
        <textarea
          name="inhand"
          placeholder="In-hand yearly income"
          readOnly
          value={inhand}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: '#fff',
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Taxes:</label>
        <textarea
          name="tax"
          placeholder="Taxes"
          readOnly
          value={tax}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: '#fff',
          }}
        />
      </div>
      <button
        onClick={handleClear}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Clear
      </button>
    </div>
  );
}

export default App;