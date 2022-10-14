import s from './App.module.css';
import { Form } from './components/Form/Form';

function App() {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.header}>Рассчитайте стоимость автомобиля в лизинг</h1>
        <Form />
      </div>
    </div>
  );
}

export default App;
