import {cardBorderStyleChange, themeMapping} from './core.js'

const currThemeStr = localStorage.getItem('valid-theme') || 'vue';
const cardBorderStyleCss = cardBorderStyleChange(themeMapping.get(currThemeStr));
$('.card-border-style').html(cardBorderStyleCss);
