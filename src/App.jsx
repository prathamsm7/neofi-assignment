import { useEffect, useState } from 'react';
import './App.css';
import Select from 'react-select';
import Header from './Components/Header';
import CRYPTOCURRENCIES from './utils';

function App() {
  const [currentValue, setCurrentValue] = useState(80);
  const [currentTicker, setCurrentTicker] = useState('ethusdt');
  const [tickerImage, setTickerImage] = useState('eth');

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  function handleTickerChange(ticker) {
    setCurrentTicker(ticker.value.toLowerCase());
    setTickerImage(ticker.id.toLowerCase());
    setInput1('');
    setInput2('');
  }

  function handleAmountChange(e) {
    setInput1(e.target.value);
    const currentPrice = currentValue;

    const conversionRate = 80;
    const currentPriceInINR = currentPrice * conversionRate;

    const amountInINR = e.target.value;
    const estimateAmount = amountInINR / currentPriceInINR;

    setInput2(estimateAmount);
  }

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${currentTicker}@trade`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Do something with the real-time trade data
      setCurrentValue(data.p * 80);
    };

    return () => {
      ws.close();
    };
  }, [currentValue, currentTicker]);

  return (
    <div id='app'>
      <Header />
      <main>
        <div className='container'>
          <div className='current'>
            <span>Current Value</span>
            <span className='currentValue'> ₹ {currentValue.toFixed(2)}</span>
          </div>
          <div className='half-circle'>
            <div>
              <img
                src={`https://coinicons-api.vercel.app/api/icon/${tickerImage}`}
              />
            </div>
          </div>

          <Select
            defaultValue={{ label: 'ETHBUSD', value: 'ETHBUSD' }}
            options={CRYPTOCURRENCIES}
            onChange={handleTickerChange}
            isSearchable={true}
          />

          <div>
            <label htmlFor='investAmount'>Amount you want to invest</label>
            <br />
            <input
              placeholder='0.00'
              type='number'
              value={input1}
              onChange={handleAmountChange}
            />
          </div>
          <div>
            <label htmlFor='investAmount'>
              {`Estimate Number of ${tickerImage.toUpperCase()} You will Get`}
            </label>
            <br />
            <input placeholder='0.00' type='number' value={input2} readOnly />
          </div>
          <button className='connectButton'>Buy</button>
        </div>
      </main>
    </div>
  );
}

export default App;
