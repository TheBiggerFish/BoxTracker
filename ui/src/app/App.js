import { Header } from '../components/header';
import { QueryProvider } from '../contexts/query-context'
import { BoxList } from '../screens/box-list'

function App() {
  return (
    <div className="App">
      <QueryProvider>
        <Header />
        <BoxList />
      </QueryProvider>
    </div>
  );
}

export default App;
