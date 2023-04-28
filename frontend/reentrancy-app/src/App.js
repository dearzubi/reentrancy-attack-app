import React from 'react';
import Connect from './components/Connect';
import AccountDetails from './components/AccountDetails';
import Deploy from './components/Deploy';
import Attack from './components/Attack';
import Claim from './components/Claim';
import { SectionDivider } from './components/styled/components';
import './styles/App.css';

function App() {

  return (
    <div className="App">

      <header>

        <h1>Ethereum Reentrancy Attack</h1>

      </header>

      <main>

        <SectionDivider/>
        <Connect/>
        <AccountDetails/>
        <SectionDivider/>
        <Deploy/>
        <SectionDivider/>
        <Attack/>
        <SectionDivider/>
        <Claim/>

      </main>
    </div>
  );
}

export default App;
