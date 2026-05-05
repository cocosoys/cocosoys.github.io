'use strict';

(function initCocosoysLive2D() {
  const fallbackId = 'coco-live2d-fallback';
  const fallbackDelay = 4500;

  function mountFallback(message) {
    if (document.getElementById(fallbackId)) return;

    const shell = document.createElement('aside');
    shell.id = fallbackId;
    shell.className = 'coco-live2d-fallback';
    shell.setAttribute('aria-label', '东方风味看板娘');
    shell.innerHTML = `
      <button class="coco-live2d-close" type="button" aria-label="关闭看板娘">×</button>
      <img src="/img/reimu-workshop-card.svg" alt="博丽灵梦风味看板">
      <p>博丽结界值班中</p>
      <small>${message}</small>
    `;
    shell.querySelector('button').addEventListener('click', () => shell.remove());
    document.body.appendChild(shell);
  }

  function loadWidget() {
    if (!window.OML2D || typeof window.OML2D.loadOml2d !== 'function') {
      mountFallback('Live2D 资源未加载，先显示静态看板。');
      return;
    }

    try {
      window.OML2D.loadOml2d({
        primaryColor: '#c84759',
        sayHello: false,
        mobileDisplay: true,
        models: [
          {
            path: '/live2d/shizuku/shizuku.model.json',
            position: [0, 76],
            scale: 0.18,
            stageStyle: {
              width: 260,
              height: 360
            }
          }
        ],
        tips: {
          idleTips: {
            wordTheDay: false,
            message: [
              '符卡边框已经展开。',
              '今天也把项目整理成可复用的东西。',
              '没有接入来源不明的灵梦模型，先用可加载模型值班。'
            ]
          },
          welcomeTips: {
            message: {
              daybreak: '早安，工坊开门。',
              morning: '上午好，先看项目还是先写笔记？',
              afternoon: '下午好，结界稳定运行中。',
              dusk: '傍晚好，适合整理 GitHub。',
              night: '晚上好，记得留一点创作时间。',
              lateNight: '夜深了，旧版本兼容也需要休息。'
            }
          }
        }
      });
    } catch (error) {
      mountFallback('Live2D 初始化失败，先显示静态看板。');
    }
  }

  window.addEventListener('load', () => {
    window.setTimeout(loadWidget, 250);
    window.setTimeout(() => {
      if (!document.querySelector('#oml2d, .oml2d-stage, canvas')) {
        mountFallback('Live2D 正在后台加载，先显示静态看板。');
      }
    }, fallbackDelay);
  });
})();
