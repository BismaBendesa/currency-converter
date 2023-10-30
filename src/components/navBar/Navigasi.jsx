// eslint-disable-next-line no-unused-vars
import React from "react";
import "./navigasi.css";

export default function navigasi() {
  return (
    <div>
      <div className="big-container">
        <div className="navigasi-container">
          <div className="container-logo">
            <h3>JINWI$E</h3>
          </div>
          <div className="container-list">
            <div className="list-navigasi">
              <a href="#">Konversi</a>
              <a href="#">List Mata Uang</a>
              <a href="#">Grafik Nilai</a>
              <a href="#">Tentang</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}