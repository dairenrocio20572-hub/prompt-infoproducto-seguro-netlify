const config={checkoutUrl:'https://pay.hotmart.com/P108066825H?checkoutMode=10',priceLabel:'$7.99'};
const dialog=document.querySelector('#resource-dialog');
let resources=[];
function openResource(item){document.querySelector('#dialog-image').src=item.image;document.querySelector('#dialog-image').alt=item.title;document.querySelector('#dialog-title').textContent=item.title;document.querySelector('#dialog-category').textContent=item.category;document.querySelector('#dialog-description').textContent=item.desc;dialog.showModal();}
function card(item,index,bonus=false){const article=document.createElement('article');article.className=bonus?'resource-card bonus-card':'resource-card';const button=document.createElement('button');button.className='cover-button';button.setAttribute('aria-label','Ver detalle: '+item.title);const image=document.createElement('img');image.src=item.image;image.alt=item.title;image.loading='lazy';button.append(image);const hint=document.createElement('span');hint.className='cover-hint';hint.textContent='Conocer recurso ↗';button.append(hint);button.addEventListener('click',()=>openResource(item));const meta=document.createElement('p');meta.className='resource-meta';meta.textContent=bonus?'COMPLEMENTO '+String(index+1).padStart(2,'0'):item.category.toUpperCase();const title=document.createElement('h3');title.textContent=item.title;article.append(button,meta,title);return article;}
function render(filter='Todos'){const list=resources.slice(0,9).filter(item=>filter==='Todos'||item.category===filter);const catalog=document.querySelector('#catalog');catalog.replaceChildren(...list.map((item,i)=>card(item,i)));document.querySelector('#result-count').textContent=list.length+' ebook'+(list.length===1?'':'s');}
fetch('catalog.json').then(r=>{if(!r.ok)throw Error('Catálogo no disponible');return r.json();}).then(data=>{resources=data;render();document.querySelector('#bonus').replaceChildren(...data.slice(9).map((item,i)=>card(item,i,true)));}).catch(()=>{document.querySelector('#catalog').textContent='No pudimos cargar el catálogo. Actualiza la página para volver a intentarlo.';});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});button.classList.add('active');button.setAttribute('aria-pressed','true');render(button.dataset.filter);}));
document.querySelectorAll('.dialog-close,.dialog-back').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
if(config.checkoutUrl){const link=document.querySelector('#purchase-link');link.textContent='Comprar ahora · $7.99 →';document.querySelector('.purchase-status span').textContent=config.priceLabel||'Compra en Hotmart';document.querySelector('#offer-note').textContent='Completa tu compra en la plataforma de Hotmart.';document.querySelector('#purchase-caption').textContent='Consulta las condiciones de compra en Hotmart.';document.querySelector('#faq-purchase').textContent='Pulsa el botón de compra para ir al pago en Hotmart y consultar el precio y las condiciones del producto.';}

(function () {
  var VALUE = 7.99;
  var CURRENCY = 'USD';

  function track(name, params) {
    if (typeof fbq === 'function') fbq('track', name, params);
  }

  // ViewContent: una vez al cargar la página
  track('ViewContent', {
    content_name: 'coleccion_digital',
    content_type: 'product',
    value: VALUE,
    currency: CURRENCY
  });

  // InitiateCheckout: al hacer clic en cualquier enlace a Hotmart (una sola vez por carga)
  var checkoutSent = false;
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href*="pay.hotmart.com"]');
    if (!link || checkoutSent) return;
    checkoutSent = true;
    track('InitiateCheckout', {
      content_name: 'coleccion_digital',
      value: VALUE,
      currency: CURRENCY
    });
  }, true);
})();
