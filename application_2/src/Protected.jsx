import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import Navbar from "./Navbar";
function Protected() {
  const { value } = useLoaderData();
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={value}>
          {(value) => {
            if (value !== true) {
              return (
                <>
                  <Navbar isLogout={false} />
                  <h1>Not Authenticated</h1>
                </>
              );
            }
            return (
              <>
                <Navbar isLogout={true} />
                <h1>Protected Data will be shown here</h1>
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default Protected;
