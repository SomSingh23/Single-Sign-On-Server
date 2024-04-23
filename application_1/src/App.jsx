import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
function App() {
  const { value } = useLoaderData();
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={value}>
          {(value) => {
            if (value === true) {
              return <h1>Authenticated</h1>;
            }
            return <h1>Home Page Here</h1>;
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default App;
