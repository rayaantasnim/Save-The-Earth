/**
 * IDAI - Earth // Ultra-Realistic 3D Cosmic Space Engine
 * Pure Vanilla JavaScript Three.js Engine
 * Features:
 *  - Photorealistic Textured 3D Planet Earth (Day terrain, Night city lights shader,
 *    swirling independent Cloud layer with depth, Rayleigh atmospheric scattering glow)
 *  - Ambient Starfield with Twinkle Dynamics (3,000 stars)
 *  - Vertical Ice-Blue Star Rain & 45-Degree Shooting Stars
 *  - Interactive Mouse Cursor Parallax Swivel
 *  - Scroll-Responsive Earth Transformation (Home Page: Centered -> Shrink & Float Right -> Fade at Footer)
 *  - Themed Subpage Planetoids (Lungs Emerald, Ice Cryo, Energy Volcanic, Fix Mint)
 *  - Clean, Professional Navigation Controller (No symbols, clean 1-5 indexed links)
 */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  function initAll() {
    initNavigation();
    initSpaceEngine();
  }

  /* ==========================================================================
     1. GLOBAL NAVIGATION CONTROLLER
     ========================================================================== */
  function initNavigation() {
    const navBtn = document.getElementById('nav-trigger-btn');
    const desktopDropdown = document.getElementById('desktop-dropdown');
    const hamburgerBtn = document.getElementById('mobile-hamburger-btn');
    const drawerOverlay = document.getElementById('mobile-drawer-overlay');
    const drawer = document.getElementById('mobile-drawer');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');

    // Detect current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Highlight active link
    const allLinks = document.querySelectorAll('.dropdown-link, .drawer-link');
    allLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active-page');
      }
    });

    // Desktop Dropdown Toggle
    if (navBtn && desktopDropdown) {
      navBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = desktopDropdown.classList.contains('show');
        if (isOpen) {
          desktopDropdown.classList.remove('show');
          navBtn.classList.remove('open');
        } else {
          desktopDropdown.classList.add('show');
          navBtn.classList.add('open');
        }
      });

      document.addEventListener('click', function (e) {
        if (!navBtn.contains(e.target) && !desktopDropdown.contains(e.target)) {
          desktopDropdown.classList.remove('show');
          navBtn.classList.remove('open');
        }
      });
    }

    // Mobile Drawer Open & Close
    function openDrawer() {
      if (drawer && drawerOverlay) {
        drawer.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (drawer && drawerOverlay) {
        drawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openDrawer();
      });
    }

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', closeDrawer);
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrawer();
        if (desktopDropdown) desktopDropdown.classList.remove('show');
        if (navBtn) navBtn.classList.remove('open');
      }
    });
  }

  /* ==========================================================================
     2. PROCEDURAL HIGH-RESOLUTION TEXTURE GENERATORS (INSTANT FALLBACK & BASE)
     ========================================================================== */
  function createProceduralEarthDayTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Deep ocean base
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGrad.addColorStop(0, '#0a2342');
    oceanGrad.addColorStop(0.5, '#051930');
    oceanGrad.addColorStop(1, '#0a2342');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Oceanic shelf shallow blues
    ctx.fillStyle = '#0f3d63';
    ctx.beginPath();
    ctx.ellipse(450, 480, 220, 280, 0, 0, Math.PI * 2);
    ctx.ellipse(1400, 420, 420, 320, 0, 0, Math.PI * 2);
    ctx.ellipse(1000, 500, 180, 300, 0, 0, Math.PI * 2);
    ctx.fill();

    // Continent silhouettes (Americas, Eurasia, Africa, Australia, Antarctica)
    ctx.fillStyle = '#1e3d23'; // Base vegetation green

    // North America
    ctx.beginPath();
    ctx.moveTo(280, 220);
    ctx.lineTo(440, 180);
    ctx.lineTo(520, 240);
    ctx.lineTo(480, 380);
    ctx.lineTo(390, 440);
    ctx.lineTo(320, 420);
    ctx.lineTo(260, 320);
    ctx.closePath();
    ctx.fill();

    // South America
    ctx.beginPath();
    ctx.moveTo(420, 480);
    ctx.lineTo(540, 520);
    ctx.lineTo(500, 720);
    ctx.lineTo(440, 820);
    ctx.lineTo(410, 680);
    ctx.closePath();
    ctx.fill();

    // Europe & Asia
    ctx.beginPath();
    ctx.moveTo(960, 200);
    ctx.lineTo(1250, 180);
    ctx.lineTo(1650, 240);
    ctx.lineTo(1580, 460);
    ctx.lineTo(1420, 500);
    ctx.lineTo(1220, 440);
    ctx.lineTo(1050, 340);
    ctx.closePath();
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.moveTo(950, 380);
    ctx.lineTo(1140, 390);
    ctx.lineTo(1180, 580);
    ctx.lineTo(1080, 750);
    ctx.lineTo(990, 600);
    ctx.lineTo(920, 460);
    ctx.closePath();
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.ellipse(1600, 680, 140, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    // Deserts (Sahara, Middle East, Gobi, Australian Outback)
    ctx.fillStyle = '#9b824b';
    ctx.beginPath();
    ctx.ellipse(1040, 440, 110, 50, 0, 0, Math.PI * 2); // Sahara
    ctx.ellipse(1180, 420, 60, 40, 0, 0, Math.PI * 2);  // Arabian
    ctx.ellipse(1380, 360, 110, 40, 0, 0, Math.PI * 2); // Gobi
    ctx.ellipse(1600, 680, 80, 50, 0, 0, Math.PI * 2);  // Outback
    ctx.fill();

    // High mountain snowy ridges
    ctx.fillStyle = '#b0c4de';
    ctx.beginPath();
    ctx.ellipse(1350, 380, 120, 15, -0.2, 0, Math.PI * 2); // Himalayas
    ctx.ellipse(360, 320, 15, 140, 0.1, 0, Math.PI * 2);  // Rockies
    ctx.ellipse(450, 650, 15, 160, -0.1, 0, Math.PI * 2); // Andes
    ctx.fill();

    // Polar ice caps (Greenland & Arctic, Antarctica)
    ctx.fillStyle = '#f0f8ff';
    ctx.fillRect(0, 0, canvas.width, 90); // North pole
    ctx.fillRect(0, canvas.height - 110, canvas.width, 110); // Antarctica

    // Greenland
    ctx.beginPath();
    ctx.ellipse(660, 170, 70, 90, 0.2, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  function createProceduralEarthNightTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Deep unlit pitch black
    ctx.fillStyle = '#010308';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // City lights clusters (golden-amber glow)
    function addCityClusters(x, y, radius, density, intensity) {
      for (let i = 0; i < density; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 1.6) * radius;
        const cx = x + Math.cos(angle) * dist;
        const cy = y + Math.sin(angle) * dist;
        const brightness = Math.random() * intensity;

        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 3 + Math.random() * 4);
        radGrad.addColorStop(0, `rgba(255, 220, 140, ${brightness})`);
        radGrad.addColorStop(0.4, `rgba(255, 180, 70, ${brightness * 0.7})`);
        radGrad.addColorStop(1, 'rgba(255, 160, 40, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 4 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // North America East & West coasts, Europe, India, East Asia, Japan, Nile
    addCityClusters(460, 310, 80, 220, 0.95); // US East Coast
    addCityClusters(320, 330, 60, 140, 0.9);  // US West Coast
    addCityClusters(1020, 260, 85, 320, 1.0); // Western Europe
    addCityClusters(1280, 470, 75, 260, 0.95); // India
    addCityClusters(1500, 390, 95, 300, 0.98); // Eastern China
    addCityClusters(1620, 360, 45, 180, 1.0);  // Japan
    addCityClusters(1060, 410, 30, 80, 0.85);  // Nile Delta
    addCityClusters(510, 680, 50, 110, 0.8);   // SE Brazil
    addCityClusters(1640, 720, 45, 90, 0.85);  // SE Australia

    return new THREE.CanvasTexture(canvas);
  }

  function createProceduralCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Transparent void
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Realistic swirling cyclone cloud bands
    ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';

    function drawCloudSwirl(cx, cy, radius, arms) {
      for (let a = 0; a < arms; a++) {
        const baseAngle = (a / arms) * Math.PI * 2;
        ctx.beginPath();
        for (let r = 5; r < radius; r += 6) {
          const angle = baseAngle + r * 0.05;
          const px = cx + Math.cos(angle) * r + (Math.random() - 0.5) * 12;
          const py = cy + Math.sin(angle) * r * 0.6 + (Math.random() - 0.5) * 8;
          ctx.arc(px, py, 6 + Math.random() * 12, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    }

    // Cyclonic systems
    drawCloudSwirl(520, 260, 90, 4);  // North Atlantic low
    drawCloudSwirl(1550, 310, 110, 5); // Pacific typhoon
    drawCloudSwirl(1350, 520, 80, 3);  // Indian Ocean monsoon
    drawCloudSwirl(420, 680, 100, 4);  // Southern Ocean spiral

    // Equatorial trade wind cloud band
    for (let x = 0; x < canvas.width; x += 18) {
      const cy = 512 + Math.sin(x * 0.015) * 45 + (Math.random() - 0.5) * 25;
      ctx.beginPath();
      ctx.arc(x, cy, 12 + Math.random() * 18, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mid-latitude jet stream streaks
    for (let x = 0; x < canvas.width; x += 24) {
      const cy1 = 280 + Math.cos(x * 0.012) * 50 + (Math.random() - 0.5) * 20;
      const cy2 = 740 + Math.sin(x * 0.011) * 40 + (Math.random() - 0.5) * 20;
      ctx.beginPath();
      ctx.arc(x, cy1, 10 + Math.random() * 16, 0, Math.PI * 2);
      ctx.arc(x, cy2, 10 + Math.random() * 16, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  /* ==========================================================================
     3. THREE.JS 3D SPACE ENGINE
     ========================================================================== */
  function initSpaceEngine() {
    const container = document.getElementById('webgl-container');
    if (!container || typeof THREE === 'undefined') return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPath === 'index.html' || currentPath === '';

    // Determine subpage theme
    const bodyTheme = document.body.getAttribute('data-theme') || 'cosmic';

    // -------------------------------------------------------------
    // SCENE, CAMERA, RENDERER
    // -------------------------------------------------------------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // 1. AMBIENT STARFIELD (3,000 TWINKLING STARS)
    // -------------------------------------------------------------
    const starCount = 3000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starBaseAlpha = new Float32Array(starCount);
    const starTwinkleSpeed = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 1600;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 1200 - 200;

      starBaseAlpha[i] = 0.3 + Math.random() * 0.7;
      starTwinkleSpeed[i] = 0.8 + Math.random() * 2.5;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('alpha', new THREE.BufferAttribute(starBaseAlpha, 1));

    // Circular star canvas texture
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const starCtx = starCanvas.getContext('2d');
    const radG = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radG.addColorStop(0, 'rgba(255, 255, 255, 1)');
    radG.addColorStop(0.35, 'rgba(180, 235, 255, 0.8)');
    radG.addColorStop(0.7, 'rgba(0, 220, 255, 0.25)');
    radG.addColorStop(1, 'rgba(0, 0, 0, 0)');
    starCtx.fillStyle = radG;
    starCtx.fillRect(0, 0, 32, 32);

    const starTex = new THREE.CanvasTexture(starCanvas);

    const starMat = new THREE.PointsMaterial({
      size: 3.4,
      map: starTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xdaecf8,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // -------------------------------------------------------------
    // 2. VERTICAL ICE-BLUE STAR RAIN
    // -------------------------------------------------------------
    const rainCount = 650;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    const rainVel = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      rainPos[i * 3] = (Math.random() - 0.5) * 800;
      rainPos[i * 3 + 1] = (Math.random() - 0.5) * 600;
      rainPos[i * 3 + 2] = (Math.random() - 0.5) * 400;
      rainVel[i] = 0.45 + Math.random() * 0.85;
    }

    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));

    const rainMat = new THREE.PointsMaterial({
      size: 2.2,
      map: starTex,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x88eeff,
    });

    const starRain = new THREE.Points(rainGeo, rainMat);
    scene.add(starRain);

    // -------------------------------------------------------------
    // 3. FAST-VELOCITY 45-DEGREE SHOOTING STARS
    // -------------------------------------------------------------
    const shootingStars = [];
    const maxShootingStars = 3;

    function spawnShootingStar() {
      if (shootingStars.length >= maxShootingStars) return;

      const lineGeo = new THREE.BufferGeometry();
      const length = 28 + Math.random() * 24;
      const startX = (Math.random() - 0.5) * 450;
      const startY = 140 + Math.random() * 90;
      const startZ = (Math.random() - 0.5) * 120;

      const positions = new Float32Array([
        startX,
        startY,
        startZ,
        startX - length * 0.707,
        startY - length * 0.707,
        startZ,
      ]);

      lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      shootingStars.push({
        mesh: line,
        speedX: -3.2 - Math.random() * 1.6,
        speedY: -3.2 - Math.random() * 1.6,
        opacity: 0.95,
        life: 0,
        maxLife: 55,
      });
    }

    // -------------------------------------------------------------
    // 4. REALISTIC LIGHTING RIG (SOLAR ILLUMINATION)
    // -------------------------------------------------------------
    // Soft cosmic deep space ambient
    const ambientLight = new THREE.AmbientLight(0x020814, 0.85);
    scene.add(ambientLight);

    // Sun directional light: strong, crisp solar vector from top-left
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(120, 50, 90).normalize();
    scene.add(sunLight);

    // Deep space subtle blue fill
    const rimFillLight = new THREE.DirectionalLight(0x003366, 0.6);
    rimFillLight.position.set(-100, -60, -80);
    scene.add(rimFillLight);

    // -------------------------------------------------------------
    // 5. [HOME PAGE] PHOTOREALISTIC 3D PLANET EARTH
    // -------------------------------------------------------------
    let earthGroup = null;
    let earthSurface = null;
    let cloudMesh = null;
    let atmosphereMesh = null;
    let earthShaderMaterial = null;

    // Subpage planetoids
    let subpagePlanetoids = [];

    if (isHomePage) {
      earthGroup = new THREE.Group();

      // Create procedural initial high-fidelity textures
      const dayTexture = createProceduralEarthDayTexture();
      const nightTexture = createProceduralEarthNightTexture();
      const cloudTexture = createProceduralCloudTexture();

      // Attempt async photo-texture upgrades from reliable public CDNs
      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = 'anonymous';

      // Photorealistic Earth Day Map
      textureLoader.load(
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        function (loadedTex) {
          loadedTex.wrapS = THREE.RepeatWrapping;
          loadedTex.wrapT = THREE.ClampToEdgeWrapping;
          if (earthShaderMaterial) {
            earthShaderMaterial.uniforms.dayTexture.value = loadedTex;
            earthShaderMaterial.needsUpdate = true;
          }
        },
        undefined,
        function () {
          // Fallback to second mirror if needed
          textureLoader.load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
            function (tex2) {
              if (earthShaderMaterial) {
                earthShaderMaterial.uniforms.dayTexture.value = tex2;
                earthShaderMaterial.needsUpdate = true;
              }
            }
          );
        }
      );

      // Photorealistic Earth Night Lights Map
      textureLoader.load(
        'https://unpkg.com/three-globe/example/img/earth-night.jpg',
        function (loadedNight) {
          loadedNight.wrapS = THREE.RepeatWrapping;
          loadedNight.wrapT = THREE.ClampToEdgeWrapping;
          if (earthShaderMaterial) {
            earthShaderMaterial.uniforms.nightTexture.value = loadedNight;
            earthShaderMaterial.needsUpdate = true;
          }
        }
      );

      // Photorealistic Clouds Map
      textureLoader.load(
        'https://unpkg.com/three-globe/example/img/earth-clouds.png',
        function (loadedClouds) {
          loadedClouds.wrapS = THREE.RepeatWrapping;
          loadedClouds.wrapT = THREE.ClampToEdgeWrapping;
          if (cloudMesh && cloudMesh.material) {
            cloudMesh.material.map = loadedClouds;
            cloudMesh.material.needsUpdate = true;
          }
        }
      );

      // Custom Photorealistic Earth Day/Night + Specular Shader
      const earthVertexShader = `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vSunDirection;
        varying vec3 vViewPosition;

        uniform vec3 sunPosition;

        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vNormal = normalize(mat3(modelMatrix) * normal);
          vSunDirection = normalize(sunPosition - worldPos.xyz);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const earthFragmentShader = `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vSunDirection;
        varying vec3 vViewPosition;

        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform float globalOpacity;

        void main() {
          vec3 dayColor = texture2D(dayTexture, vUv).rgb;
          vec3 nightColor = texture2D(nightTexture, vUv).rgb;

          // Compute solar incidence
          float NdotL = dot(vNormal, vSunDirection);

          // Smooth twilight terminator transition between -0.15 and +0.20
          float dayFactor = smoothstep(-0.15, 0.20, NdotL);

          // Ocean specular highlight when viewed into the sun reflection
          vec3 viewDir = normalize(vViewPosition);
          vec3 halfVec = normalize(vSunDirection + viewDir);
          float specFactor = pow(max(dot(vNormal, halfVec), 0.0), 32.0);
          
          // Specular applied mainly to oceans (bluish areas)
          float isOcean = smoothstep(0.15, 0.45, dayColor.b - dayColor.r);
          vec3 specular = vec3(0.6, 0.85, 1.0) * specFactor * isOcean * dayFactor * 0.9;

          // Twilight warm sunset glow along terminator
          float twilightFactor = (1.0 - abs(NdotL * 3.5)) * step(abs(NdotL), 0.28);
          vec3 sunsetGlow = vec3(0.9, 0.45, 0.15) * max(twilightFactor, 0.0) * 0.35;

          // City lights on the dark hemisphere
          vec3 finalNight = nightColor * (1.0 - dayFactor) * 1.7;
          vec3 finalDay = dayColor * dayFactor + specular + sunsetGlow;

          vec3 finalColor = finalDay + finalNight;

          gl_FragColor = vec4(finalColor, globalOpacity);
        }
      `;

      earthShaderMaterial = new THREE.ShaderMaterial({
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader,
        uniforms: {
          dayTexture: { value: dayTexture },
          nightTexture: { value: nightTexture },
          sunPosition: { value: new THREE.Vector3(120, 50, 90) },
          globalOpacity: { value: 1.0 },
        },
        transparent: true,
      });

      // 1. Earth Solid Surface Sphere
      const earthGeo = new THREE.SphereGeometry(32, 64, 64);
      earthSurface = new THREE.Mesh(earthGeo, earthShaderMaterial);
      earthGroup.add(earthSurface);

      // 2. Realistic Swirling Clouds Mesh (Slightly larger radius)
      const cloudGeo = new THREE.SphereGeometry(32.45, 64, 64);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.NormalBlending,
        roughness: 1.0,
        metalness: 0.0,
      });
      cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      earthGroup.add(cloudMesh);

      // 3. Rayleigh Atmospheric Scattering Outer Glow Mesh
      const atmosVertexShader = `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const atmosFragmentShader = `
        varying vec3 vNormal;
        uniform float globalOpacity;

        void main() {
          // Fresnel rim calculation
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          vec3 atmosphereColor = vec3(0.2, 0.65, 1.0); // Electric sapphire-cyan
          gl_FragColor = vec4(atmosphereColor, intensity * 0.85 * globalOpacity);
        }
      `;

      const atmosGeo = new THREE.SphereGeometry(34.2, 64, 64);
      const atmosMat = new THREE.ShaderMaterial({
        vertexShader: atmosVertexShader,
        fragmentShader: atmosFragmentShader,
        uniforms: {
          globalOpacity: { value: 1.0 },
        },
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
      earthGroup.add(atmosphereMesh);

      // Initial Placement: centered behind floating welcome card at 0% scroll
      earthGroup.position.set(0, 0, -25);
      earthGroup.scale.set(1.0, 1.0, 1.0);
      earthGroup.rotation.z = THREE.MathUtils.degToRad(23.44); // Authentic Earth axial tilt!

      scene.add(earthGroup);
    } else {
      // -------------------------------------------------------------
      // 6. [SUBPAGES] THEMED DEEP-SPACE PLANETOIDS
      // -------------------------------------------------------------
      let planetoidColor = 0x00ffcc;
      let planetoidSecondary = 0x0077ff;

      if (bodyTheme === 'lungs') {
        planetoidColor = 0x10b981; // Emerald
        planetoidSecondary = 0x064e3b;
      } else if (bodyTheme === 'ice') {
        planetoidColor = 0x38bdf8; // Glacier ice blue
        planetoidSecondary = 0x0369a1;
      } else if (bodyTheme === 'energy') {
        planetoidColor = 0xf59e0b; // Amber-red volcanic
        planetoidSecondary = 0xb45309;
      } else if (bodyTheme === 'fix') {
        planetoidColor = 0x14b8a6; // Mint-teal terraformed
        planetoidSecondary = 0x0f766e;
      }

      // Deep space planetoid 1 (Large distant world)
      const p1Geo = new THREE.SphereGeometry(18, 48, 48);
      const p1Mat = new THREE.MeshStandardMaterial({
        color: planetoidSecondary,
        roughness: 0.8,
        metalness: 0.2,
      });
      const p1Mesh = new THREE.Mesh(p1Geo, p1Mat);
      p1Mesh.position.set(-65, 32, -90);

      // Subtle atmospheric halo on planetoid 1
      const p1HaloGeo = new THREE.SphereGeometry(19.2, 32, 32);
      const p1HaloMat = new THREE.MeshBasicMaterial({
        color: planetoidColor,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      const p1Halo = new THREE.Mesh(p1HaloGeo, p1HaloMat);
      p1Mesh.add(p1Halo);

      scene.add(p1Mesh);
      subpagePlanetoids.push({ mesh: p1Mesh, rotSpeed: 0.0018, floatSpeed: 0.8 });

      // Deep space planetoid 2 (Smaller companion moon)
      const p2Geo = new THREE.SphereGeometry(9, 36, 36);
      const p2Mat = new THREE.MeshStandardMaterial({
        color: planetoidColor,
        roughness: 0.9,
      });
      const p2Mesh = new THREE.Mesh(p2Geo, p2Mat);
      p2Mesh.position.set(70, -28, -70);
      scene.add(p2Mesh);
      subpagePlanetoids.push({ mesh: p2Mesh, rotSpeed: -0.0025, floatSpeed: 1.1 });
    }

    // -------------------------------------------------------------
    // 7. CURSOR PARALLAX INTERACTION
    // -------------------------------------------------------------
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    window.addEventListener('mousemove', function (e) {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = (e.clientY - halfH) / halfH;
    });

    // -------------------------------------------------------------
    // 8. SCROLL-RESPONSIVE TRANSFORMATION (HOME PAGE)
    // -------------------------------------------------------------
    let scrollFraction = 0;
    let isNearBottom = false;

    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollFraction = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

      // Detect if user has reached bottom near footer
      const distanceFromBottom = docHeight - scrollTop;
      isNearBottom = distanceFromBottom < 160;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // -------------------------------------------------------------
    // 9. ANIMATION & RENDER LOOP
    // -------------------------------------------------------------
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth cursor parallax interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Parallax camera tilt
      camera.position.x = currentMouseX * 10;
      camera.position.y = -currentMouseY * 8;
      camera.lookAt(0, 0, -25);

      // Starfield subtle slow rotation
      starField.rotation.y = elapsedTime * 0.008;
      starField.rotation.x = currentMouseY * 0.04;

      // Vertical star rain movement
      const rainPositions = rainGeo.attributes.position.array;
      for (let i = 0; i < rainCount; i++) {
        rainPositions[i * 3 + 1] -= rainVel[i];
        if (rainPositions[i * 3 + 1] < -300) {
          rainPositions[i * 3 + 1] = 300;
          rainPositions[i * 3] = (Math.random() - 0.5) * 800;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;

      // Random shooting star spawns
      if (Math.random() < 0.016) {
        spawnShootingStar();
      }

      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.mesh.position.x += s.speedX;
        s.mesh.position.y += s.speedY;
        s.life++;

        s.mesh.material.opacity = Math.max(0, 1 - s.life / s.maxLife);

        if (s.life >= s.maxLife) {
          scene.remove(s.mesh);
          s.mesh.geometry.dispose();
          s.mesh.material.dispose();
          shootingStars.splice(i, 1);
        }
      }

      // HOME PAGE: Realistic Earth Rotation and Scroll Transformations
      if (isHomePage && earthGroup) {
        // Authentic axial rotation: Earth rotates continuously eastward
        earthSurface.rotation.y += 0.0016;

        // Clouds rotate independently at a slightly faster velocity to create 3D atmosphere depth!
        if (cloudMesh) {
          cloudMesh.rotation.y += 0.0021;
        }

        // SCROLL-RESPONSIVE TRANSFORMATION:
        // At 0% scroll: centered behind welcome card: (0, 0, -25), scale 1.0
        // As user scrolls down: scales down smoothly to 0.48 and glides into right-hand column: (48, -18, -15)
        const targetX = THREE.MathUtils.lerp(0, 48, Math.min(scrollFraction * 2.2, 1));
        const targetY = THREE.MathUtils.lerp(0, -18, Math.min(scrollFraction * 2.2, 1));
        const targetScale = THREE.MathUtils.lerp(1.0, 0.48, Math.min(scrollFraction * 2.2, 1));

        earthGroup.position.x += (targetX - earthGroup.position.x) * 0.08;
        earthGroup.position.y += (targetY - earthGroup.position.y) * 0.08;

        const currentScale = earthGroup.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.08;
        earthGroup.scale.set(newScale, newScale, newScale);

        // Opacity drops to 0 when nearing bottom footer
        const targetOpacity = isNearBottom ? 0.0 : 1.0;
        if (earthShaderMaterial) {
          const currentOp = earthShaderMaterial.uniforms.globalOpacity.value;
          earthShaderMaterial.uniforms.globalOpacity.value +=
            (targetOpacity - currentOp) * 0.1;
        }
        if (cloudMesh && cloudMesh.material) {
          cloudMesh.material.opacity +=
            (targetOpacity * 0.85 - cloudMesh.material.opacity) * 0.1;
        }
        if (atmosphereMesh && atmosphereMesh.material) {
          atmosphereMesh.material.uniforms.globalOpacity.value +=
            (targetOpacity - atmosphereMesh.material.uniforms.globalOpacity.value) * 0.1;
        }
      }

      // SUBPAGES: Rotate distant planetoids
      if (!isHomePage && subpagePlanetoids.length > 0) {
        subpagePlanetoids.forEach((p, idx) => {
          p.mesh.rotation.y += p.rotSpeed;
          p.mesh.rotation.x += p.rotSpeed * 0.4;
          p.mesh.position.y += Math.sin(elapsedTime * p.floatSpeed + idx) * 0.04;
        });
      }

      renderer.render(scene, camera);
    }

    animate();

    // -------------------------------------------------------------
    // 10. RESIZE LISTENER
    // -------------------------------------------------------------
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
})();
