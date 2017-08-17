var count = 1;
var width = 154;
var position = 0;
var images = document.querySelector('ul');

document.querySelector('.nextArr').onclick = function() {
  position = Math.max(position - width * count, -width * (images.children.length - count * 3));
  images.style.marginLeft = position + 'px';
}

document.querySelector('.prevArr').onclick = function() {
  position = Math.min(position + width * count, 0);
  images.style.marginLeft = position + 'px';
}
