import * as React from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";

const DataPlatForm: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      const div = ref?.current as HTMLDivElement;
      const scene = new Scene();
      const camera = new PerspectiveCamera(
        20,
        div.clientWidth / div.clientHeight,
        0.1,
        1000
      );

      const renderer = new WebGLRenderer();
      renderer.setSize(div.clientWidth, div.clientHeight);
      div.appendChild(renderer.domElement);

      const geometry = new BoxGeometry();
      const material = new MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    }, 100);
  }, []);

  return <div ref={ref} style={{ height: "100%", width: "100%" }}></div>;
};

export default DataPlatForm;
