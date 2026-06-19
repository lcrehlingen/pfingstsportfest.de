"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

// Import record assets
import recordsM from "@/assets/records_m.json";
import recordsW from "@/assets/records_w.json";

// Types for Records
interface RecordEntry {
  Disziplin: string;
  Name: string;
  Land: string;
  Jahr: string;
  Leistung: string;
}

// Types for Hotspots
interface Hotspot {
  id: string;
  svgIds: string[]; // List of matching SVG element/group IDs for auto-alignment
  name: string;
  badge: string;
  position: [number, number, number]; // Fallback 3D coordinates, auto-updated if SVG element matches
  cameraOffset: [number, number, number]; // Camera offset relative to hotspot center
  description: string;
  specials?: string[];
  disciplines: string[];
}

export default function Stadium3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // UI States
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Lade Stadionstruktur...");
  const [selectedArea, setSelectedArea] = useState<Hotspot | null>(null);
  const [viewMode, setViewMode] = useState<"dark" | "light" | "hologram">("dark");
  const [autoRotate, setAutoRotate] = useState(false);
  const [showWireframe, setShowWireframe] = useState(false);
  const [genderTab, setGenderTab] = useState<"m" | "w">("m");

  // Keep viewMode mutable ref to prevent async stale closures inside SVG loaders
  const viewModeRef = useRef(viewMode);
  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  // Hotspots definitions with semantic SVG element and group IDs for automated 3D alignment
  const hotspots: Hotspot[] = useMemo(
    () => [
      {
        id: "tribune",
        svgIds: ["Tribüne"],
        name: "Haupttribüne",
        badge: "Infrastruktur",
        position: [3.2, 1.2, -9.5],
        cameraOffset: [2, 8, 12],
        description:
          "Die voll überdachte Haupttribüne des Bungertstadions bietet Platz für über 1.200 Zuschauer und sorgt für eine spektakuläre, dichte Atmosphäre direkt an der 100m-Zielgeraden.",
        specials: [
          "Überdachte Sitzplätze",
          "Beste Sicht auf Start & Ziel",
          "Renoviertes Tribünendach",
          "Kapazität: ~10.000 Gesamtzuschauer im Stadion",
        ],
        disciplines: [],
      },
      {
        id: "track",
        svgIds: ["Hauptgerade Tartan", "Tartan Rundbahnen"],
        name: "400m-Rundlaufbahn",
        badge: "Laufdisziplinen",
        position: [5.2, 0.4, 1.0],
        cameraOffset: [-12, 12, -4],
        description:
          "Die legendäre rote Ascheschleife wurde komplett durch eine moderne, schnelle Kunststoffbahn ersetzt. Hier fallen jedes Jahr Weltklassezeiten über Sprint-, Hürden- und Mittelstreckendistanzen.",
        specials: [
          "8 vollrundige Laufbahnen",
          "High-Speed-Kurvenneigung",
          "Schauplatz für Fredericks' 10,07s Stadionrekord",
        ],
        disciplines: [
          "100 m",
          "200 m",
          "400 m",
          "800 m",
          "1000 m",
          "1500 m",
          "3000 m",
          "5000 m",
          "110 m Hürden",
          "100 m Hürden",
          "400 m Hürden",
          "3000 m Hindernis",
          "4 x 100 m",
        ],
      },
      {
        id: "longjump",
        svgIds: ["Weitsprung", "Weitsprung unten"],
        name: "Weitsprunganlage",
        badge: "Sprungdisziplinen",
        position: [-7.2, 0.4, -2.4],
        cameraOffset: [8, 5, 4],
        description:
          "Die Weitsprunggrube befindet sich im westlichen Sektor und bietet dank wechselbarer Anlaufrichtungen (Ost/West) stets optimalen Windschatten und Rekordpotenzial.",
        specials: [
          "Zweiseitige Anlaufbahn",
          "Austragungsort für Para-Weltrekorde",
          "Malaika Mihambo sprang hier zu Weltklasseweiten",
        ],
        disciplines: ["Weitsprung", "Dreisprung"],
      },
      {
        id: "highjump",
        svgIds: ["Hochsprung", "Hochsprungmatte"],
        name: "Hochsprunganlage",
        badge: "Sprungdisziplinen",
        position: [-4.2, 0.4, 3.8],
        cameraOffset: [4, 6, -8],
        description:
          "Direkt vor der Westkurve liegt die Hochsprunganlage. Die riesige Aufsprungmatte zieht bei jedem Pfingstsportfest die Elite-Springer magisch an und sorgt für Gänsehautmomente.",
        specials: [
          "Großflächiges IAAF-zertifiziertes Kissen",
          "Beste Thermik in der Stadionkurve",
          "Stadionrekorde von über 2,30 m",
        ],
        disciplines: ["Hochsprung"],
      },
      {
        id: "polevault",
        svgIds: ["Tarten Auslauf"], // matches the pole vault runway on the west infield
        name: "Stabhochsprung",
        badge: "Sprungdisziplinen",
        position: [-5.1, 0.4, -4.5],
        cameraOffset: [6, 6, 8],
        description:
          "Die Stabhochsprunganlage ist parallel zur Hauptgeraden positioniert. Nahe an den Zuschauerrängen gelegen, feuert das Publikum jeden Höhenflug lautstark im Takt an.",
        specials: [
          "Optimale Windabschirmung",
          "Zuschauer-Nähe für maximale Anfeuerung",
          "Regelmäßige Flüge über die magische 5,80m-Marke",
        ],
        disciplines: ["Stabhochsprung"],
      },
      {
        id: "shotput",
        svgIds: ["Kugelstoßen", "Kugelstoßring"],
        name: "Kugelstoßring",
        badge: "Wurfdisziplinen",
        position: [-9.5, 0.4, 1.6],
        cameraOffset: [7, 4, -4],
        description:
          "Der Kugelstoßsektor im nördlichen Kurveninnenraum bietet feste Betonringe und einen exzellent präparierten Rasen-Aufschlagssektor für kraftvolle Stöße.",
        specials: [
          "Zertifizierter Betonring mit bestem Grip",
          "Kompakter, zuschauernaher Wurfsektor",
          "Schauplatz packender Duelle der Weltelite",
        ],
        disciplines: ["Kugelstoß"],
      },
      {
        id: "throws",
        svgIds: ["Speerwurf Anlauf", "Diskus", "Diskus Sektor", "Diskus/Hammer Ring"],
        name: "Speer- & Diskuswurf",
        badge: "Wurfdisziplinen",
        position: [-1.2, 0.4, -5.2],
        cameraOffset: [-6, 8, 8],
        description:
          "Die weitläufige Rasenfläche im Innenbereich bietet die ideale Kulisse für Javelin und Diskus. Hier segeln die Speere regelmäßig weit über die 80-Meter-Marke.",
        specials: [
          "Integrierter Sicherheits-Schutzkäfig für Diskuswurf",
          "Lange Speerwurfanlaufbahn aus Kunststoff",
          "Perfekt einsehbares Wurf-Areal von allen Stehwällen",
        ],
        disciplines: ["Speerwurf", "Diskuswurf", "Hammerwurf"],
      },
    ],
    []
  );

  // ThreeJS Refs to interact with the loop from outside
  const threeSceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    stadiumGroup: THREE.Group;
    lights: {
      ambient: THREE.AmbientLight;
      dir: THREE.DirectionalLight;
      point: THREE.PointLight;
    };
    beacons: THREE.Mesh[];
    tweenTarget: {
      active: boolean;
      camPos: THREE.Vector3;
      controlsTarget: THREE.Vector3;
    };
  } | null>(null);

  // Filter records based on selected area and gender
  const activeRecords = useMemo(() => {
    if (!selectedArea) return [];
    const source = genderTab === "m" ? (recordsM as RecordEntry[]) : (recordsW as RecordEntry[]);
    return source.filter((rec) => selectedArea.disciplines.includes(rec.Disziplin));
  }, [selectedArea, genderTab]);

  // Unified theme-specific color application helper (prevents color-matching bugs and async load races)
  const updateMeshColors = (group: THREE.Group, mode: "dark" | "light" | "hologram") => {
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.wireframe = mode === "hologram";

        // Access the structured mesh type name from prefix
        const isGrass = child.name.startsWith("grass:") || child.name.includes("grass");
        const isTrack = child.name.startsWith("track:") || child.name.includes("track");
        const isStands = child.name.startsWith("stands:") || child.name.includes("stands");
        const isBuildings = child.name.startsWith("buildings:") || child.name.includes("buildings") || child.name.includes("specials");

        if (mode === "dark") {
          if (isGrass) mat.color.setHex(0x15803d); // rich athletic forest green!
          else if (isTrack) mat.color.setHex(0xb91c1c); // vibrant athletic track red!
          else if (isBuildings) mat.color.setHex(0x1e293b); // deep gray offices
          else mat.color.setHex(0x334155); // slate grey stands/other
        } else if (mode === "light") {
          if (isGrass) mat.color.setHex(0x4ade80); // rich green
          else if (isTrack) mat.color.setHex(0xef4444); // bright track red
          else if (isBuildings) mat.color.setHex(0x64748b); // bright slate
          else mat.color.setHex(0xcbd5e1); // concrete light grey
        } else if (mode === "hologram") {
          if (isGrass) mat.color.setHex(0x059669); // emerald glow
          else if (isTrack) mat.color.setHex(0x10b981); // bright mint
          else mat.color.setHex(0x06b6d4); // cyan neon lines
        }
      }
    });
  };

  // Set up view themes
  useEffect(() => {
    const refs = threeSceneRef.current;
    if (!refs) return;

    const { scene, lights, stadiumGroup } = refs;

    // Apply lighting and colors based on viewMode
    if (viewMode === "dark") {
      scene.background = new THREE.Color(0x020617); // slate-950
      lights.ambient.color.setHex(0x1e1b4b); // deep indigo
      lights.ambient.intensity = 1.8;
      lights.dir.color.setHex(0xffffff);
      lights.dir.intensity = 1.4;
    } else if (viewMode === "light") {
      scene.background = new THREE.Color(0xf8fafc); // slate-50
      lights.ambient.color.setHex(0xe2e8f0);
      lights.ambient.intensity = 2.2;
      lights.dir.color.setHex(0xfffbeb); // warm sun
      lights.dir.intensity = 2.0;
    } else if (viewMode === "hologram") {
      scene.background = new THREE.Color(0x000000); // pure black
      lights.ambient.color.setHex(0x000000);
      lights.ambient.intensity = 0.5;
      lights.dir.color.setHex(0x00ffcc); // neon teal
      lights.dir.intensity = 1.5;
    }

    // Apply colors to all existing meshes
    updateMeshColors(stadiumGroup, viewMode);
  }, [viewMode]);

  // Handle manual Wireframe override
  useEffect(() => {
    const refs = threeSceneRef.current;
    if (!refs || viewMode === "hologram") return;

    refs.stadiumGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.wireframe = showWireframe;
      }
    });
  }, [showWireframe, viewMode]);

  // Handle Auto-Rotate toggle
  useEffect(() => {
    const refs = threeSceneRef.current;
    if (!refs) return;
    refs.controls.autoRotate = autoRotate;
    refs.controls.autoRotateSpeed = 0.6;
  }, [autoRotate]);

  // Initialize ThreeJS
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 650;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 22, 35);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // don't go below ground
    controls.minDistance = 6;
    controls.maxDistance = 55;
    controls.target.set(0, 0, 0);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(15, 30, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 80;
    const d = 25;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // Dynamic point light for highlighting active hotspot
    const pointLight = new THREE.PointLight(0xc1fb6e, 0, 15);
    pointLight.castShadow = false;
    scene.add(pointLight);

    // 6. Ground Grid and dark helper ring
    const gridHelper = new THREE.GridHelper(80, 40, 0x334155, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Flat shadow-receiver plane representing the park ground
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    ground.receiveShadow = true;
    scene.add(ground);

    // 7. Stadium Mesh Group
    const stadiumGroup = new THREE.Group();
    scene.add(stadiumGroup);

    // Beacons list for visual markers
    const beaconsList: THREE.Mesh[] = [];

    // Tweening targets for camera flight
    const tweenTarget = {
      active: false,
      camPos: new THREE.Vector3(),
      controlsTarget: new THREE.Vector3(),
    };

    // Save refs for outside interaction
    threeSceneRef.current = {
      scene,
      camera,
      controls,
      stadiumGroup,
      lights: {
        ambient: ambientLight,
        dir: dirLight,
        point: pointLight,
      },
      beacons: beaconsList,
      tweenTarget,
    };

    // Load and Parse stadium.svg via SVGLoader
    setLoadingStatus("Analysiere SVG-Struktur...");
    const loader = new SVGLoader();

    // Scale SVG points (width=652, height=592, center around 326, 296)
    const scale = 0.032;
    const centerOffsetX = 326;
    const centerOffsetY = 296;

    // We will dynamically compute bounds for the matched SVG elements to auto-position hotspots
    const svgElementCenters: Record<string, THREE.Vector3> = {};

    loader.load(
      "/stadium.svg",
      (data) => {
        setLoadingStatus("Generiere 3D-Volumengeometrien...");
        const paths = data.paths;

        // Clean and normalize German character encodings (e.g. eszett and umlauts) to keep matching 100% robust
        const normalizeSvgId = (id: string): string => {
          if (!id) return "";
          const lower = id.toLowerCase();
          if (lower.includes("kugel") || lower.includes("sto") || lower.includes("159")) return "Kugelstoßen";
          if (lower.includes("trib") || lower.includes("188")) return "Tribüne";
          if (lower.includes("rasen")) return "Innenraum - Rasen";
          if (lower.includes("rundbahn") || lower.includes("tartan rundbahn")) return "Tartan Rundbahnen";
          if (lower.includes("weitsprung")) {
            if (lower.includes("unten")) return "Weitsprung unten";
            return "Weitsprung";
          }
          if (lower.includes("hochsprung")) return "Hochsprung";
          if (lower.includes("auslauf")) return "Tarten Auslauf";
          if (lower.includes("speerwurf")) return "Speerwurf Anlauf";
          if (lower.includes("diskus")) return "Diskus/Hammer Ring";
          return id;
        };

        paths.forEach((path, pathIndex) => {
          // Extract the semantic element ID assigned in the SVG
          const rawId = path.userData?.node?.id || path.userData?.node?.getAttribute("id") || "";
          const fill = path.userData?.node?.getAttribute("fill") || "";
          const stroke = path.userData?.node?.getAttribute("stroke") || "";

          // Exclude large background shapes or bounding rects
          const widthAttr = path.userData?.node?.getAttribute("width");
          const heightAttr = path.userData?.node?.getAttribute("height");
          if (widthAttr && parseFloat(widthAttr) > 800) {
            return; // skip outer background rect
          }

          // Traverse up parent nodes to find any custom semantic group IDs (critical for Weitsprung and other groups)
          let parentNode = path.userData?.node?.parentNode;
          let groupId = "";
          while (parentNode) {
            const pId = parentNode.id || parentNode.getAttribute?.("id") || "";
            if (pId && pId !== "Bungertstadion" && pId !== "Website" && !pId.startsWith("svg") && !pId.startsWith("g")) {
              groupId = pId;
              break;
            }
            parentNode = parentNode.parentNode;
          }

          const normRawId = normalizeSvgId(rawId);
          const normGroupId = normalizeSvgId(groupId);

          // If it's a vector representing a green tree, filter it out from flat rendering.
          // Instead, we can read its exact position to plant a beautiful procedural 3D Tree!
          const isFoliage = normRawId.includes("Ellipse 24") || fill.toLowerCase() === "#0fd323" || normGroupId.includes("Baum");
          if (isFoliage) {
            // Find center of tree geometry
            const shapes = SVGLoader.createShapes(path);
            if (shapes.length > 0) {
              const geom = new THREE.ShapeGeometry(shapes[0]);
              geom.computeBoundingBox();
              if (geom.boundingBox) {
                const center = new THREE.Vector3();
                geom.boundingBox.getCenter(center);

                // Convert to 3D Space coordinates
                const tX = (center.x - centerOffsetX) * scale;
                const tZ = (center.y - centerOffsetY) * scale;

                // Plant procedural Tree!
                plantProceduralTree(tX, tZ);
              }
            }
            return; // skip rendering flat circular shape
          }

          // If the element is a helper background circular Tree shape, skip it
          if (normRawId.includes("Ellipse 23") || fill.toLowerCase() === "#808080" && normRawId.includes("ellipse")) {
            return;
          }

          // Render stroke-only lane lines and markings (e.g. track lines, curves, start lines)
          if (stroke && stroke !== "none" && (!fill || fill === "none" || fill === "transparent")) {
            const strokeColorHex = stroke.startsWith("#") ? parseInt(stroke.replace("#", "0x")) : 0xffffff;
            const idLower = normRawId.toLowerCase();

            // Set beautiful line colors
            let lineColor = 0xffffff; // default track lines are crisp white!
            if (idLower.includes("straße") || idLower.includes("straßen")) {
              lineColor = 0x334155; // slate grey road markings
            } else if (idLower.includes("bahn") || idLower.includes("start") || idLower.includes("ziel") || idLower.includes("linie")) {
              lineColor = 0xf8fafc; // white track lines
            } else {
              lineColor = strokeColorHex;
            }

            path.subPaths.forEach((subPath) => {
              const points = subPath.getPoints();
              if (points && points.length > 1) {
                const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

                // Elevate slightly above the red track layer (track height offset 0.13 + depth 0.10 = 0.23, so Y=0.24 is perfect!)
                lineGeo.translate(0, 0, 0.24);

                const lineMat = new THREE.LineBasicMaterial({
                  color: lineColor,
                  transparent: true,
                  opacity: idLower.includes("bahn") ? 0.75 : 0.9
                });

                const line = new THREE.Line(lineGeo, lineMat);
                line.name = `line:${normRawId || normGroupId || pathIndex}`;
                stadiumGroup.add(line);
              }
            });

            // We processed it as a line, we don't need to generate co-planar extruded shapes for it!
            return;
          }

          // Generate 2D shapes
          const shapes = SVGLoader.createShapes(path);

          shapes.forEach((shape) => {
            let geometry: THREE.BufferGeometry;
            let materialColor = 0x64748b; // neutral grey
            let extrusionDepth = 0.1;
            let heightOffset = 0; // Incremental layer to completely avoid visual Z-Fighting/flickering
            let meshName = "mesh_unknown";
            let receiveShadow = true;
            let castShadow = false;

            const idLower = normRawId.toLowerCase();
            const groupLower = normGroupId.toLowerCase();
            const fillLower = fill.toLowerCase();

            // Map structures by ID first (Semantic) or Fallback on Colors
            // We use heightOffset layers (steps of 0.05 units) to separate overlaps mathematically
            if (idLower.includes("rasen") || fillLower === "#58944e" || fillLower === "#7a936a") {
              // Grass fields & sectors
              materialColor = fillLower === "#58944e" ? 0x1e3a1e : 0x22c55e;
              extrusionDepth = 0.08;
              heightOffset = 0.05; // layer 2
              meshName = "grass";
              receiveShadow = true;
            } else if (idLower.includes("tartan") || idLower.includes("rundbahnen") || idLower.includes("auslauf") || idLower.includes("gerade") || groupLower.includes("weitsprung") || groupLower.includes("tartan") || fillLower === "#d55e5e") {
              // Running Track / Sprint straightaways / jumps
              materialColor = 0x991b1b;
              extrusionDepth = 0.1;
              heightOffset = 0.13; // layer 3 (lies cleanly on top of grass)
              meshName = "track";
              receiveShadow = true;
            } else if (idLower.includes("tribüne") || idLower.includes("hdl") || idLower.includes("fußballer") || idLower.includes("garage") || idLower.includes("weitsprung unten") || fillLower === "#d9d9d9" || fillLower === "#808080") {
              // Volumetric stadium buildings, grandstand, and platforms
              materialColor = 0x475569;
              heightOffset = 0.25; // layer 5 (sits firmly above the ground)
              
              if (idLower.includes("tribüne")) {
                extrusionDepth = 2.4; // super high Covered Grandstand!
              } else if (idLower.includes("hdl") || idLower.includes("garage") || idLower.includes("fußballer")) {
                extrusionDepth = 1.4; // admin offices and garages
              } else {
                extrusionDepth = 0.8; // normal concrete stand tiers
              }
              meshName = "stands";
              castShadow = true;
              receiveShadow = true;
            } else if (fillLower === "#6564a7" || fillLower === "#d9db89" || idLower.includes("wassergraben") || groupLower.includes("wassergraben")) {
              // Dynamic secondary features (Water jumps, sandpits)
              materialColor = fillLower === "#6564a7" ? 0x1d4ed8 : 0xfef08a;
              extrusionDepth = 0.06;
              heightOffset = 0.23; // layer 4 (lies on top of tracks)
              meshName = "specials";
              receiveShadow = true;
            } else {
              // Base ground plane elements or perimeter lanes
              if (stroke && !fill) {
                return; 
              }
              materialColor = 0x334155;
              extrusionDepth = 0.05;
              heightOffset = 0.00; // layer 1 (very bottom)
              meshName = "other";
            }

            // Create geometry
            const extrudeSettings: THREE.ExtrudeGeometryOptions = {
              depth: extrusionDepth,
              bevelEnabled: meshName === "stands",
              bevelThickness: 0.05,
              bevelSize: 0.03,
              bevelSegments: 2,
              curveSegments: 12,
            };

            geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            // Shift the geometry on its local Z-axis (extrusion direction) to stack layers properly
            geometry.translate(0, 0, heightOffset);

            // Apply material
            const material = new THREE.MeshStandardMaterial({
              color: materialColor,
              roughness: meshName === "grass" ? 0.8 : 0.5,
              metalness: idLower.includes("garage") ? 0.4 : 0.1,
              shadowSide: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, material);
            // Prefix the mesh name with the meshType so theme color traversal can locate it reliably
            mesh.name = `${meshName}:${normRawId || normGroupId || pathIndex}`;
            mesh.castShadow = castShadow;
            mesh.receiveShadow = receiveShadow;

            stadiumGroup.add(mesh);

            // Store the calculated center of this element for dynamic Hotspot alignment
            const lookupId = normRawId || normGroupId;
            if (lookupId) {
              geometry.computeBoundingBox();
              if (geometry.boundingBox) {
                const elemCenter = new THREE.Vector3();
                geometry.boundingBox.getCenter(elemCenter);

                // Convert points from SVG coordinate space to 3D Space coordinates
                const convertedX = (elemCenter.x - centerOffsetX) * scale;
                const convertedZ = (elemCenter.y - centerOffsetY) * scale;
                const computedY = (heightOffset + extrusionDepth) * scale + 0.35; // Scale height by scale and add visual hover offset to prevent perspective drift

                const pos = new THREE.Vector3(convertedX, computedY, convertedZ);
                svgElementCenters[lookupId] = pos;

                // Also store specifically under normGroupId if we are in a sub-element inside a semantic group
                if (normGroupId && !svgElementCenters[normGroupId]) {
                  svgElementCenters[normGroupId] = pos;
                }
              }
            }
          });
        });

        // Align and transform the meshes in the stadium group
        stadiumGroup.rotation.x = -Math.PI / 2;

        stadiumGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.translate(-centerOffsetX, -centerOffsetY, 0);
            child.geometry.scale(scale, -scale, scale); // Invert Y as SVG coordinates increase downwards
          }
        });

        // Align our Hotspots dynamically based on parsed SVG element and group IDs!
        hotspots.forEach((spot) => {
          for (const sId of spot.svgIds) {
            const matchedCenter = svgElementCenters[sId];
            if (matchedCenter) {
              // Match found! Override hardcoded positions with exact SVG parsed positions
              spot.position[0] = matchedCenter.x;
              spot.position[1] = matchedCenter.y + 0.3; // hover slightly above physical element
              spot.position[2] = matchedCenter.z;
              break; // exit loop once matched
            }
          }
        });

        // 9. Generate pulsing beacon visual helper rings in WebGL
        hotspots.forEach((spot) => {
          const beaconGroup = new THREE.Group();

          // Flat pulsing circle ring helper
          const ringGeo = new THREE.RingGeometry(0.3, 0.38, 16);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0xc1fb6e,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
          });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.rotation.x = -Math.PI / 2;
          ring.position.y = 0.05;
          beaconGroup.add(ring);

          // Small core glowing node
          const coreGeo = new THREE.SphereGeometry(0.12, 8, 8);
          const coreMat = new THREE.MeshBasicMaterial({ color: 0xc1fb6e });
          const core = new THREE.Mesh(coreGeo, coreMat);
          core.position.y = 0.08;
          beaconGroup.add(core);

          beaconGroup.position.set(spot.position[0], spot.position[1], spot.position[2]);
          scene.add(beaconGroup);

          beaconGroup.name = `beacon_${spot.id}`;
        });

        // Apply theme color parameters to newly parsed SVGMeshes immediately (avoids async races)
        updateMeshColors(stadiumGroup, viewModeRef.current);

        // Finished parsing
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(pct);
        }
      },
      (error) => {
        console.error("Error loading SVG: ", error);
        setLoadingStatus("Generiere Ersatz-Stadionmodell...");
        generateFallbackStadium(stadiumGroup);
        setLoading(false);
      }
    );

    // High fidelity procedural tree placement function
    function plantProceduralTree(tX: number, tZ: number) {
      const tree = new THREE.Group();
      
      const treeGeoFol = new THREE.ConeGeometry(0.48, 1.15, 5);
      const treeGeoTrunk = new THREE.CylinderGeometry(0.1, 0.1, 0.55, 5);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
      const folMat = new THREE.MeshStandardMaterial({ 
        color: Math.random() > 0.5 ? 0x14532d : 0x166534, 
        roughness: 0.8 
      });

      const trunk = new THREE.Mesh(treeGeoTrunk, trunkMat);
      trunk.position.y = 0.27;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliage = new THREE.Mesh(treeGeoFol, folMat);
      foliage.position.y = 1.05;
      foliage.castShadow = true;
      tree.add(foliage);

      tree.position.set(tX, 0, tZ);
      scene.add(tree);
    }

    // Fallback procedural builder
    function generateFallbackStadium(group: THREE.Group) {
      const fieldGeo = new THREE.CylinderGeometry(8, 8, 0.15, 32);
      const fieldMat = new THREE.MeshStandardMaterial({ color: 0x1e3a1e, roughness: 0.8 });
      const field = new THREE.Mesh(fieldGeo, fieldMat);
      field.position.y = 0.07;
      field.receiveShadow = true;
      group.add(field);

      const trackGeo = new THREE.CylinderGeometry(11, 11, 0.2, 32);
      const trackMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.6 });
      const track = new THREE.Mesh(trackGeo, trackMat);
      track.position.y = 0.1;
      track.receiveShadow = true;
      group.add(track);

      const standsGeo = new THREE.RingGeometry(12, 14, 32, 1, 0, Math.PI);
      const standsMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
      const stands = new THREE.Mesh(standsGeo, standsMat);
      stands.rotation.x = -Math.PI / 2;
      stands.position.y = 0.8;
      stands.receiveShadow = true;
      stands.castShadow = true;
      group.add(stands);
    }

    // 10. Resize handler
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 650;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 11. Animation Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = performance.now() * 0.001;

      // Controls update for damping
      controls.update();

      // Smooth camera interpolation
      if (tweenTarget.active) {
        camera.position.lerp(tweenTarget.camPos, 0.06);
        controls.target.lerp(tweenTarget.controlsTarget, 0.06);

        if (
          camera.position.distanceTo(tweenTarget.camPos) < 0.05 &&
          controls.target.distanceTo(tweenTarget.controlsTarget) < 0.05
        ) {
          tweenTarget.active = false;
        }
      }

      // Pulse visual beacons in WebGL
      scene.traverse((child) => {
        if (child.name.startsWith("beacon_")) {
          const scaleVal = 1 + Math.sin(elapsedTime * 4.5) * 0.15;
          const ringMesh = child.children[0] as THREE.Mesh;
          if (ringMesh) {
            ringMesh.scale.set(scaleVal, scaleVal, 1);
            const mat = ringMesh.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.9 - (scaleVal - 0.85) * 0.7;
          }
        }
      });

      // High Performance Projection: Direct DOM Updates
      // This completely avoids React state re-renders (60 FPS thrashing) and resolves overlay flickering
      const tempV = new THREE.Vector3();
      const currentWidth = containerRef.current?.clientWidth || width;
      const currentHeight = containerRef.current?.clientHeight || height;

      hotspots.forEach((spot) => {
        tempV.set(spot.position[0], spot.position[1] + 0.4, spot.position[2]);
        tempV.project(camera);

        const el = badgeRefs.current[spot.id];
        if (el) {
          if (tempV.z > 1) {
            el.style.display = "none";
          } else {
            const xScreen = (tempV.x * 0.5 + 0.5) * currentWidth;
            const yScreen = (tempV.y * -0.5 + 0.5) * currentHeight;
            
            el.style.display = "flex";
            el.style.left = "0px";
            el.style.top = "0px";
            el.style.transform = `translate3d(${xScreen}px, ${yScreen}px, 0) translate(-50%, -100%)`;
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [hotspots]);

  // Execute fly-to animation when selected area changes
  const handleSpotClick = (spot: Hotspot) => {
    setSelectedArea(spot);

    const refs = threeSceneRef.current;
    if (!refs) return;

    const { tweenTarget, lights } = refs;

    const focusX = spot.position[0];
    const focusY = spot.position[1];
    const focusZ = spot.position[2];

    const targetCamX = focusX + spot.cameraOffset[0];
    const targetCamY = focusY + spot.cameraOffset[1];
    const targetCamZ = focusZ + spot.cameraOffset[2];

    tweenTarget.camPos.set(targetCamX, targetCamY, targetCamZ);
    tweenTarget.controlsTarget.set(focusX, focusY, focusZ);
    tweenTarget.active = true;

    lights.point.position.set(focusX, focusY + 1.2, focusZ);
    lights.point.intensity = 3.5;
    lights.point.color.setHex(0xc1fb6e);
  };

  // Reset Camera back to overview
  const handleResetCamera = () => {
    setSelectedArea(null);

    const refs = threeSceneRef.current;
    if (!refs) return;

    const { tweenTarget, lights } = refs;

    tweenTarget.camPos.set(0, 22, 35);
    tweenTarget.controlsTarget.set(0, 0, 0);
    tweenTarget.active = true;

    lights.point.intensity = 0;
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 relative w-full h-[650px] md:h-[750px] overflow-hidden text-white font-sans bg-slate-950">
      
      {/* 3D Canvas wrapper */}
      <div
        ref={containerRef}
        className="w-full md:w-3/5 h-[400px] md:h-full relative overflow-hidden select-none select-none touch-none shrink-0"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Dynamic HTML Hotspots Overlays projected from 3D (Ref-binded for direct DOM updates) */}
        {hotspots.map((spot) => {
          const isSelected = selectedArea?.id === spot.id;
          return (
            <button
              key={spot.id}
              ref={(el) => {
                badgeRefs.current[spot.id] = el;
              }}
              style={{ display: "none" }} // Positioned dynamically in high-perf anim loop
              onClick={() => handleSpotClick(spot)}
              className={`absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-wide border shadow-lg backdrop-blur-md transition-all duration-300 pointer-events-auto ${
                isSelected
                  ? "bg-[#C1FB6E] border-[#C1FB6E] text-slate-950 scale-110 ring-4 ring-[#C1FB6E]/30"
                  : "bg-slate-900/80 hover:bg-slate-800 border-white/10 text-white hover:scale-105"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isSelected ? "bg-slate-950" : "bg-[#C1FB6E]"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isSelected ? "bg-slate-950" : "bg-[#C1FB6E]"
                  }`}
                ></span>
              </span>
              <span>{spot.name}</span>
            </button>
          );
        })}

        {/* Canvas overlays, controls overlay */}
        <div className="absolute top-4 left-4 p-3 bg-slate-900/85 backdrop-blur-md rounded-2xl border border-white/5 flex flex-col gap-2 shadow-xl">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest select-none">
            3D-Steuerung
          </span>

          <div className="flex flex-col gap-1.5">
            {/* View theme switcher */}
            <div className="flex rounded-lg overflow-hidden bg-slate-950 p-0.5 border border-white/5 text-xs">
              <button
                onClick={() => setViewMode("dark")}
                className={`px-2 py-1.5 rounded-md font-bold transition-all ${
                  viewMode === "dark" ? "bg-white/10 text-[#C1FB6E]" : "text-gray-400 hover:text-white"
                }`}
                title="Dunkle Nachtstimmung"
              >
                🌙 Dunkel
              </button>
              <button
                onClick={() => setViewMode("light")}
                className={`px-2 py-1.5 rounded-md font-bold transition-all ${
                  viewMode === "light" ? "bg-white/10 text-[#C1FB6E]" : "text-gray-400 hover:text-white"
                }`}
                title="Helle Sonnenstimmung"
              >
                ☀️ Hell
              </button>
              <button
                onClick={() => setViewMode("hologram")}
                className={`px-2 py-1.5 rounded-md font-bold transition-all ${
                  viewMode === "hologram" ? "bg-white/10 text-cyan-400" : "text-gray-400 hover:text-white"
                }`}
                title="Hologramm Sci-Fi Gitter"
              >
                🌐 Gitter
              </button>
            </div>

            {/* Rotator Toggle & Wireframe override */}
            <div className="flex gap-2 items-center justify-between mt-1 text-[11px] text-gray-300">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex-1 px-2.5 py-1.5 rounded-lg border font-bold text-center transition ${
                  autoRotate
                    ? "bg-[#C1FB6E]/10 border-[#C1FB6E]/30 text-[#C1FB6E]"
                    : "bg-slate-950/40 border-white/5 hover:bg-slate-800"
                }`}
              >
                🔄 Auto-Drehung
              </button>

              {viewMode !== "hologram" && (
                <button
                  onClick={() => setShowWireframe(!showWireframe)}
                  className={`flex-1 px-2.5 py-1.5 rounded-lg border font-bold text-center transition ${
                    showWireframe
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      : "bg-slate-950/40 border-white/5 hover:bg-slate-800"
                  }`}
                >
                  🕸️ Mesh-Linien
                </button>
              )}
            </div>

            {selectedArea && (
              <button
                onClick={handleResetCamera}
                className="w-full mt-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/5 hover:border-white/10 text-xs font-extrabold text-white transition-all text-center"
              >
                🔙 Kamera zurücksetzen
              </button>
            )}
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center gap-4 z-40 p-6">
            <div className="relative h-16 w-16 select-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C1FB6E]/10 opacity-75"></span>
              <div className="h-16 w-16 rounded-full border-4 border-white/5 border-t-[#C1FB6E] animate-spin"></div>
            </div>

            <div className="flex flex-col gap-1 items-center text-center max-w-xs mt-2">
              <span className="font-extrabold text-lg tracking-wide text-white">
                Bungertstadion 3D
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wide">
                {loadingStatus}
              </span>
            </div>

            <div className="w-full max-w-[200px] h-1.5 bg-slate-900 border border-white/5 rounded-full overflow-hidden mt-1">
              <div
                style={{ width: `${loadingProgress}%` }}
                className="h-full bg-gradient-to-r from-tourOrange to-[#C1FB6E] transition-all duration-300"
              />
            </div>
            <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">
              {loadingProgress}% geladen
            </span>
          </div>
        )}

        {/* OrbitControl Tutorial Overlay */}
        {!loading && (
          <div className="absolute bottom-4 left-4 p-2.5 bg-slate-900/60 backdrop-blur-xs rounded-xl border border-white/5 text-[10px] text-gray-300 font-medium flex gap-3 select-none pointer-events-none">
            <span>🖱️ Links-Klick + Ziehen = Drehen</span>
            <span>🖱️ Rechts-Klick + Ziehen = Bewegen</span>
            <span>🖱️ Scrollen = Zoom</span>
          </div>
        )}
      </div>

      {/* Side Information/Records Panel */}
      <div className="w-full md:w-2/5 h-[250px] md:h-full bg-slate-900/30 border-t md:border-t-0 md:border-l border-white/10 flex flex-col relative z-20 overflow-y-auto">
        {selectedArea ? (
          /* HOTSPOT SELECTED PANEL */
          <div className="p-6 flex flex-col gap-5 flex-1">
            
            {/* Header / Badge */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-tourLightOrange max-w-fit select-none">
                  {selectedArea.badge}
                </span>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {selectedArea.name}
                </h3>
              </div>
              <button
                onClick={handleResetCamera}
                className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg p-2 transition"
                title="Zurück zur Übersicht"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              {selectedArea.description}
            </p>

            {/* Technical Highlights / Bullet points */}
            {selectedArea.specials && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest select-none">
                  Spezifikationen & Highlights
                </span>
                <ul className="flex flex-col gap-1.5 text-xs text-gray-300 pl-1">
                  {selectedArea.specials.map((spec, sidx) => (
                    <li key={sidx} className="flex items-start gap-2">
                      <span className="text-[#C1FB6E] select-none">✔</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Records tab (if disciplines present) */}
            {selectedArea.disciplines.length > 0 && (
              <div className="flex flex-col gap-3 mt-1 flex-1">
                
                {/* Records Header & Gender toggle */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest select-none">
                    Stadionrekorde
                  </span>

                  <div className="flex rounded-lg overflow-hidden bg-slate-950 p-0.5 border border-white/5 text-[10px]">
                    <button
                      onClick={() => setGenderTab("m")}
                      className={`px-2 py-1 rounded-md font-bold transition-all ${
                        genderTab === "m" ? "bg-white/10 text-[#C1FB6E]" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Männer
                    </button>
                    <button
                      onClick={() => setGenderTab("w")}
                      className={`px-2 py-1 rounded-md font-bold transition-all ${
                        genderTab === "w" ? "bg-white/10 text-[#C1FB6E]" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Frauen
                    </button>
                  </div>
                </div>

                {/* Records Listing */}
                {activeRecords.length > 0 ? (
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-[220px] md:max-h-none pr-1">
                    {activeRecords.map((rec, ridx) => (
                      <div
                        key={ridx}
                        className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-extrabold text-[#C1FB6E]">{rec.Disziplin}</span>
                          <span className="text-white font-medium flex items-center gap-1.5">
                            <span
                              className="text-[10px] font-bold text-gray-400 px-1 py-0.5 rounded bg-white/5 border border-white/10"
                              title={rec.Land}
                            >
                              {rec.Land}
                            </span>
                            {rec.Name}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-0.5 shrink-0 text-right">
                          <span className="font-black text-white">{rec.Leistung}</span>
                          <span className="text-[10px] text-gray-400 font-medium">Jahr: {rec.Jahr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    Keine Stadionrekorde für diesen Bereich erfasst.
                  </span>
                )}
              </div>
            )}

          </div>
        ) : (
          /* DEFAULT GENERAL PANEL */
          <div className="p-6 flex flex-col gap-5 justify-between h-full select-none">
            <div className="flex flex-col gap-4">
              <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-tourOrange max-w-fit">
                Bungertstadion
              </span>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Interaktive Stadion-Erkundung
              </h3>

              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Willkommen im Bungertstadion, der traditionsreichen Heimat des Pfingstsportfests Rehlingen.
              </p>

              <p className="text-xs text-gray-400 leading-relaxed">
                Nutzen Sie die Maus oder Touchgesten im linken Bereich, um den Blickwinkel frei anzupassen, heranzuzoomen oder das Stadion zu drehen. Klicken Sie auf ein markiertes Areal, um die Detailansicht und Rekorde einzusehen.
              </p>
            </div>

            {/* Quick hot-links selection list */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest select-none">
                Direktnavigation
              </span>

              <div className="grid grid-cols-2 gap-1.5">
                {hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => handleSpotClick(spot)}
                    className="px-2.5 py-2 text-left bg-white/5 hover:bg-white/10 hover:border-white/15 border border-white/5 rounded-xl text-[11px] font-bold text-gray-300 hover:text-white transition duration-200 truncate"
                  >
                    📍 {spot.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlighted info box */}
            <div className="p-3 bg-gradient-to-r from-tourOrange/10 to-transparent border-l-2 border-tourOrange rounded-r-xl text-[10px] text-gray-400 leading-relaxed">
              💡 <strong>Tipp:</strong> Wechseln Sie oben links in die <strong>Hologramm-Ansicht (Gitter)</strong>, um ein spektakuläres, strahlendes Gittermodell des Bungertstadions im futuristischen Sci-Fi-Stil zu erleben!
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
