import { JSDOM } from 'jsdom';
import fs from 'fs';

const html = await (await fetch('http://localhost:4173/')).text();
const jsUrl = html.match(/src="(\/assets\/[^"]+\.js)"/)?.[1];
const jsCode = await (await fetch('http://localhost:4173' + jsUrl)).text();

const dom = new JSDOM(html, {
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  url: 'http://localhost:4173/',
  resources: 'usable',
});

const errors = [];
dom.window.addEventListener('error', (e) => errors.push('ERROR: ' + e.message + ' @ ' + (e.filename||'') + ':' + (e.lineno||'')));
dom.window.addEventListener('unhandledrejection', (e) => errors.push('REJECT: ' + e.reason));

// Add storage
let store = {};
Object.defineProperty(dom.window, 'localStorage', { value: { getItem: k=>store[k]??null, setItem:(k,v)=>store[k]=v, removeItem:k=>delete store[k], key:i=>Object.keys(store)[i], get length(){return Object.keys(store).length} } });
Object.defineProperty(dom.window, 'sessionStorage', { value: { getItem: ()=>null, setItem:()=>{}, removeItem:()=>{}, } });
Object.defineProperty(dom.window, 'matchMedia', { value: () => ({ matches: false, addEventListener:()=>{}, removeEventListener:()=>{} }) });

try {
  dom.window.eval(jsCode);
} catch (e) {
  console.log('SYNC ERROR:', e.message);
  console.log(e.stack?.split('\n').slice(0,5).join('\n'));
}

await new Promise(r => setTimeout(r, 500));

console.log('--- ERRORS ---');
console.log(errors.join('\n') || '(none)');
console.log('--- #root inner length ---');
console.log(dom.window.document.getElementById('root').innerHTML.length, 'chars');
console.log('--- first 400 chars of #root ---');
console.log(dom.window.document.getElementById('root').innerHTML.slice(0,400));
