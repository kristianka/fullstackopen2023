import { SyntheticEvent, useEffect, useState } from 'react'
import diariesService from './services/diaries';
import { DiaryEntry, Weather, Visibility, NewDiaryEntry } from './types';
import { isAxiosError } from 'axios';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [weather, setWeather] = useState("");
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    diariesService.pingServer();

    const fetchDiaries = async () => {
      const fetchedDiaries = await diariesService.getAll();
      setDiaries(fetchedDiaries);
    };
    fetchDiaries();
  }, []);

  const onDateChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setDate(target.value);
  };

  const onWeatherChange = (selectedWeather: Weather) => {
    setWeather(selectedWeather);
  };

  const onVisibilityChange = (selectedVisibility: Visibility) => {
    setVisibility(selectedVisibility);
  };

  const onCommentChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setComment(target.value);
  };
  console.log("notification", notification)
  const addDiaryEntry = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      const newDiaryEntry: NewDiaryEntry = {
        date: date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment: comment
      }
      const res = await diariesService.create(newDiaryEntry);
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      diaries.push({ ...res.data, comment: "" });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Error creating entry:", error);
        setNotification(error?.response?.data);
      } else {
        console.error("Error creating entry:", error);
        setNotification("An error occurred.");
      }
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  }

  return (
    <div>
      <h1>Flight diaries</h1>

      <div>
        <h2>Add a new diary</h2>
        {notification && <p>{notification}</p>}
        <form onSubmit={addDiaryEntry}>

          <div>
            <label htmlFor="date">Date</label>
            <input name="date" type="date" onChange={(event) => onDateChange(event)} />
          </div>

          <div>
            <label htmlFor="visibility">Visibility</label>
            {Object.values(Visibility).map(v => (
              <label key={v}>
                <input type="radio" name="visibility" value={v} checked={visibility === v}
                  onChange={() => onVisibilityChange(v)} />{v}
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="weather">Weather</label>
            {Object.values(Weather).map(w => (
              <label key={w}>
                <input type="radio" name="weather" value={w} checked={weather === w}
                  onChange={() => onWeatherChange(w)} />{w}
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="comment">Comment</label>
            <input name="comment" type="text" value={comment} onChange={onCommentChange} />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <h2>Diary entries</h2>

      {diaries && diaries.map(d =>
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>{d.visibility}</p>
          <p>{d.weather}</p>
          <p>{d.comment}</p>
        </div>
      )}
    </div>
  )
}

export default App
