import { Suspense, useRef, useEffect } from "react";
import { useLoaderData, Await } from "react-router-dom";
import * as THREE from "three";
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
                <ThreeDAnimation />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

const ThreeDAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Protected;
