/* 공룡 그림 – 반사실적인 그림(투명 배경 WebP), 모두 오른쪽을 보고 있어요 */
(function () {
  const IDS = [
    'coelophysis', 'plateosaurus', 'eoraptor', 'herrerasaurus', 'riojasaurus', 'eodromaeus',
    'thecodontosaurus', 'saturnalia', 'staurikosaurus', 'eudimorphodon',
    'brachiosaurus', 'stegosaurus', 'allosaurus', 'diplodocus', 'dilophosaurus',
    'archaeopteryx', 'compsognathus', 'ceratosaurus', 'kentrosaurus', 'rhamphorhynchus',
    'tyrannosaurus', 'triceratops', 'velociraptor', 'spinosaurus', 'ankylosaurus',
    'pachycephalosaurus', 'iguanodon', 'parasaurolophus', 'pteranodon', 'koreaceratops'
  ];
  const FLY = new Set(['eudimorphodon', 'rhamphorhynchus', 'pteranodon']);

  window.DinoArt = {
    ids: IDS,
    svg(id) {
      const fly = FLY.has(id) ? ' fly' : '';
      return `<svg class="dino-svg${fly}" viewBox="0 0 240 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
        `<g class="bob"><image href="assets/dinos/${id}.webp" x="0" y="0" width="240" height="170" preserveAspectRatio="xMidYMax meet"/></g>` +
        `</svg>`;
    }
  };
})();
