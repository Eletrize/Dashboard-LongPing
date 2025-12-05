/**
 * Sistema de Tradução - Dashboard LongPing
 * ═══════════════════════════════════════════════════════════════════════════════
 * Este arquivo gerencia o sistema de tradução.
 * As traduções estão em: translations.js
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// Idioma atual (disponível imediatamente)
var currentLang = localStorage.getItem('app-locale') || 'pt';

// Atualizar lang do HTML imediatamente
if (currentLang === 'zh') {
  document.documentElement.lang = 'zh-CN';
} else if (currentLang === 'en') {
  document.documentElement.lang = 'en-US';
} else {
  document.documentElement.lang = 'pt-BR';
}

/**
 * Função principal de tradução
 * Traduz um texto do português para o idioma atual
 * @param {string} text - Texto em português a ser traduzido
 * @returns {string} - Texto traduzido ou original se não houver tradução
 */
function translateText(text) {
  // Se não há texto ou idioma é português, retorna o original
  if (!text || currentLang === 'pt') {
    return text;
  }
  
  // Verifica se TRANSLATIONS existe
  if (typeof TRANSLATIONS === 'undefined') {
    console.warn('TRANSLATIONS não carregado ainda');
    return text;
  }
  
  // Busca tradução exata
  if (TRANSLATIONS[text] && TRANSLATIONS[text][currentLang]) {
    return TRANSLATIONS[text][currentLang];
  }
  
  // Se não encontrou tradução, retorna o original
  return text;
}

/**
 * Alias para compatibilidade
 */
function t(key) {
  return translateText(key);
}

/**
 * Traduz o nome de um ambiente (usado nos templates)
 */
function getTranslatedEnvName(envKey) {
  if (typeof CLIENT_CONFIG !== 'undefined' && CLIENT_CONFIG.environments && CLIENT_CONFIG.environments[envKey]) {
    var originalName = CLIENT_CONFIG.environments[envKey].name;
    return translateText(originalName);
  }
  return envKey;
}

/**
 * Atualiza todos os elementos com traduções após carregamento da página
 */
function updateTranslations() {
  if (currentLang === 'pt') return;

  // Helper para traduzir o texto de um elemento, guardando o original
  function translateElementText(el) {
    var original = el.getAttribute('data-original') || el.textContent.trim();
    if (!original) return;

    el.setAttribute('data-original', original);
    var translated = translateText(original);
    if (translated && translated !== original) {
      el.textContent = translated;
    }
  }

  // Helper para traduzir atributos (aria-label, title, placeholder, alt)
  function translateElementAttr(el, attrName, dataAttr) {
    var original = el.getAttribute(dataAttr) || el.getAttribute(attrName);
    if (!original) return;

    el.setAttribute(dataAttr, original);
    var translated = translateText(original);
    if (translated && translated !== original) {
      el.setAttribute(attrName, translated);
    }
  }
  
  // Traduzir elementos com classe específica
  var selectors = [
    '.control-label',
    '.card-environment-title',
    '.area-card-title',
    '.ambiente-title',
    '.ac-mode-btn__label',
    '.volume-label',
    '.playback-volume-label',
    '.tv-section-title',
    '.media-panel__section-title',
    '.media-device-card__title',
    '.media-device-card__name',
    '.media-panel__action-btn',
    '.media-panel__section-title h2',
    '.media-panel__section-title p',
    '.music-master-btn',
    '.curtain-tile__title',
    '.scene-card__title',
    '.feature-label',
    '[data-i18n]'
  ];
  
  selectors.forEach(function(selector) {
    document.querySelectorAll(selector).forEach(function(el) {
      translateElementText(el);
    });
  });

  // Traduzir contagens e labels do painel de mídia (p, h2 já cobertos, mas garantimos spans dinâmicos)
  document.querySelectorAll('.media-panel__section-title p').forEach(function(el) {
    translateElementText(el);
  });

  // Traduzir título da página
  var titleEl = document.querySelector('head > title');
  if (titleEl) {
    var originalTitle = titleEl.getAttribute('data-original') || titleEl.textContent.trim() || document.title;
    if (originalTitle) {
      titleEl.setAttribute('data-original', originalTitle);
      var translatedTitle = translateText(originalTitle);
      if (translatedTitle && translatedTitle !== originalTitle) {
        titleEl.textContent = translatedTitle;
        document.title = translatedTitle;
      }
    }
  }
  
  // Traduzir aria-labels
  document.querySelectorAll('[aria-label]').forEach(function(el) {
    translateElementAttr(el, 'aria-label', 'data-original-aria');
  });

  // Traduzir outros atributos textuais comuns
  ['title', 'placeholder', 'alt'].forEach(function(attrName) {
    document.querySelectorAll('[' + attrName + ']').forEach(function(el) {
      translateElementAttr(el, attrName, 'data-original-' + attrName);
    });
  });
}

/**
 * Atualiza os botões de seleção de idioma
 */
function updateLanguageButtons() {
  document.querySelectorAll('.app-info-language__btn').forEach(function(btn) {
    var locale = btn.getAttribute('data-locale');
    if (locale === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Troca o idioma e recarrega a página
 */
function changeLanguage(lang) {
  if (lang !== 'pt' && lang !== 'en' && lang !== 'zh') {
    return;
  }
  
  localStorage.setItem('app-locale', lang);
  window.location.reload();
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  updateLanguageButtons();
  
  // Listener para botões de idioma
  var selector = document.getElementById('language-selector');
  if (selector) {
    selector.addEventListener('click', function(e) {
      var btn = e.target.closest('.app-info-language__btn');
      if (btn) {
        var locale = btn.getAttribute('data-locale');
        if (locale) {
          changeLanguage(locale);
        }
      }
    });
  }
  
  // Atualizar traduções em intervalos para pegar elementos dinâmicos
  if (currentLang !== 'pt') {
    setTimeout(updateTranslations, 300);
    setTimeout(updateTranslations, 1000);
    setTimeout(updateTranslations, 2500);
  }

  // Reaplicar traduções quando novos elementos forem inseridos (debounced)
  if (currentLang !== 'pt' && typeof MutationObserver !== 'undefined') {
    var translateDebounce = null;
    var observer = new MutationObserver(function() {
      if (translateDebounce) {
        clearTimeout(translateDebounce);
      }
      translateDebounce = setTimeout(function() {
        updateTranslations();
      }, 250);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});

// Exportar funções globalmente
window.t = t;
window.translateText = translateText;
window.getTranslatedEnvName = getTranslatedEnvName;
window.changeLanguage = changeLanguage;
window.updateTranslations = updateTranslations;
window.currentLang = currentLang;
