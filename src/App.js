import { Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import MoviePage from "./pages/Movies/MoviePage";
import DetailPage from "./pages/MovieDetail/DetailPage";
import Homepage from "./pages/Homepage/Homepage";
import { Routes } from "react-router-dom";
import NotFound from "./pages/Notfoundpage/NotFound";

// homepage /
// movie page (search) /movies
// detail page /movies/:id
// /movies/:id/recommendation
// /movies/:id/reviews

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="movies">
            <Route index element={<MoviePage/>}/>
            <Route path=":id" element={<DetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
