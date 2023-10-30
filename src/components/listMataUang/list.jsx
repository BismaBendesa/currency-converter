var myHeaders = new Headers();
myHeaders.append("apikey", "SrnGPbHfLMek99VTS8EHkBHKvdgKwcnQ");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/currency_data/list", requestOptions)
  .then(response => response.json()) // Menggunakan response.json() untuk menguraikan respons JSON
  .then(data => {
    // data sekarang berisi daftar mata uang
    console.log(data);
    
    // Anda dapat menampilkan daftar mata uang di sini, misalnya:
    for (const currency in data) {
      console.log(`${currency}: ${data[currency]}`);
    }
  })
  .catch(error => console.log('error', error));
