// import { Component } from "react";
import "./convercy.css";
import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [toCurrency, setToCurrency] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [amount, setAmount] = useState(null);
  const [result, setResult] = useState(null);

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
        setResult(data.result); // Gantilah properti yang sesuai dengan respons API Anda
      })
      .catch((error) => console.log("Error:", error));
  };

  const pecahan = [0];
  let nominal = { result };
  const pecahanValues = [
    "100000",
    "50000",
    "20000",
    "10000",
    "5000",
    "2000",
    "1000",
  ];

  for (let i = 0; i < 7; i++) {
    if (nominal >= pecahanValues[i]) {
      pecahan[i] = nominal / pecahanValues[i];
      nominal = nominal % pecahanValues[i];
    }
  }

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
                  onChange={(e) => setAmount(e.target.value)}
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
          </div>
        </div>
      </div>

      <div className="container-tukaran">
        <p>{pecahan[1]}</p>
      </div>
    </div>
  );
}
