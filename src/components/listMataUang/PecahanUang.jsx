import { useState, useEffect } from "react";

export default function PecahanUang() {
  const [toCurrency, setToCurrency] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [amount, setAmount] = useState(null);
  const [result, setResult] = useState(null);

  const currencyDenominations = [
    100000, 50000, 20000, 10000, 5000, 2000, 1000, 500,
  ];
  const [denominationCounts, setDenominationCounts] = useState([]);

  useEffect(() => {
    fetchCurrencyConversion();
  }, [toCurrency, fromCurrency, amount]);

  const fetchCurrencyConversion = () => {
    const apiUrl = `https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`;

    const myHeaders = new Headers();
    myHeaders.append("apikey", "SrnGPbHfLMek99VTS8EHkBHKvdgKwcnQ");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
        calculateDenominationCounts(data.result);
      })
      .catch((error) => console.log("Error:", error));
  };

  const calculateDenominationCounts = (conversionResult) => {
    let remainingAmount = conversionResult;

    const counts = currencyDenominations.map((denomination) => {
      const count = Math.floor(remainingAmount / denomination);
      remainingAmount = remainingAmount % denomination;
      return count;
    });

    setDenominationCounts(counts);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          {/* Tambahkan mata uang lainnya sesuai kebutuhan */}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Tambahkan mata uang lainnya sesuai kebutuhan */}
        </select>
        {/* <button onClick={handleConvert}>Konversi</button> */}
        is equal to {result} {toCurrency}
      </p>
      <p>
        Jumlah pecahan mata uang:
        {
          currencyDenominations.map((denomination, index) => {
          return (
            <div key={index}>
              {denomination} Rupiah: {denominationCounts[index]} lembar
            </div>
          )
        })
      }
      </p>
    </div>
  );
}
