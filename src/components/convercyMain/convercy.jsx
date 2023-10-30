// import { Component } from "react";
import "./convercy.css";
import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [toCurrency, setToCurrency] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [amount, setAmount] = useState(null);
  const [result, setResult] = useState(null);
  const [countryFrom, setCountryFrom] = useState(null);

  // const currencys = [
  //   {
  //     nama: "United States Dollar",
  //     value: "USD",
  //   },
  //   {
  //     nama: "Australian Dollar",
  //     value: "AUD",
  //   },
  //   {
  //     nama: "Singapore Dollar",
  //     value: "SGD",
  //   },
  //   {
  //     nama: "Canadian Dollar",
  //     value: "CAD",
  //   },
  //   {
  //     nama: "British Pound Sterling",
  //     value: "GBP",
  //   },
  //   {
  //     nama: "Euro",
  //     value: "EUR",
  //   },
  //   {
  //     nama: "Swiss Franc",
  //     value: "CHF",
  //   },
  //   {
  //     nama: "Japanese Yen",
  //     value: "JPY",
  //   },
  //   {
  //     nama: "New Zeeland Dollar",
  //     value: "NZD",
  //   },
  //   {
  //     nama: "South Korean Won",
  //     value: "KRW",
  //   },
  //   {
  //     nama: "Indonesian Rupiah",
  //     value: "IDR",
  //   },
  // ];

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

    // fetch("https://api.apilayer.com/currency_data/list", requestOptions)
    //   .then((response) => response.json()) // Menggunakan response.json() untuk menguraikan respons JSON
    //   .then((data) => {
    //     // data sekarang berisi daftar mata uang
    //     console.log(data);
    //   })
    //   .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div className="container-utama">
        <div className="container-judul">
          <h1>
            Konversi Nilai Tukar Mata Uang <span>Dunia</span>
          </h1>
          <p>
            Konversi dari {countryFrom} ke {toCurrency} secara realtime
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
                  name={countryFrom}
                  onChange={(e) => {
                    setFromCurrency(e.target.value);
                    setCountryFrom(e.target.id);
                    }
                  }
                >
                  <option value="" disabled selected> </option>
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
                  <option value="" disabled selected> </option>
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
                <input 
                  value={result} 
                  placeholder="Hasil Konversi"
                  />
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
    </div>
  );
}
