import {
  useEffect,
  useState
} from 'react'
import './App.css'
import { HubConnectionBuilder } from '@microsoft/signalr';
import lockOpen from './assets/lock-open.svg'
import lockClosed from './assets/lock-closed.svg'

type GarageOpenedFunction = (x: number) => void;

const App = () => {
  const [garageOpened, setGarageOpened] = useState<number>(0);

  useEffect(() => {
    fetchCurrentState(setGarageOpened);
    connectToSignalR(setGarageOpened);
  }, []);

  return (
    <>
      <div>
        <img src={garageOpened ? lockOpen : lockClosed} alt={garageOpened ? "Open" : "Closed"} />
        <h3>{garageOpened ? "Opened" : "Closed"}</h3>
      </div>
    </>
  )
};

const fetchCurrentState = (setGarageOpened: GarageOpenedFunction) => {
  fetch('https://temp-zlatkov.azurewebsites.net/proximity')
    .then(res => res.json())
    .then(json => setGarageOpened(json.proximity));
}

const connectToSignalR = (setGarageOpened: GarageOpenedFunction) => {
  let connection = new HubConnectionBuilder()
    .withUrl("https://temp-zlatkov.azurewebsites.net/signalr-hub")
    .withAutomaticReconnect()
    .build();

  connection.on("sendProximity", data => {
    setGarageOpened(data.proximity);
  });

  connection.start()
    .then(() => console.log('SignalR Connected'))
    .catch(err => console.error('SignalR Connection Error: ', err))
}

export default App
