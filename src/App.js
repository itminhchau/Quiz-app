import { Route, Switch } from 'react-router-dom';
import HomeQuizPage from './features/HomeQuizPage';
import QuestionQuizPage from './features/QuestionQuizPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomeQuizPage} />
        <Route path="/question" component={QuestionQuizPage} />
      </Switch>
    </div>
  );
}

export default App;
