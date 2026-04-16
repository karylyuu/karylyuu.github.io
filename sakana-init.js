const sakana = SakanaWidget.create({
  el: '#sakana-container',

  character: {
    image: 'character.png',
    scale: 0.4,
  },

  interactive: true,
});

// 위치 고정 (유나 스타일)
const el = document.getElementById('sakana-container');

el.style.position = 'fixed';
el.style.right = '40px';
el.style.bottom = '0px';
el.style.zIndex = '9999';
