const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.site-nav');

if(toggle && nav){
  toggle.addEventListener('click',()=>{
    const isOpen=nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded',String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link)=>{
    link.addEventListener('click',()=>{
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
    });
  });
}

const zoomImages=Array.from(document.querySelectorAll('#assets .asset-card img')).filter((img)=>{
  return /\.(png|jpe?g|webp)(\?|#)?$/i.test(img.getAttribute('src') || '');
});

const imageModal=document.querySelector('.image-modal');
const imageModalImg=document.querySelector('.image-modal-img');
const imageModalClose=document.querySelector('.image-modal-close');

function closeImageModal(){
  if(!imageModal || !imageModalImg) return;
  imageModal.classList.remove('is-open');
  imageModal.setAttribute('aria-hidden','true');
  imageModalImg.removeAttribute('src');
  imageModalImg.alt='';
  document.body.style.overflow='';
}

if(imageModal && imageModalImg){
  zoomImages.forEach((img)=>{
    img.classList.add('zoomable-image');
    img.setAttribute('tabindex','0');
    img.setAttribute('role','button');

    const openImage=()=>{
      imageModalImg.src=img.currentSrc || img.src;
      imageModalImg.alt=img.alt || '확대 이미지';
      imageModal.classList.add('is-open');
      imageModal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    };

    img.addEventListener('click',openImage);
    img.addEventListener('keydown',(event)=>{
      if(event.key==='Enter' || event.key===' '){
        event.preventDefault();
        openImage();
      }
    });
  });

  imageModal.addEventListener('click',(event)=>{
    if(event.target===imageModal) closeImageModal();
  });

  if(imageModalClose){
    imageModalClose.addEventListener('click',closeImageModal);
  }

  window.addEventListener('keydown',(event)=>{
    if(event.key==='Escape') closeImageModal();
  });
}
