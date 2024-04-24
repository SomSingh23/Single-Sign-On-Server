import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import Navbar from "./Navbar";
function App() {
  const { value } = useLoaderData();
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={value}>
          {(value) => {
            if (value === true) {
              return (
                <>
                  <Navbar isLogout={true} />
                  <h1>You are Logged In 🙋</h1>
                </>
              );
            }
            return (
              <>
                <Navbar isLogout={false} />
                <h1>Application 3 Home Page</h1>
                <h1>Not Logged In 💀</h1>
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default App;
