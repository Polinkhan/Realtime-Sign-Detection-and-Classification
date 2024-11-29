import { HashRouter } from "react-router-dom";
import RootRouter from "./app/routes/router/RootRouter";
import ThemeProvider from "./app/theme";
import Suspense from "./app/components/handler/Suspense";

const App = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <Suspense>
          <RootRouter />
        </Suspense>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
