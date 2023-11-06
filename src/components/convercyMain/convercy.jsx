// import { Component } from "react";
import "./convercy.css";
import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [toCurrency, setToCurrency] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [amount, setAmount] = useState(null);
  const [result, setResult] = useState(null);

  const [denominationCounts, setDenominationCounts] = useState([]);

  const currencyDenominations = [
    100000, 50000, 20000, 10000, 5000, 2000, 1000, 500,
  ];

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

    //console data nama mata uang
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
        calculateDenominationCounts(data.result);
      })
      .catch((error) => console.log("Error:", error));
  };

  //set fungsi pembagian ke masing-masing nilai mata uang (rupiah)
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
      <div className="container-utama">
        <div className="container-judul">
          <h1>
            Konversi Nilai Tukar Mata Uang <span>Dunia</span>
          </h1>
          <p>
            Konversi dari {fromCurrency} ke {toCurrency} secara realtime
          </p>
        </div>
        <div className="container-form">
          <div className="container-form-judul">
            <p>
              {amount} {fromCurrency} ke {toCurrency} = {result}
            </p>
          </div>
          <div className="container-form-konversi">
            <div className="container-asal-konversi">
              <label htmlFor="">Jumlah</label>
              <div className="form-input-konversi">
                <select
                  value={fromCurrency}
                  onChange={(e) => {
                    setFromCurrency(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    {" "}
                  </option>
                  <option value="USD" id="United States Dollar">
                    USD
                  </option>
                  <option value="AUD">AUD</option>
                  <option value="SGD">SGD</option>
                  <option value="CAD">CAD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="CHF">CHF</option>
                  <option value="JPY">JPY</option>
                  <option value="NZD">NZD</option>
                  <option value="KRW">KRW</option>
                  <option value="IDR">IDR</option>
                </select>
                <input
                  type="number"
                  placeholder="Masukkan nominal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.toString())}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            </div>

            <div className="container-ke-konversi">
              <label htmlFor="">Hasil Konversi</label>
              <div className="form-input-konversi">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  <option value="" disabled selected>
                    {" "}
                  </option>
                  <option value="USD">USD</option>
                  <option value="AUD">AUD</option>
                  <option value="SGD">SGD</option>
                  <option value="CAD">CAD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="CHF">CHF</option>
                  <option value="JPY">JPY</option>
                  <option value="NZD">NZD</option>
                  <option value="KRW">KRW</option>
                  <option value="IDR">IDR</option>
                </select>
                <input value={result} placeholder="Hasil Konversi" />
              </div>
            </div>

            {/* Button untuk submit konversi */}
            {/* <button 
              type="submit"
              onClick={() => setSubmitStatus(prev => !prev)}
            >Konversi</button> */}
          </div>
        </div>
      </div>

      <div className="container-tukaran">
        <div className="bg-radius">
          <div className="judul-tukaran">
            <h1>Jumlah pecahan mata uang IDR :</h1>
          </div>
          <div className="hasil-tukaran"> 
              {currencyDenominations.map((denomination, index) => {
                return (
                  <div key={index} className="nominal">
                    {denomination} Rupiah: {denominationCounts[index]} lembar
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
