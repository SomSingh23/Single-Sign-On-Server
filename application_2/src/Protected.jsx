import { Suspense, useRef, useEffect } from "react";
import { useLoaderData, Await } from "react-router-dom";
import Navbar from "./Navbar";

import * as THREE from "three";
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
                <ThreeDComplexAnimation />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

const ThreeDComplexAnimation = () => {
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

    const geometryCube = new THREE.BoxGeometry();
    const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometryCube, materialCube);
    scene.add(cube);

    const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
    const materialSphere = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    scene.add(sphere);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      sphere.rotation.x -= 0.01;
      sphere.rotation.y -= 0.01;

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
